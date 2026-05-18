import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const RELEASE_NOTES_DIR = path.join(ROOT, "content/docs/release-notes");
const META_PATH = path.join(RELEASE_NOTES_DIR, "meta.json");
const GITHUB_OWNER = "dorylab";
const GITHUB_REPO = "dory";
const GITHUB_RELEASE_NOTES_DIR = "release-notes";
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_RELEASE_NOTES_DIR}`;
const GITHUB_TREE_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/tree/main/${GITHUB_RELEASE_NOTES_DIR}`;

const INDEX_LOCALES = [
  {
    suffix: "",
    locale: "en",
    latestPattern:
      /- Latest synchronized version: \[v[^\]]+\]\(\/en\/docs\/release-notes\/[^)]+\)/,
    latestLine: (release) =>
      `- Latest synchronized version: [${release.version}](/en/docs/release-notes/${release.slug})`,
  },
  {
    suffix: ".es",
    locale: "es",
    latestPattern:
      /- Última versión sincronizada: \[v[^\]]+\]\(\/es\/docs\/release-notes\/[^)]+\)/,
    latestLine: (release) =>
      `- Última versión sincronizada: [${release.version}](/es/docs/release-notes/${release.slug})`,
  },
  {
    suffix: ".ja",
    locale: "ja",
    latestPattern:
      /- 最新の同期バージョン: \[v[^\]]+\]\(\/ja\/docs\/release-notes\/[^)]+\)/,
    latestLine: (release) =>
      `- 最新の同期バージョン: [${release.version}](/ja/docs/release-notes/${release.slug})`,
  },
  {
    suffix: ".zh",
    locale: "zh",
    latestPattern:
      /- 最新同步版本：\[v[^\]]+\]\(\/zh\/docs\/release-notes\/[^)]+\)/,
    latestLine: (release) =>
      `- 最新同步版本：[${release.version}](/zh/docs/release-notes/${release.slug})`,
  },
];

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "docs.getdory.dev-release-notes-sync",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "docs.getdory.dev-release-notes-sync",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub raw request failed: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function versionFromName(name) {
  return name.replace(/\.mdx?$/, "");
}

function slugFromVersion(version) {
  return version.replaceAll(".", "-");
}

function compareVersionsDesc(a, b) {
  const left = a.version.replace(/^v/i, "").split(".").map(Number);
  const right = b.version.replace(/^v/i, "").split(".").map(Number);
  const maxLength = Math.max(left.length, right.length);

  for (let index = 0; index < maxLength; index += 1) {
    const diff = (right[index] ?? 0) - (left[index] ?? 0);
    if (diff !== 0) return diff;
  }

  return b.version.localeCompare(a.version);
}

function normalizeBody(markdown) {
  return markdown
    .trim()
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

function pageContent(release) {
  return `---\ntitle: ${release.version}\ndescription: Dory release notes for ${release.version}.\n---\n\n# ${release.version}\n\n[View source on GitHub](${release.htmlUrl})\n\n${normalizeBody(release.body)}\n`;
}

function summarize(markdown) {
  const text = normalizeBody(markdown)
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .map((line) =>
      line
        .replace(/^[-*]\s*/, "")
        .replace(/\*\*/g, "")
        .replace(/`([^`]+)`/g, "$1")
        .trim(),
    )
    .find((line) => line.length > 0 && !/^What's Changed$/i.test(line));

  if (!text) return "No user-facing changes recorded.";
  return text.length > 140 ? `${text.slice(0, 137)}...` : text;
}

async function readOptional(filePath) {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") return null;
    throw error;
  }
}

async function writeIfChanged(filePath, nextContent) {
  const current = await readOptional(filePath);
  if (current === nextContent) return false;

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, nextContent);
  return true;
}

async function syncMeta(releases) {
  const meta = JSON.parse(await readFile(META_PATH, "utf8"));
  const syncedPages = releases.map((release) => release.slug);
  const remainingPages = meta.pages.filter(
    (page) => page === "index" || !/^v\d+-\d+-\d+/.test(page) || !syncedPages.includes(page),
  );
  const nextPages = [
    "index",
    ...syncedPages,
    ...remainingPages.filter((page) => page !== "index"),
  ];
  const nextMeta = {
    ...meta,
    pages: nextPages,
  };

  return writeIfChanged(META_PATH, `${JSON.stringify(nextMeta, null, 2)}\n`);
}

async function syncIndex(releases, indexLocale) {
  const filePath = path.join(RELEASE_NOTES_DIR, `index${indexLocale.suffix}.mdx`);
  let content = await readOptional(filePath);
  if (!content) return false;

  const latest = releases[0];
  content = content.replace(indexLocale.latestPattern, indexLocale.latestLine(latest));

  const lines = content.split("\n");
  const existingVersions = new Set();
  for (const line of lines) {
    const match = line.match(/\|\s*\[(v[^\]]+)\]/);
    if (match) existingVersions.add(match[1]);
  }

  const separatorIndex = lines.findIndex((line) => line.trim() === "| --- | --- |");
  if (separatorIndex === -1) {
    return writeIfChanged(filePath, lines.join("\n"));
  }

  const newRows = releases
    .filter((release) => !existingVersions.has(release.version))
    .map(
      (release) =>
        `| [${release.version}](/${indexLocale.locale}/docs/release-notes/${release.slug}) | ${summarize(release.body)} |`,
    );

  if (newRows.length > 0) {
    lines.splice(separatorIndex + 1, 0, ...newRows);
  }

  return writeIfChanged(filePath, lines.join("\n"));
}

async function main() {
  const entries = await fetchJson(GITHUB_API_URL);
  const releases = entries
    .filter((entry) => entry.type === "file" && /^v\d+\.\d+\.\d+\.mdx?$/.test(entry.name))
    .map((entry) => {
      const version = versionFromName(entry.name);
      return {
        version,
        slug: slugFromVersion(version),
        downloadUrl: entry.download_url,
        htmlUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/blob/main/${GITHUB_RELEASE_NOTES_DIR}/${entry.name}`,
      };
    })
    .sort(compareVersionsDesc);

  if (releases.length === 0) {
    throw new Error(`No release notes found in ${GITHUB_TREE_URL}`);
  }

  const hydratedReleases = [];
  for (const release of releases) {
    const body = await fetchText(release.downloadUrl);
    hydratedReleases.push({ ...release, body });
  }

  const changed = [];
  for (const release of hydratedReleases) {
    const pagePath = path.join(RELEASE_NOTES_DIR, `${release.slug}.mdx`);
    if (await writeIfChanged(pagePath, pageContent(release))) {
      changed.push(path.relative(ROOT, pagePath));
    }
  }

  if (await syncMeta(hydratedReleases)) {
    changed.push(path.relative(ROOT, META_PATH));
  }

  for (const indexLocale of INDEX_LOCALES) {
    const filePath = path.join(RELEASE_NOTES_DIR, `index${indexLocale.suffix}.mdx`);
    if (await syncIndex(hydratedReleases, indexLocale)) {
      changed.push(path.relative(ROOT, filePath));
    }
  }

  if (changed.length === 0) {
    console.log("Release notes are already synchronized.");
    return;
  }

  console.log(`Synchronized ${hydratedReleases.length} release notes:`);
  for (const filePath of changed) {
    console.log(`- ${filePath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
