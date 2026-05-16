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
import Image from "next/image";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { DownloadButton } from "@/components/landing/download-button";
import { MarketingLayout } from "@/components/marketing-layout";
import { Link } from "@/i18n/navigation";
import { getLatestReleaseDownloads } from "@/lib/github-release";
import AiTablePreview from "@/public/ai-table-overview.png";
import ChatbotPreview from "@/public/chatbot.png";
import HeroPreview from "@/public/easy-to-use-sql-console.png";

type PageProps = {
  params: Promise<{ lang: string }>;
};

const heroCardKeys = ["aiChat", "sqlConsole", "teamFlow"] as const;
const workspaceFeatureKeys = ["editor", "schema", "saved"] as const;
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 border border-slate-950/12 bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-slate-700 uppercase dark:border-white/12 dark:bg-white/6 dark:text-slate-300">
      <Sparkles className="size-3.5" />
      {children}
    </div>
  );
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const downloads = await getLatestReleaseDownloads();

  const heroTitle = t.rich("heroTitle", {
    brand: (chunks) => (
      <span className="block text-slate-500 dark:text-slate-300">{chunks}</span>
    ),
  });
  const heroSubtitle = t.rich("heroSubtitle", {
    brand: (chunks) => <span className="text-slate-950 dark:text-white">{chunks}</span>,
  });

  return (
    <MarketingLayout lang={lang}>
      <main className="min-h-screen bg-[#f7f7f3] px-4 pt-14 pb-20 text-slate-950 sm:px-6 md:px-10 dark:bg-[#0d1117] dark:text-white">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col">
          <section className="grid gap-10 border-b border-slate-950/10 pt-10 pb-14 md:grid-cols-[0.92fr_1.08fr] md:items-end md:pt-16 md:pb-18 dark:border-white/12">
            <div>
              <SectionLabel>{t("heroTagline")}</SectionLabel>
              <h1 className="max-w-[780px] text-5xl leading-[0.98] font-semibold text-balance [word-break:keep-all] sm:text-6xl md:text-8xl dark:text-white">
                {heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9 dark:text-slate-300">
                {t("heroDescription")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <DownloadButton
                  macUrl={downloads.macUrl}
                  windowsUrl={downloads.windowsUrl}
                  fallbackUrl={downloads.releaseUrl}
                  className="h-12 rounded-none bg-slate-950 px-5 text-sm font-medium text-white shadow-none hover:bg-slate-800 sm:min-w-[13.5rem] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                />
                <Link
                  href="/download"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-slate-950/10 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-950/30 hover:text-slate-950 dark:border-white/12 dark:bg-white/6 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
                >
                  <LayoutGrid className="size-4" />
                  {t("allPlatform")}
                </Link>
                <a
                  href="https://app.getdory.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-slate-950/10 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-950/30 hover:text-slate-950 dark:border-white/12 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
                >
                  {t("heroExperienceCta")}
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            <div className="min-w-0 border border-slate-950/10 bg-white p-2 shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-white/12 dark:bg-white/6 dark:shadow-none">
              <Image
                src={HeroPreview}
                alt={t("heroPreviewAlt")}
                priority
                className="aspect-[1.28/1] w-full object-cover object-left-top"
              />
            </div>
          </section>

          <section className="grid gap-5 border-b border-slate-950/10 py-10 md:grid-cols-[0.8fr_1.2fr] md:py-14 dark:border-white/12">
            <p className="max-w-[620px] text-3xl leading-tight font-semibold text-balance md:text-5xl">
              {heroSubtitle}
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {heroCardKeys.map((key, index) => {
                const Icon = heroCardIcons[index];

                return (
                  <div
                    key={key}
                    className="border border-slate-950/10 bg-white p-5 dark:border-white/12 dark:bg-white/6"
                  >
                    <Icon className="mb-8 size-5 text-slate-500 dark:text-slate-300" />
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
                  ask: (chunks) => <span>{chunks}</span>,
                  act: (chunks) => <span>{chunks}</span>,
                  stay: (chunks) => <span className="text-slate-500 dark:text-slate-300">{chunks}</span>,
                })}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("aiNative.description")}
              </p>
            </div>

            <div className="divide-y divide-slate-950/10 border border-slate-950/10 bg-white dark:divide-white/12 dark:border-white/12 dark:bg-white/6">
              {(["ask", "actions", "context"] as const).map((key) => (
                <div key={key} className="p-5 md:p-6">
                  <div className="mb-4 text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    {t(`aiNative.tabs.${key}.label`)}
                  </div>
                  <h3 className="text-2xl font-semibold text-balance">
                    {t(`aiNative.tabs.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {t(`aiNative.tabs.${key}.description`)}
                  </p>
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
              <div className="min-w-0 border border-slate-950/10 bg-white p-2 dark:border-white/12 dark:bg-white/6">
                <Image
                  src={HeroPreview}
                  alt={t("coreWorkspace.screenshotAlt")}
                  className="aspect-[1.45/1] w-full object-cover object-left-top"
                />
              </div>
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
              <div className="border-t border-slate-950/10 p-2 dark:border-white/12">
                <Image
                  src={AiTablePreview}
                  alt={t("tableOverview.screenshotAlt")}
                  className="aspect-[1.38/1] w-full object-cover object-left-top"
                />
              </div>
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
              <div className="border-t border-slate-950/10 p-2 dark:border-white/12">
                <Image
                  src={ChatbotPreview}
                  alt={t("chatbot.title")}
                  className="aspect-[1.38/1] w-full object-cover object-left-top"
                />
              </div>
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
              {["ClickHouse", "PostgreSQL", "MySQL", "SQLite", "MariaDB", "Neon"].map((database) => (
                <div
                  key={database}
                  className="flex min-h-28 flex-col justify-between border border-slate-950/10 bg-white p-4 dark:border-white/12 dark:bg-white/6"
                >
                  <Database className="size-5 text-slate-500 dark:text-slate-300" />
                  <div className="text-lg font-medium">{database}</div>
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
                className="inline-flex h-12 items-center justify-center gap-2 bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                {t("downloadLatest")}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center gap-2 border border-slate-950/10 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-950/30 hover:text-slate-950 dark:border-white/12 dark:bg-white/6 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
              >
                Docs
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </MarketingLayout>
  );
}
