export type DownloadPlatform =
  | "mac-apple-silicon"
  | "mac-intel"
  | "windows"
  | "other";

export function detectPlatform(): DownloadPlatform {
  if (typeof navigator === "undefined") {
    return "other";
  }

  const userAgentDataPlatform = (
    navigator as Navigator & {
      userAgentData?: { architecture?: string; platform?: string };
    }
  ).userAgentData?.platform?.toLowerCase();
  const userAgentDataArchitecture = (
    navigator as Navigator & {
      userAgentData?: { architecture?: string; platform?: string };
    }
  ).userAgentData?.architecture?.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || "";
  const userAgent = navigator.userAgent.toLowerCase();
  const value = `${userAgentDataPlatform || ""} ${platform} ${userAgent}`;

  if (value.includes("mac")) {
    const architecture = `${userAgentDataArchitecture || ""} ${userAgent}`;
    return /(arm|aarch64|apple)/i.test(architecture)
      ? "mac-apple-silicon"
      : "mac-intel";
  }

  if (value.includes("win")) {
    return "windows";
  }

  return "other";
}
