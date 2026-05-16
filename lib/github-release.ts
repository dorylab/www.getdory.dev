type GitHubReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubReleaseResponse = {
  tag_name: string;
  html_url: string;
  assets: GitHubReleaseAsset[];
};

export type ReleaseDownloadLinks = {
  macAppleSiliconUrl?: string;
  macIntelUrl?: string;
  macUrl?: string;
  windowsPortableUrl?: string;
  windowsInstallerUrl?: string;
  windowsUrl?: string;
  releaseUrl: string;
  version?: string;
};

const GITHUB_LATEST_RELEASE_API =
  "https://api.github.com/repos/dorylab/dory/releases/latest";

function findMacAsset(assets: GitHubReleaseAsset[]) {
  return assets.find(
    (asset) => /\.dmg$/i.test(asset.name) && !/blockmap/i.test(asset.name),
  );
}

function findMacAppleSiliconAsset(assets: GitHubReleaseAsset[]) {
  return assets.find(
    (asset) =>
      /\.dmg$/i.test(asset.name) &&
      !/blockmap/i.test(asset.name) &&
      /(arm64|aarch64)/i.test(asset.name),
  );
}

function findMacIntelAsset(assets: GitHubReleaseAsset[]) {
  return assets.find(
    (asset) =>
      /\.dmg$/i.test(asset.name) &&
      !/blockmap/i.test(asset.name) &&
      /(x64|intel)/i.test(asset.name),
  );
}

function findWindowsAsset(assets: GitHubReleaseAsset[]) {
  return (
    assets.find(
      (asset) => /setup/i.test(asset.name) && /\.exe$/i.test(asset.name),
    ) ??
    assets.find(
      (asset) => /\.exe$/i.test(asset.name) && !/blockmap/i.test(asset.name),
    )
  );
}

function findWindowsPortableAsset(assets: GitHubReleaseAsset[]) {
  return assets.find(
    (asset) =>
      /portable/i.test(asset.name) &&
      /\.exe$/i.test(asset.name) &&
      !/blockmap/i.test(asset.name),
  );
}

function findWindowsInstallerAsset(assets: GitHubReleaseAsset[]) {
  return assets.find(
    (asset) =>
      /setup/i.test(asset.name) &&
      /\.exe$/i.test(asset.name) &&
      !/blockmap/i.test(asset.name),
  );
}

export async function getLatestReleaseDownloads(): Promise<ReleaseDownloadLinks> {
  const fallback = {
    releaseUrl: "https://github.com/dorylab/dory/releases/latest",
  };

  try {
    const response = await fetch(GITHUB_LATEST_RELEASE_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return fallback;
    }

    const release = (await response.json()) as GitHubReleaseResponse;
    const macAppleSiliconAsset = findMacAppleSiliconAsset(release.assets);
    const macIntelAsset = findMacIntelAsset(release.assets);
    const macAsset =
      macAppleSiliconAsset ?? macIntelAsset ?? findMacAsset(release.assets);
    const windowsInstallerAsset = findWindowsInstallerAsset(release.assets);
    const windowsPortableAsset = findWindowsPortableAsset(release.assets);
    const windowsAsset =
      windowsInstallerAsset ??
      windowsPortableAsset ??
      findWindowsAsset(release.assets);

    return {
      version: release.tag_name,
      releaseUrl: release.html_url || fallback.releaseUrl,
      macAppleSiliconUrl: macAppleSiliconAsset?.browser_download_url,
      macIntelUrl: macIntelAsset?.browser_download_url,
      macUrl: macAsset?.browser_download_url,
      windowsPortableUrl: windowsPortableAsset?.browser_download_url,
      windowsInstallerUrl: windowsInstallerAsset?.browser_download_url,
      windowsUrl: windowsAsset?.browser_download_url,
    };
  } catch {
    return fallback;
  }
}
