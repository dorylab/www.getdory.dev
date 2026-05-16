"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/landing/variants";
import { Button } from "@/components/ui/button";
import { detectPlatform, type DownloadPlatform } from "@/lib/download-platform";
import { cn } from "@/lib/utils";

type DownloadButtonProps = {
  macAppleSiliconUrl?: string;
  macIntelUrl?: string;
  macUrl?: string;
  windowsInstallerUrl?: string;
  windowsUrl?: string;
  fallbackUrl: string;
  className?: string;
};

export function DownloadButton({
  macAppleSiliconUrl,
  macIntelUrl,
  macUrl,
  windowsInstallerUrl,
  windowsUrl,
  fallbackUrl,
  className,
}: DownloadButtonProps) {
  const t = useTranslations("landing");
  const [platform, setPlatform] = useState<DownloadPlatform>("other");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setPlatform(detectPlatform());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  function handleDownload() {
    posthog.capture(
      "download_button_click",
      { platform },
      { transport: "sendBeacon" },
    );
  }

  const label =
    platform === "mac-apple-silicon" || platform === "mac-intel"
      ? t("downloadForMac")
      : platform === "windows"
        ? t("downloadForWindows")
        : t("downloadLatest");

  const href =
    platform === "mac-apple-silicon"
      ? (macAppleSiliconUrl ?? macUrl ?? macIntelUrl ?? fallbackUrl)
      : platform === "mac-intel"
        ? (macIntelUrl ?? macUrl ?? macAppleSiliconUrl ?? fallbackUrl)
        : platform === "windows"
          ? (windowsInstallerUrl ?? windowsUrl ?? fallbackUrl)
          : fallbackUrl;

  return (
    <Button
      asChild
      className={cn(buttonVariants(), "max-sm:text-sm", className)}
      onClick={handleDownload}
    >
      <a href={href}>
        <Download className="mr-2 h-4 w-4 shrink-0" />
        <span className="min-w-0 truncate">{label}</span>
      </a>
    </Button>
  );
}
