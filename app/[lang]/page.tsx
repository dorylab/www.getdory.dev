import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  Database,
  LayoutGrid,
  LockKeyhole,
  Sparkles,
  Table2,
  TerminalSquare,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { DownloadButton } from "@/components/landing/download-button";
import { buttonVariants } from "@/components/landing/variants";
import { MarketingLayout } from "@/components/marketing-layout";
import FooterSection from "@/components/sections/footer";
import { Link } from "@/i18n/navigation";
import { getLatestReleaseDownloads } from "@/lib/github-release";
import { generateMarketingMetadata } from "@/lib/marketing-og";
import { cn } from "@/lib/utils";
import AiTablePreview from "@/public/ai-table-overview.png";
import ChatbotPreview from "@/public/chatbot.png";
import HeroPreview from "@/public/easy-to-use-sql-console.png";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return generateMarketingMetadata({ page: 'home', lang });
}

const heroCardKeys = ["aiChat", "sqlConsole", "teamFlow"] as const;
const workspaceFeatureKeys = ["editor", "schema", "saved"] as const;
const databaseSupportItems = [
  { name: "ClickHouse", icon: "/icons/databases/clickhouse.svg" },
  { name: "PostgreSQL", icon: "/icons/databases/postgresql.svg" },
  { name: "MySQL", icon: "/icons/databases/mysql.svg" },
  { name: "SQL Server", icon: "/icons/databases/sqlserver.svg" },
  { name: "Oracle", icon: "/icons/databases/oracle.svg" },
  { name: "SQLite", icon: "/icons/databases/sqlite.svg" },
  { name: "MariaDB", icon: "/icons/databases/mariadb.svg" },
  { name: "DuckDB", icon: "/icons/databases/duckdb.svg" },
  { name: "More", icon: "/icons/databases/more.svg" },
] as const;
const moreFeatureKeys = [
  "secure",
  "connectivity",
  "save",
  "modern",
  "themes",
  "open-source",
] as const;
const faqKeys = ["free", "aiCopilot", "databases", "dataSafety"] as const;

const heroCardIcons = [Bot, TerminalSquare, Braces];
const workspaceFeatureIcons = [TerminalSquare, Database, Table2];
const moreFeatureIcons = [
  LockKeyhole,
  Database,
  Check,
  Sparkles,
  LayoutGrid,
  Braces,
];
const artworkClasses = {
  sunrise: "dory-artwork-sunrise",
  temeraire: "dory-artwork-temeraire",
  fog: "dory-artwork-fog",
} as const;

type ArtworkKey = keyof typeof artworkClasses;

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 border border-dory-brand-line bg-dory-brand-soft px-3 py-1.5 text-xs font-semibold tracking-wide text-brand uppercase shadow-[var(--dory-shadow-sm)]">
      <Sparkles className="size-3.5" />
      {children}
    </div>
  );
}

function ScreenshotFrame({
  src,
  alt,
  artwork = "sunrise",
  priority,
  className,
  imageClassName,
}: {
  src: StaticImageData;
  alt: string;
  artwork?: ArtworkKey;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn(
        "dory-artwork-frame relative overflow-hidden rounded-[28px] bg-dory-brand-soft p-6 shadow-[var(--dory-shadow-panel)] sm:rounded-[32px] sm:p-8",
        artworkClasses[artwork],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        className={cn(
          "relative z-10 aspect-[1.45/1] w-full rounded-[18px] bg-white object-cover object-left-top shadow-[0_22px_70px_rgba(8,17,31,0.2)] sm:rounded-[22px]",
          imageClassName,
        )}
      />
    </div>
  );
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const downloads = await getLatestReleaseDownloads();

  const heroTitle = t.rich("heroTitle", {
    brand: (chunks) => (
      <span className="block text-brand">{chunks}</span>
    ),
  });
  const heroSubtitle = t.rich("heroSubtitle", {
    brand: (chunks) => <span className="text-slate-950 dark:text-white">{chunks}</span>,
  });

  return (
    <MarketingLayout lang={lang}>
      <main className="min-h-screen overflow-x-clip bg-dory-page px-4 pt-0 pb-20 text-dory-ink sm:px-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[1300px] flex-col">
          <section className="relative grid gap-10 border-b border-slate-950/10 bg-dory-page pt-6 pb-14 md:min-h-[760px] md:grid-cols-[0.84fr_1.16fr] md:items-center md:pt-8 md:pb-16 lg:min-h-[820px] dark:border-white/12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_72%_18%,rgba(36,73,111,0.08),transparent_34%),radial-gradient(circle_at_46%_12%,rgba(210,180,111,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_72%_18%,rgba(96,165,250,0.08),transparent_34%),radial-gradient(circle_at_46%_12%,rgba(230,211,173,0.04),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-45 bg-[image:var(--dory-grid-background)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.72),rgba(0,0,0,0.42)_48%,transparent_82%)]" />

            <div className="relative z-10">
              <SectionLabel>{t("heroTagline")}</SectionLabel>
              <h1 className="max-w-[780px] text-5xl leading-[0.94] font-semibold tracking-[-0.02em] text-balance [word-break:keep-all] sm:text-6xl md:text-8xl dark:text-white">
                {heroTitle}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-dory-muted md:text-xl md:leading-9">
                {t("heroDescription")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <DownloadButton
                  macUrl={downloads.macUrl}
                  fallbackUrl={downloads.releaseUrl}
                  platformOverride="mac-apple-silicon"
                />
                <a
                  href="https://app.getdory.dev"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                  )}
                >
                  {t("heroExperienceCta")}
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            <div className="relative z-10 min-w-0 md:h-[520px] lg:h-[580px]">
              <ScreenshotFrame
                src={HeroPreview}
                alt={t("heroPreviewAlt")}
                priority
                artwork="sunrise"
                className="md:absolute md:top-1/2 md:left-0 md:w-[760px] md:-translate-y-1/2 lg:w-[900px] xl:w-[980px]"
              />
            </div>
          </section>

          <section className="grid gap-6 border-b border-slate-950/10 py-10 md:grid-cols-[0.8fr_1.2fr] md:py-14 dark:border-white/12">
            <p className="max-w-[620px] text-3xl leading-tight font-semibold text-balance md:text-5xl">
              {heroSubtitle}
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {heroCardKeys.map((key, index) => {
                const Icon = heroCardIcons[index];

                return (
                  <div
                    key={key}
                    className="group relative overflow-hidden border border-dory-line bg-dory-surface p-5 shadow-[var(--dory-shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--dory-shadow-card)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-brand opacity-80" />
                    <Icon className="mb-8 size-5 text-brand" />
                    <h2 className="text-lg font-medium">{t(`heroCards.${key}.title`)}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {t(`heroCards.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-8 border-b border-slate-950/10 py-12 md:grid-cols-[0.82fr_1.18fr] md:py-16 dark:border-white/12">
            <div>
              <SectionLabel>{t("aiNative.badge")}</SectionLabel>
              <h2 className="max-w-[620px] text-4xl leading-tight font-semibold text-balance md:text-6xl">
                {t.rich("aiNative.heading", {
                  ask: (chunks) => <span className="text-dory-ink">{chunks}</span>,
                  act: (chunks) => <span className="text-brand">{chunks}</span>,
                  stay: (chunks) => <span className="text-dory-brand-accent">{chunks}</span>,
                })}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("aiNative.description")}
              </p>
            </div>

            <div className="divide-y divide-slate-950/10 border border-dory-line bg-dory-surface shadow-[var(--dory-shadow-card)] dark:divide-white/12">
              {(["ask", "actions", "context"] as const).map((key, index) => (
                <div key={key} className="grid gap-5 p-5 md:grid-cols-[4rem_1fr] md:p-6">
                  <div className="flex size-12 items-center justify-center border border-dory-brand-line bg-dory-brand-soft text-lg font-semibold text-brand">
                    0{index + 1}
                  </div>
                  <div>
                    <div className="mb-4 text-xs font-semibold tracking-wide text-dory-brand-accent uppercase">
                    {t(`aiNative.tabs.${key}.label`)}
                    </div>
                    <h3 className="text-2xl font-semibold text-balance">
                      {t(`aiNative.tabs.${key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {t(`aiNative.tabs.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 border-b border-slate-950/10 py-12 md:py-16 dark:border-white/12">
            <div className="grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-end">
              <div>
                <SectionLabel>{t("coreWorkspace.badge")}</SectionLabel>
                <h2 className="max-w-[760px] text-4xl leading-tight font-semibold text-balance md:text-6xl">
                  {t.rich("coreWorkspace.title", {
                    brand: (chunks) => <span className="text-slate-500 dark:text-slate-300">{chunks}</span>,
                  })}
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-slate-600 md:justify-self-end dark:text-slate-300">
                {t("coreWorkspace.description")}
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <ScreenshotFrame
                src={HeroPreview}
                alt={t("coreWorkspace.screenshotAlt")}
                artwork="temeraire"
                className="min-w-0 shadow-[var(--dory-shadow-card)]"
              />
              <div className="grid gap-3">
                {workspaceFeatureKeys.map((key, index) => {
                  const Icon = workspaceFeatureIcons[index];

                  return (
                    <div
                      key={key}
                      className="border border-slate-950/10 bg-white p-5 dark:border-white/12 dark:bg-white/6"
                    >
                      <Icon className="mb-7 size-5 text-slate-500 dark:text-slate-300" />
                      <h3 className="text-xl font-medium">{t(`coreWorkspace.features.${key}.title`)}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {t(`coreWorkspace.features.${key}.description`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid gap-5 border-b border-slate-950/10 py-12 md:grid-cols-2 md:py-16 dark:border-white/12">
            <div className="border border-slate-950/10 bg-white dark:border-white/12 dark:bg-white/6">
              <div className="p-5 md:p-6">
                <SectionLabel>{t("tableOverview.badge")}</SectionLabel>
                <h2 className="text-3xl leading-tight font-semibold text-balance md:text-5xl">
                  {t("tableOverview.title")}
                </h2>
                <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t("tableOverview.description")}
                </p>
              </div>
              <ScreenshotFrame
                src={AiTablePreview}
                alt={t("tableOverview.screenshotAlt")}
                artwork="fog"
                className="mx-5 mb-5 rounded-[24px] p-5 shadow-none sm:mx-6 sm:mb-6 sm:p-6"
                imageClassName="aspect-[1.38/1]"
              />
            </div>

            <div className="border border-slate-950/10 bg-white dark:border-white/12 dark:bg-white/6">
              <div className="p-5 md:p-6">
                <SectionLabel>{t("chatbot.badge")}</SectionLabel>
                <h2 className="text-3xl leading-tight font-semibold text-balance md:text-5xl">
                  {t("chatbot.title")}
                </h2>
                <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t("chatbot.description")}
                </p>
              </div>
              <ScreenshotFrame
                src={ChatbotPreview}
                alt={t("chatbot.title")}
                artwork="sunrise"
                className="mx-5 mb-5 rounded-[24px] p-5 shadow-none sm:mx-6 sm:mb-6 sm:p-6"
                imageClassName="aspect-[1.38/1]"
              />
            </div>
          </section>

          <section className="grid gap-8 border-b border-slate-950/10 py-12 md:grid-cols-[0.72fr_1.28fr] md:py-16 dark:border-white/12">
            <div>
              <SectionLabel>{t("databaseSupport.badge")}</SectionLabel>
              <h2 className="text-4xl leading-tight font-semibold text-balance md:text-6xl">
                {t("databaseSupport.title")}
              </h2>
              <p className="mt-6 max-w-xl whitespace-pre-line text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("databaseSupport.description")}
              </p>
            </div>

            <div className="grid auto-rows-fr grid-cols-2 gap-3 md:grid-cols-3">
              {databaseSupportItems.map((database) => (
                <div
                  key={database.name}
                  className="flex min-h-20 items-center gap-3 border border-slate-950/10 bg-white p-4 dark:border-white/12 dark:bg-white/6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center border border-slate-950/10 bg-slate-50 dark:border-white/12 dark:bg-white/10">
                    <Image
                      src={database.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="max-h-8 max-w-8 object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="min-w-0 text-base font-medium md:text-lg">{database.name}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 border-b border-slate-950/10 py-12 md:grid-cols-[0.7fr_1.3fr] md:py-16 dark:border-white/12">
            <div>
              <SectionLabel>{t("moreFeatures.badge")}</SectionLabel>
              <h2 className="text-4xl leading-tight font-semibold text-balance md:text-6xl">
                {t("moreFeatures.title")}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("moreFeatures.description")}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {moreFeatureKeys.map((key, index) => {
                const Icon = moreFeatureIcons[index];

                return (
                  <div
                    key={key}
                    className="border border-slate-950/10 bg-white p-5 dark:border-white/12 dark:bg-white/6"
                  >
                    <Icon className="mb-8 size-5 text-slate-500 dark:text-slate-300" />
                    <h3 className="text-lg font-medium">{t(`moreFeatures.features.${key}.title`)}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {t(`moreFeatures.features.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-8 border-b border-slate-950/10 py-12 md:grid-cols-[0.72fr_1.28fr] md:py-16 dark:border-white/12">
            <div>
              <SectionLabel>{t("faq.headerLabel")}</SectionLabel>
              <h2 className="text-4xl leading-tight font-semibold text-balance md:text-6xl">
                {t("faq.title")}
              </h2>
            </div>

            <div className="divide-y divide-slate-950/10 border border-slate-950/10 bg-white dark:divide-white/12 dark:border-white/12 dark:bg-white/6">
              {faqKeys.map((key) => (
                <div key={key} className="p-5 md:p-6">
                  <h3 className="text-xl font-medium">{t(`faq.items.${key}.question`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {t(`faq.items.${key}.answer.paragraph1`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 pt-12 md:grid-cols-[1fr_auto] md:items-end md:pt-16">
            <div>
              <SectionLabel>{t("cta.badge")}</SectionLabel>
              <h2 className="max-w-[720px] text-5xl leading-[0.98] font-semibold text-balance md:text-7xl">
                {t("cta.title")}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("cta.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/download"
                className={cn(buttonVariants(), "gap-2")}
              >
                {t("downloadLatest")}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/docs"
                className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
              >
                Docs
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <FooterSection locale={lang} />
    </MarketingLayout>
  );
}
