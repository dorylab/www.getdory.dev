import matter from "gray-matter";
import { cache } from "react";
import { blog as blogCollection } from "collections/server";

import { defaultLanguage, type Language, locales } from "@/lib/i18n";

const GITHUB_OWNER = "dorylab";
const GITHUB_REPO = "dory";
const RELEASE_NOTES_DIR = "release-notes";
const RELEASE_NOTES_CATEGORY = "release-notes" as const;
const BLOG_CATEGORY = "blog" as const;
const GITHUB_RELEASE_NOTES_REVALIDATE_SECONDS = 60;

const GITHUB_API_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "getdory.dev",
};

type GitHubContentItem = {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
};

type GitHubFileResponse = {
  content: string;
  encoding: "base64";
  name: string;
  path: string;
  type: "file";
};

export type BlogCategory = typeof BLOG_CATEGORY | typeof RELEASE_NOTES_CATEGORY;

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  description: string;
  version: string;
  href: string;
  url: string;
  body: string;
  excerpt: string;
};

function toTitleCase(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function compareVersions(a: string, b: string) {
  const aIsVersion = isVersionSlug(a);
  const bIsVersion = isVersionSlug(b);

  if (aIsVersion !== bIsVersion) {
    return aIsVersion ? 1 : -1;
  }

  if (!aIsVersion && !bIsVersion) {
    return a.localeCompare(b);
  }

  const aParts = a.replace(/^v/i, "").split(".").map((part) => Number.parseInt(part, 10) || 0);
  const bParts = b.replace(/^v/i, "").split(".").map((part) => Number.parseInt(part, 10) || 0);
  const maxLength = Math.max(aParts.length, bParts.length);

  for (let index = 0; index < maxLength; index += 1) {
    const difference = (bParts[index] ?? 0) - (aParts[index] ?? 0);

    if (difference !== 0) {
      return difference;
    }
  }

  return 0;
}

function isVersionSlug(value: string) {
  return /^v?\d+(?:[-.]\d+)*$/i.test(value);
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\n{2,}/g, " ")
    .trim();
}

function buildGitHubBlobUrl(path: string) {
  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/blob/main/${path}`;
}

function normalizeContentSlug(value: string) {
  return value.trim().replace(/(?:\.(?:es|ja|zh))?\.mdx?$/i, "");
}

function buildReleasePost(
  item: Pick<GitHubContentItem, "name" | "path">,
  raw: string,
): BlogPost {
  const { data, content } = matter(raw);
  const slug = normalizeContentSlug(item.name);
  const version =
    typeof data.version === "string" && data.version.trim().length > 0
      ? data.version
      : isVersionSlug(slug)
        ? slug.replaceAll("-", ".")
        : "SQL Server";
  const title =
    typeof data.title === "string" && data.title.trim().length > 0
      ? data.title
      : `Release ${version}`;
  const descriptionSource =
    typeof data.description === "string" && data.description.trim().length > 0
      ? data.description
      : stripMarkdown(content);

  return {
    slug,
    category: RELEASE_NOTES_CATEGORY,
    title,
    description: descriptionSource.slice(0, 180),
    version,
    href: `/docs/release-notes/${slug.replaceAll(".", "-")}`,
    url: buildGitHubBlobUrl(item.path),
    body: content,
    excerpt: descriptionSource,
  };
}

function getEntryLocale(pathname: string): Language {
  const match = pathname.match(/\.([a-z]{2})\.mdx?$/i);
  const locale = match?.[1];

  return locales.includes(locale as Language) ? (locale as Language) : defaultLanguage;
}

function getBlogEntrySlug(pathname: string) {
  return normalizeContentSlug(pathname.split("/").pop() ?? pathname);
}

function getLocalizedBlogEntries(locale: Language) {
  const entriesBySlug = new Map<string, typeof blogCollection>();

  for (const entry of blogCollection) {
    const slug = getBlogEntrySlug(entry.info.path);
    const entries = entriesBySlug.get(slug) ?? [];

    entries.push(entry);
    entriesBySlug.set(slug, entries);
  }

  return Array.from(entriesBySlug.entries()).flatMap(([slug, entries]) => {
    const localized =
      entries.find((entry) => getEntryLocale(entry.info.path) === locale) ??
      entries.find((entry) => getEntryLocale(entry.info.path) === defaultLanguage);

    return localized ? [{ slug, entry: localized }] : [];
  });
}

async function buildLocalBlogPost(
  slug: string,
  entry: (typeof blogCollection)[number],
  locale: Language,
): Promise<BlogPost> {
  const descriptionSource =
    typeof entry.description === "string" && entry.description.trim().length > 0
      ? entry.description
      : stripMarkdown(await entry.getText("processed"));

  return {
    slug,
    category: BLOG_CATEGORY,
    title: entry.title,
    description: descriptionSource.slice(0, 180),
    version: "Blog",
    href: `${locale === defaultLanguage ? "" : `/${locale}`}/blog/${slug}`,
    url: `${locale === defaultLanguage ? "" : `/${locale}`}/blog/${slug}`,
    body: await entry.getText("processed"),
    excerpt: descriptionSource,
  };
}

async function getLocalBlogPosts(locale: Language): Promise<BlogPost[]> {
  return Promise.all(
    getLocalizedBlogEntries(locale).map(({ slug, entry }) =>
      buildLocalBlogPost(slug, entry, locale),
    ),
  );
}

async function fetchReleaseNoteIndex(): Promise<GitHubContentItem[]> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${RELEASE_NOTES_DIR}`,
    {
      headers: GITHUB_API_HEADERS,
      next: { revalidate: GITHUB_RELEASE_NOTES_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch release notes index: ${response.status}`);
  }

  return (await response.json()) as GitHubContentItem[];
}

async function fetchReleaseNoteBody(downloadUrl: string) {
  const response = await fetch(downloadUrl, {
    headers: {
      "User-Agent": "getdory.dev",
    },
    next: { revalidate: GITHUB_RELEASE_NOTES_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch release note body: ${response.status}`);
  }

  return response.text();
}

async function fetchReleaseNoteFile(path: string) {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      headers: GITHUB_API_HEADERS,
      next: { revalidate: GITHUB_RELEASE_NOTES_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch release note file: ${response.status}`);
  }

  const file = (await response.json()) as GitHubFileResponse;

  if (file.type !== "file" || file.encoding !== "base64") {
    throw new Error(`Unexpected GitHub file response for: ${path}`);
  }

  return Buffer.from(file.content, "base64").toString("utf8");
}

async function getRemoteReleaseNotes(): Promise<BlogPost[]> {
  try {
    const files = await fetchReleaseNoteIndex();

    return Promise.all(
      files
        .filter((item) => item.type === "file" && /\.mdx?$/i.test(item.name) && item.download_url)
        .map(async (item) => {
          const raw = await fetchReleaseNoteBody(item.download_url!);
          return buildReleasePost(item, raw);
        }),
    );
  } catch {
    return [];
  }
}

export const getReleaseNotes = cache(
  async (locale: Language = defaultLanguage): Promise<BlogPost[]> => {
    const [blogPosts, remotePosts] = await Promise.all([
      getLocalBlogPosts(locale),
      getRemoteReleaseNotes(),
    ]);
    const postsBySlug = new Map<string, BlogPost>();

    for (const post of remotePosts) {
      postsBySlug.set(post.slug, post);
    }

    for (const post of blogPosts) {
      postsBySlug.set(post.slug, post);
    }

    return Array.from(postsBySlug.values()).sort((left, right) =>
      compareVersions(left.version, right.version),
    );
  },
);

export const getReleaseNoteBySlug = cache(async (slug: string) => {
  const normalizedSlug = normalizeContentSlug(slug);
  const dottedSlug = isVersionSlug(normalizedSlug)
    ? normalizedSlug.replaceAll("-", ".")
    : normalizedSlug;
  const directCandidates = Array.from(
    new Set(
      [normalizedSlug, dottedSlug].flatMap((candidate) => [
        `${RELEASE_NOTES_DIR}/${candidate}.mdx`,
        `${RELEASE_NOTES_DIR}/${candidate}.md`,
      ]),
    ),
  );

  for (const path of directCandidates) {
    try {
      const raw = await fetchReleaseNoteFile(path);
      return buildReleasePost(
        {
          name: path.split("/").pop() ?? `${normalizedSlug}.md`,
          path,
        },
        raw,
      );
    } catch {
      continue;
    }
  }

  const posts = await getReleaseNotes();
  return (
    posts.find((post) => {
      const normalizedPostSlug = normalizeContentSlug(post.slug);
      const normalizedVersion = normalizeContentSlug(post.version);

      return normalizedPostSlug === normalizedSlug || normalizedVersion === normalizedSlug;
    }) ?? null
  );
});

export const getBlogPostBySlug = cache(
  async (slug: string, locale: Language = defaultLanguage) => {
    const normalizedSlug = normalizeContentSlug(slug);

    return (
      getLocalizedBlogEntries(locale).find(
        (post) => post.slug === normalizedSlug,
      )?.entry ?? null
    );
  },
);

export function getBlogSlugs() {
  return Array.from(
    new Set(blogCollection.map((entry) => getBlogEntrySlug(entry.info.path))),
  );
}

export function getBlogCategories() {
  return [
    {
      slug: BLOG_CATEGORY,
      title: "Blog",
      description: "Product essays, launch notes, and workflow updates from the Dory team.",
      countLabel: (count: number) => `${count} post${count === 1 ? "" : "s"}`,
    },
    {
      slug: RELEASE_NOTES_CATEGORY,
      title: "Release Notes",
      description: "Version-by-version product updates synced from the main Dory repository.",
      countLabel: (count: number) => `${count} post${count === 1 ? "" : "s"}`,
    },
  ];
}

export function formatReleaseLabel(version: string) {
  if (/^v?\d+(?:\.\d+)*$/i.test(version)) {
    return version.toUpperCase().startsWith("V") ? version : `v${version}`;
  }

  return version;
}

export function getBlogCategoryTitle(category: BlogCategory) {
  if (category === RELEASE_NOTES_CATEGORY) {
    return "Release Notes";
  }

  return toTitleCase(category);
}
