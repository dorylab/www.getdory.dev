"use client";

import { ArrowUpRight, Download, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { useEffect, useMemo, useState } from "react";

import { buttonVariants } from "@/components/landing/variants";
import { detectPlatform, type DownloadPlatform } from "@/lib/download-platform";
import { cn } from "@/lib/utils";

type DownloadRedirectProps = {
  downloadUrl: string;
  macAppleSiliconUrl?: string;
  macIntelUrl?: string;
  windowsUrl?: string;
  releaseUrl: string;
  platformLabel: string;
};

export function DownloadRedirect({
  downloadUrl,
  macAppleSiliconUrl,
  macIntelUrl,
  windowsUrl,
  releaseUrl,
  platformLabel,
}: DownloadRedirectProps) {
  const t = useTranslations("downloadPage");
  const [hasStarted, setHasStarted] = useState(false);
  const [detectedPlatform, setDetectedPlatform] =
    useState<DownloadPlatform>("other");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setDetectedPlatform(detectPlatform());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const { resolvedUrl, resolvedPlatformLabel } = useMemo(() => {
    if (platformLabel !== "latest") {
      return {
        resolvedUrl: downloadUrl,
        resolvedPlatformLabel: platformLabel,
      };
    }

    if (detectedPlatform === "mac-apple-silicon" && macAppleSiliconUrl) {
      return {
        resolvedUrl: macAppleSiliconUrl,
        resolvedPlatformLabel: "macOS",
      };
    }

    if (detectedPlatform === "mac-intel" && macIntelUrl) {
      return {
        resolvedUrl: macIntelUrl,
        resolvedPlatformLabel: "macOS",
      };
    }

    if (detectedPlatform === "windows" && windowsUrl) {
      return {
        resolvedUrl: windowsUrl,
        resolvedPlatformLabel: "Windows",
      };
    }

    return {
      resolvedUrl:
        macAppleSiliconUrl ??
        macIntelUrl ??
        windowsUrl ??
        downloadUrl ??
        releaseUrl,
      resolvedPlatformLabel:
        detectedPlatform === "mac-apple-silicon" ||
        detectedPlatform === "mac-intel"
          ? "macOS"
          : detectedPlatform === "windows"
            ? "Windows"
            : platformLabel,
    };
  }, [
    detectedPlatform,
    downloadUrl,
    macAppleSiliconUrl,
    macIntelUrl,
    platformLabel,
    releaseUrl,
    windowsUrl,
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHasStarted(true);
      posthog.capture(
        "download_started",
        { platform: resolvedPlatformLabel },
        { transport: "sendBeacon" },
      );
      window.location.assign(resolvedUrl);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [resolvedPlatformLabel, resolvedUrl]);

  return (
    <div className="rounded-[32px] border border-slate-200/80 bg-slate-50 p-7 text-slate-900 shadow-[0_12px_40px_rgba(15,23,42,0.08)] md:p-9 dark:border-white/10 dark:!bg-[#0c1323] dark:text-slate-50 dark:shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-1 text-xs font-medium tracking-[0.18em] text-emerald-700 uppercase dark:border-emerald-400/15 dark:bg-emerald-400/10 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {hasStarted ? t("statusStarted") : t("statusPreparing")}
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-current">
              {t("cardTitle", { platform: resolvedPlatformLabel })}
            </h2>
            <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("cardDescription")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={resolvedUrl}
            className={cn(
              buttonVariants({ size: "compact", surface: "flat" }),
              "text-center",
            )}
            onClick={() =>
              posthog.capture(
                "manual_download_click",
                {
                  platform: resolvedPlatformLabel,
                },
                { transport: "sendBeacon" },
              )
            }
          >
            <Download className="mr-2 h-4 w-4 shrink-0" />
            {t("manualDownload")}
          </a>
          <a
            href={releaseUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants({
                variant: "secondary",
                size: "compact",
                surface: "flat",
              }),
              "text-center",
            )}
          >
            <RefreshCw className="mr-2 h-4 w-4 shrink-0" />
            {t("retryFromRelease")}
          </a>
        </div>
      </div>

      <a
        href={resolvedUrl}
        className="text-brand dark:text-brand-200 mt-5 inline-flex items-center justify-center gap-2 text-sm hover:underline"
      >
        {t("fallbackLink", { platform: resolvedPlatformLabel })}
        <ArrowUpRight className="h-4 w-4 shrink-0" />
      </a>
    </div>
  );
}
