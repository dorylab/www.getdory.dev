"use client";

import { useTranslations } from "next-intl";

import { DownloadButton } from "@/components/landing/download-button";
import { cn } from "@/lib/utils";

type CTAProps = {
  className?: string;
};

export default function CTA({ className }: CTAProps) {
  const ctaT = useTranslations("landing.cta");

  return (
    <div
      className={cn(
        "relative isolate mx-auto w-full max-w-[1080px] overflow-hidden rounded-[24px] border border-sky-100/70 bg-[radial-gradient(circle_at_12%_12%,rgba(59,130,246,0.06),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(45,212,191,0.07),transparent_30%),linear-gradient(135deg,#fcfeff_0%,#f6fbff_58%,#f1fbf9_100%)] px-5 py-8 shadow-[0_20px_70px_rgba(23,95,140,0.07)] sm:rounded-[32px] sm:px-8 sm:py-10 lg:px-10 dark:border-white/8 dark:bg-[radial-gradient(circle_at_12%_12%,rgba(59,130,246,0.07),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(45,212,191,0.045),transparent_30%),linear-gradient(135deg,#0a101b_0%,#0b1420_58%,#0a1718_100%)] dark:shadow-[0_20px_70px_rgba(2,6,23,0.3)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-28 -bottom-36 h-72 w-72 rounded-full bg-cyan-200/16 blur-3xl dark:bg-cyan-400/5" />
      <div className="pointer-events-none absolute -top-32 -left-28 h-72 w-72 rounded-full bg-blue-200/14 blur-3xl dark:bg-blue-500/5" />

      <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-2xl text-center lg:text-left">
          <h2 className="text-3xl leading-[1.04] font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-5xl md:tracking-[-0.045em] dark:text-white">
            {ctaT("title")}
          </h2>

          <div className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 lg:mx-0 dark:text-slate-300">
            {ctaT("subtitle")}
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full [&_[data-slot=button]]:h-11 [&_[data-slot=button]]:w-full [&_[data-slot=button]]:rounded-xl [&_[data-slot=button]]:px-6 [&_[data-slot=button]]:text-sm [&_[data-slot=button]]:shadow-[0_16px_38px_rgba(37,99,235,0.26)] sm:w-auto sm:[&_[data-slot=button]]:w-auto">
            <DownloadButton fallbackUrl="/download" />
          </div>
        </div>
      </div>
    </div>
  );
}
