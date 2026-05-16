import {
  Apple,
  ArrowDownToLine,
  ArrowRight,
  Package,
  SquareTerminal,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { DownloadButton } from "@/components/landing/download-button";
import { DownloadCommandBar } from "@/components/landing/download-command-bar";
import { MarketingLayout } from "@/components/marketing-layout";
import { getLatestReleaseDownloads } from "@/lib/github-release";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [downloads, t] = await Promise.all([
    getLatestReleaseDownloads(),
    getTranslations({ locale: lang, namespace: "downloadCenter" }),
  ]);

  const homebrewCommand = "brew install dorylab/dory/dory";
  const version = downloads.version ?? "Latest";

  const options = [
    {
      title: t("macTitle"),
      badge: t("appleSilicon"),
      description: t("macAppleSiliconDescription"),
      href: downloads.macAppleSiliconUrl ?? downloads.releaseUrl,
      icon: Apple,
    },
    {
      title: t("macTitle"),
      badge: t("intel"),
      description: t("macIntelDescription"),
      href: downloads.macIntelUrl ?? downloads.releaseUrl,
      icon: Apple,
    },
    {
      title: t("windowsTitle"),
      badge: t("installer"),
      description: t("windowsInstallerDescription"),
      href: downloads.windowsInstallerUrl ?? downloads.releaseUrl,
      icon: Package,
    },
    {
      title: t("windowsTitle"),
      badge: t("portable"),
      description: t("windowsPortableDescription"),
      href: downloads.windowsPortableUrl ?? downloads.releaseUrl,
      icon: Package,
    },
  ];

  return (
    <MarketingLayout lang={lang}>
      <main className="min-h-screen bg-dory-page px-4 pt-14 pb-20 text-dory-ink sm:px-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-14">
          <section className="grid gap-10 border-b border-slate-950/10 pt-10 pb-14 md:grid-cols-[1fr_360px] md:items-end md:pt-16 md:pb-18 dark:border-white/12">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border border-dory-brand-line bg-dory-brand-soft px-3 py-1.5 text-xs font-medium tracking-wide text-brand uppercase">
                <Package className="size-3.5" />
                {t("latestVersion")} {version}
              </div>
              <h1 className="max-w-[780px] text-6xl leading-[0.92] font-semibold tracking-[-0.065em] text-balance md:text-8xl dark:text-white">
                {t("title")}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9 dark:text-slate-300">
                {t("description", {
                  product: `Dory ${downloads.version ?? ""}`.trim(),
                })}
              </p>
            </div>

            <div className="flex flex-col gap-3 border border-slate-950/10 bg-white p-4 dark:border-white/12 dark:bg-white/6">
              <DownloadButton
                macAppleSiliconUrl={downloads.macAppleSiliconUrl}
                macIntelUrl={downloads.macIntelUrl}
                macUrl={downloads.macUrl}
                windowsInstallerUrl={downloads.windowsInstallerUrl}
                windowsUrl={downloads.windowsUrl}
                fallbackUrl="/download/redirect"
                  className="h-12 w-full rounded-none bg-brand px-5 text-sm font-medium text-brand-foreground shadow-none hover:bg-brand-200"
              />
              <a
                href={downloads.releaseUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center justify-center gap-2 border border-slate-950/10 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-950/30 hover:text-slate-950 dark:border-white/12 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
              >
                {t("viewAllReleases")}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </section>

          <section className="grid min-w-0 gap-5 md:grid-cols-[0.9fr_1.4fr]">
            <div className="min-w-0 overflow-hidden border border-dory-line bg-dory-brand-panel p-5 text-brand-foreground md:min-h-[360px] md:p-6">
              <div>
                <div className="mb-6 flex size-11 items-center justify-center border border-white/14 bg-white/8">
                  <SquareTerminal className="size-5" />
                </div>
                <h2 className="max-w-xs text-3xl leading-tight font-semibold tracking-[-0.035em]">
                  {t("homebrewTitle")}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/68">
                  {t("homebrewDescription")}
                </p>
              </div>
              <DownloadCommandBar
                command={homebrewCommand}
                className="mt-8 max-w-full min-w-0 rounded-none border-white/12 bg-white/8 shadow-none [&_code]:text-white"
              />
            </div>

            <div className="min-w-0 border border-slate-950/10 bg-white dark:border-white/12 dark:bg-white/6">
              <div className="border-b border-slate-950/10 p-5 md:p-6 dark:border-white/12">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                  {t("allPlatformsTitle")}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t("allPlatformsDescription")}
                </p>
              </div>

              <div className="divide-y divide-slate-950/10 dark:divide-white/12">
                {options.map((option) => {
                  const Icon = option.icon;

                  return (
                    <a
                      key={`${option.title}-${option.badge}`}
                      href={option.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group grid gap-4 p-5 transition hover:bg-slate-950/[0.035] sm:grid-cols-[1fr_auto] sm:items-center md:p-6 dark:hover:bg-white/8"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center border border-dory-line bg-dory-brand-soft text-dory-muted">
                          <Icon className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-lg font-medium text-slate-950 dark:text-white">
                              {option.title}
                            </p>
                            <span className="border border-slate-950/10 px-2 py-0.5 text-xs font-medium text-slate-500 dark:border-white/12 dark:text-slate-300">
                              {option.badge}
                            </span>
                          </div>
                          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white">
                        {t("downloadAsset")}
                        <ArrowDownToLine className="size-4" />
                      </span>
                    </a>
                  );
                })}

                <a
                  href={downloads.releaseUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid gap-4 p-5 transition hover:bg-slate-950/[0.035] sm:grid-cols-[1fr_auto] sm:items-center md:p-6 dark:hover:bg-white/8"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center border border-dory-line bg-dory-brand-soft text-dory-muted">
                      <Package className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg font-medium text-slate-950 dark:text-white">
                        {t("releaseTitle")}
                      </p>
                      <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {t("releaseRowDescription")}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white">
                    {t("viewAllReleases")}
                    <ArrowRight className="size-4" />
                  </span>
                </a>
              </div>
            </div>
          </section>

          <section className="grid gap-4 border-t border-slate-950/10 pt-5 text-sm text-slate-600 md:grid-cols-[1fr_auto] md:items-center dark:border-white/12 dark:text-slate-300">
            <p className="max-w-2xl leading-6">{t("tip")}</p>
            <a
              href="/download/redirect"
              className="inline-flex items-center gap-2 font-medium text-slate-950 hover:underline dark:text-white"
            >
              {t("autoDetect")}
              <ArrowRight className="size-4" />
            </a>
          </section>
        </div>
      </main>
    </MarketingLayout>
  );
}
