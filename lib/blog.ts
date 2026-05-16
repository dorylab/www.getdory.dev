import matter from "gray-matter";
import { cache } from "react";

const GITHUB_OWNER = "dorylab";
const GITHUB_REPO = "dory";
const RELEASE_NOTES_DIR = "release-notes";
const RELEASE_NOTES_CATEGORY = "release-notes" as const;

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

export type BlogCategory = typeof RELEASE_NOTES_CATEGORY;

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  description: string;
  version: string;
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

function normalizeReleaseSlug(value: string) {
  return value.trim().replace(/\.mdx?$/i, "");
}

function buildReleasePost(item: Pick<GitHubContentItem, "name" | "path">, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const slug = normalizeReleaseSlug(item.name);
  const version = typeof data.version === "string" ? data.version : slug;
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
    url: buildGitHubBlobUrl(item.path),
    body: content,
    excerpt: descriptionSource,
  };
}

async function fetchReleaseNoteIndex(): Promise<GitHubContentItem[]> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${RELEASE_NOTES_DIR}`,
    {
      headers: GITHUB_API_HEADERS,
      next: { revalidate: 3600 },
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
    next: { revalidate: 3600 },
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
      next: { revalidate: 3600 },
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

export const getReleaseNotes = cache(async (): Promise<BlogPost[]> => {
  try {
    const files = await fetchReleaseNoteIndex();

    const posts = await Promise.all(
      files
        .filter((item) => item.type === "file" && /\.mdx?$/i.test(item.name) && item.download_url)
        .map(async (item) => {
          const raw = await fetchReleaseNoteBody(item.download_url!);
          return buildReleasePost(item, raw);
        }),
    );

    return posts.sort((left, right) => compareVersions(left.version, right.version));
  } catch {
    return [];
  }
});

export const getReleaseNoteBySlug = cache(async (slug: string) => {
  const normalizedSlug = normalizeReleaseSlug(slug);
  const directCandidates = [
    `${RELEASE_NOTES_DIR}/${normalizedSlug}.mdx`,
    `${RELEASE_NOTES_DIR}/${normalizedSlug}.md`,
  ];

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
      const normalizedPostSlug = normalizeReleaseSlug(post.slug);
      const normalizedVersion = normalizeReleaseSlug(post.version);

      return normalizedPostSlug === normalizedSlug || normalizedVersion === normalizedSlug;
    }) ?? null
  );
});

export function getBlogCategories() {
  return [
    {
      slug: RELEASE_NOTES_CATEGORY,
      title: "Release Notes",
      description: "Version-by-version product updates synced from the main Dory repository.",
      countLabel: (count: number) => `${count} post${count === 1 ? "" : "s"}`,
    },
  ];
}

export function formatReleaseLabel(version: string) {
  return version.toUpperCase().startsWith("V") ? version : `v${version}`;
}

export function getBlogCategoryTitle(category: BlogCategory) {
  if (category === RELEASE_NOTES_CATEGORY) {
    return "Release Notes";
  }

  return toTitleCase(category);
}
