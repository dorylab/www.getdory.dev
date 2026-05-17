import { getTranslations } from "next-intl/server";

import { DownloadRedirect } from "@/components/landing/download-redirect";
import { buttonVariants } from "@/components/landing/variants";
import { MarketingLayout } from "@/components/marketing-layout";
import FooterSection from "@/components/sections/footer";
import { getLatestReleaseDownloads } from "@/lib/github-release";
import { cn } from "@/lib/utils";

type DownloadRedirectPageProps = {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    platform?: string;
  }>;
};

function getDownloadTarget(
  platform: string | undefined,
  downloads: Awaited<ReturnType<typeof getLatestReleaseDownloads>>,
) {
  if (platform === "mac") {
    return {
      label: "macOS",
      url:
        downloads.macAppleSiliconUrl ??
        downloads.macIntelUrl ??
        downloads.releaseUrl,
    };
  }

  if (platform === "windows") {
    return {
      label: "Windows",
      url: downloads.windowsUrl ?? downloads.releaseUrl,
    };
  }

  return {
    label: "latest",
    url: downloads.releaseUrl,
  };
}

export default async function DownloadRedirectPage({
  params,
  searchParams,
}: DownloadRedirectPageProps) {
  const [{ lang }, { platform }, downloads, t] = await Promise.all([
    params,
    searchParams,
    getLatestReleaseDownloads(),
    params.then(({ lang }) => getTranslations({ locale: lang, namespace: "downloadPage" })),
  ]);

  const target = getDownloadTarget(platform, downloads);

  return (
    <MarketingLayout lang={lang}>
    <main className="relative overflow-hidden px-6 py-12 md:px-10 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(111,177,255,0.18),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.06),_transparent_45%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-[1380px] items-center">
        <section className="w-full rounded-[36px] border border-white/10 bg-white/85 p-8 shadow-[0_35px_120px_rgba(15,23,42,0.18)] backdrop-blur-2xl md:p-14 dark:bg-slate-950/70 dark:shadow-[0_35px_120px_rgba(2,6,23,0.65)]">
          <div className="max-w-3xl space-y-8">
            <div className="border-brand/25 bg-brand/8 text-brand inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
              {t("eyebrow")}
            </div>

            <div className="space-y-4">
              <h1 className="text-landing-foreground dark:text-landing-foreground-dark text-4xl font-medium tracking-tight md:text-6xl">
                {t("title", {
                  product: `Dory ${downloads.version ?? ""}`.trim(),
                })}
              </h1>
              <p className="text-landing-foreground/70 dark:text-landing-foreground-dark/70 max-w-2xl text-lg leading-8">
                {t("description", { platform: target.label })}
              </p>
            </div>

            <DownloadRedirect
              downloadUrl={target.url}
              macAppleSiliconUrl={downloads.macAppleSiliconUrl}
              macIntelUrl={downloads.macIntelUrl}
              windowsUrl={downloads.windowsUrl}
              releaseUrl={downloads.releaseUrl}
              platformLabel={target.label}
            />

            <div className="rounded-[28px] border border-slate-200/80 bg-slate-50/90 p-6 text-sm leading-7 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <p>{t("tip")}</p>
              <a
                href={downloads.releaseUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "compact",
                    surface: "flat",
                  }),
                  "mt-5",
                )}
              >
                {t("viewAllReleases")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
    <FooterSection />
    </MarketingLayout>
  );
}
