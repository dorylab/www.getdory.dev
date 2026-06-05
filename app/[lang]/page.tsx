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
import ActionsPreview from "@/public/actions-focus.png";
import AiTablePreview from "@/public/ai-table-overview.png";
import AskPreview from "@/public/ask-focus.png";
import ChatbotPreview from "@/public/chatbot.png";
import ContextPreview from "@/public/context-focus.png";
import ConsolePreview from "@/public/easy-to-use-sql-console.png";
import HeroPreview from "@/public/hero.png";

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
const aiWorkflowItems = [
  { key: "ask", image: AskPreview },
  { key: "actions", image: ActionsPreview },
  { key: "context", image: ContextPreview },
] as const;
const workspaceFeatureKeys = ["editor", "schema", "saved"] as const;
const coreHighlightKeys = ["item1", "item2", "item3", "item4"] as const;
const databaseHighlightFeatureIndexes = [0, 1, 2] as const;
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
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 border border-dory-line bg-dory-surface-soft px-3 py-1.5 text-xs font-medium tracking-normal text-dory-muted">
      <Sparkles className="size-3.5" />
      {children}
    </div>
  );
}

function ProductFrame({
  src,
  alt,
  priority,
  className,
  imageClassName,
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-black/10 bg-[#0b0b0b] p-2 shadow-[0_36px_120px_rgba(16,16,15,0.2)] dark:border-white/12 dark:shadow-[0_36px_120px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-white/45">Dory workspace</span>
      </div>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        className={cn(
          "aspect-[1.62/1] w-full rounded-b-[16px] bg-black object-cover object-left-top",
          imageClassName,
        )}
      />
    </div>
  );
}

function MediaCard({
  src,
  alt,
  className,
  imageClassName,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-dory-line bg-[#0b0b0b] p-1.5",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        className={cn(
          "aspect-[1.38/1] w-full bg-black object-cover object-left-top",
          imageClassName,
        )}
      />
    </div>
  );
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-4xl leading-[1.02] font-medium text-balance md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const [t, downloads] = await Promise.all([
    getTranslations({ locale: lang, namespace: "landing" }),
    getLatestReleaseDownloads(),
  ]);

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
      <main className="min-h-screen overflow-x-clip bg-dory-page px-4 pb-20 text-dory-ink sm:px-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col">
          <section className="relative overflow-hidden border-b border-dory-line pt-18 pb-14 text-center md:pt-24 md:pb-20">
            <div className="pointer-events-none absolute inset-x-[-20%] top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(49,114,255,0.12),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.52),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.14),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_58%)]" />
            <div className="relative z-10 mx-auto max-w-5xl">
              <h1 className="mx-auto max-w-[980px] text-[clamp(3.6rem,11vw,9.4rem)] leading-[0.84] font-medium tracking-normal text-balance [word-break:keep-all]">
                {heroTitle}
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-dory-muted md:text-xl md:leading-9">
                {t("heroDescription")}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <DownloadButton
                  macUrl={downloads.macUrl}
                  fallbackUrl={downloads.releaseUrl}
                  platformOverride="mac-apple-silicon"
                />
                <a
                  href="https://app.getdory.dev"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
                >
                  {t("heroExperienceCta")}
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            <ProductFrame
              src={HeroPreview}
              alt={t("heroPreviewAlt")}
              priority
              className="relative z-10 mx-auto mt-14 max-w-[1180px]"
            />
          </section>

          <section className="grid gap-8 border-b border-dory-line py-10 md:grid-cols-[0.9fr_1.1fr] md:items-start md:py-14">
            <p className="max-w-2xl text-3xl leading-[1.08] font-medium text-balance md:text-5xl">
              {heroSubtitle}
            </p>
            <div className="grid gap-0 divide-y divide-dory-line border-y border-dory-line md:grid-cols-3 md:divide-x md:divide-y-0">
              {heroCardKeys.map((key, index) => {
                const Icon = heroCardIcons[index];

                return (
                  <div key={key} className="p-5 md:p-6">
                    <Icon className="mb-8 size-5 text-dory-muted" />
                    <h2 className="text-lg font-medium">{t(`heroCards.${key}.title`)}</h2>
                    <p className="mt-3 text-sm leading-6 text-dory-muted">
                      {t(`heroCards.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:py-24">
            <div className="grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-end">
              <SectionHeader
                label={t("aiNative.badge")}
                title={t.rich("aiNative.heading", {
                  ask: (chunks) => <span>{chunks}</span>,
                  act: (chunks) => <span className="text-brand">{chunks}</span>,
                  stay: (chunks) => <span className="text-dory-muted">{chunks}</span>,
                })}
              />
              <p className="max-w-2xl text-base leading-7 text-dory-muted md:justify-self-end md:text-lg md:leading-8">
                {t("aiNative.description")}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {aiWorkflowItems.map(({ key, image }, index) => (
                <article
                  key={key}
                  className="flex min-h-full flex-col justify-between border border-dory-line bg-dory-surface p-5 md:p-6"
                >
                  <div>
                    <div className="mb-7 flex items-center justify-between text-sm text-dory-muted">
                      <span>0{index + 1}</span>
                      <span>{t(`aiNative.tabs.${key}.label`)}</span>
                    </div>
                    <h3 className="text-2xl leading-tight font-medium text-balance">
                      {t(`aiNative.tabs.${key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-dory-muted">
                      {t(`aiNative.tabs.${key}.description`)}
                    </p>
                  </div>
                  <MediaCard
                    src={image}
                    alt={t(`aiNative.tabs.${key}.title`)}
                    className="mt-8"
                    imageClassName="aspect-[1.08/1] lg:aspect-[1.03/1]"
                  />
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:py-24">
            <div className="grid gap-6 md:grid-cols-[0.82fr_1.18fr] md:items-end">
              <SectionHeader
                label={t("coreWorkspace.badge")}
                title={t.rich("coreWorkspace.title", {
                  brand: (chunks) => <span className="text-dory-muted">{chunks}</span>,
                })}
              />
              <p className="max-w-2xl text-base leading-7 text-dory-muted md:justify-self-end md:text-lg md:leading-8">
                {t("coreWorkspace.description")}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.34fr_0.66fr]">
              <ProductFrame
                src={ConsolePreview}
                alt={t("coreWorkspace.screenshotAlt")}
                className="min-w-0 shadow-[0_28px_90px_rgba(16,16,15,0.16)]"
              />
              <div className="grid border-y border-dory-line lg:border-y-0">
                {workspaceFeatureKeys.map((key, index) => {
                  const Icon = workspaceFeatureIcons[index];

                  return (
                    <div key={key} className="border-b border-dory-line py-6 last:border-b-0 lg:first:pt-0">
                      <Icon className="mb-8 size-5 text-dory-muted" />
                      <h3 className="text-xl font-medium">{t(`coreWorkspace.features.${key}.title`)}</h3>
                      <p className="mt-3 text-sm leading-6 text-dory-muted">
                        {t(`coreWorkspace.features.${key}.description`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid border-t border-l border-dory-line md:grid-cols-4">
              {coreHighlightKeys.map((key) => (
                <div
                  key={key}
                  className="border-r border-b border-dory-line bg-dory-surface/55 p-5 text-sm leading-6 text-dory-muted md:p-6"
                >
                  {t(`coreWorkspace.highlights.${key}`)}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 border-b border-dory-line py-16 md:grid-cols-2 md:py-24">
            <div className="flex min-h-full flex-col justify-between border border-dory-line bg-dory-surface p-5 md:p-6">
              <div>
                <SectionLabel>{t("tableOverview.badge")}</SectionLabel>
                <h2 className="text-3xl leading-[1.05] font-medium text-balance md:text-5xl">
                  {t("tableOverview.title")}
                </h2>
                <p className="mt-5 text-sm leading-6 text-dory-muted md:text-base md:leading-7">
                  {t("tableOverview.description")}
                </p>
              </div>
              <ProductFrame
                src={AiTablePreview}
                alt={t("tableOverview.screenshotAlt")}
                className="mt-8 rounded-[18px] p-1.5 shadow-none"
                imageClassName="aspect-[1.38/1]"
              />
            </div>

            <div className="flex min-h-full flex-col justify-between border border-dory-line bg-dory-surface p-5 md:p-6">
              <div>
                <SectionLabel>{t("chatbot.badge")}</SectionLabel>
                <h2 className="text-3xl leading-[1.05] font-medium text-balance md:text-5xl">
                  {t("chatbot.title")}
                </h2>
                <p className="mt-5 text-sm leading-6 text-dory-muted md:text-base md:leading-7">
                  {t("chatbot.description")}
                </p>
              </div>
              <ProductFrame
                src={ChatbotPreview}
                alt={t("chatbot.title")}
                className="mt-8 rounded-[18px] p-1.5 shadow-none"
                imageClassName="aspect-[1.38/1]"
              />
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
            <SectionHeader
              label={t("databaseSupport.badge")}
              title={t("databaseSupport.title")}
              description={
                <span className="whitespace-pre-line">{t("databaseSupport.description")}</span>
              }
            />

            <div className="grid gap-4">
              <div className="grid auto-rows-fr grid-cols-2 border-t border-l border-dory-line md:grid-cols-3">
                {databaseSupportItems.map((database) => (
                  <div
                    key={database.name}
                    className="flex min-h-24 items-center gap-3 border-r border-b border-dory-line bg-dory-surface/55 p-4"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center border border-dory-line bg-dory-page">
                      <Image
                        src={database.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div className="min-w-0 text-base font-medium md:text-lg">{database.name}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 border border-dory-line bg-dory-surface p-5 md:grid-cols-[0.72fr_1.28fr] md:p-6">
                <h3 className="text-2xl leading-tight font-medium text-balance">
                  {t("databaseSupport.highlightTitle")}
                </h3>
                <div className="grid gap-3 md:grid-cols-3">
                  {databaseHighlightFeatureIndexes.map((index) => (
                    <div
                      key={index}
                      className="border border-dory-line bg-dory-page p-4 text-sm leading-6 text-dory-muted"
                    >
                      {t.raw("databaseSupport.highlightFeatures")[index]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:grid-cols-[0.7fr_1.3fr] md:py-24">
            <SectionHeader
              label={t("moreFeatures.badge")}
              title={t("moreFeatures.title")}
              description={t("moreFeatures.description")}
            />

            <div className="grid border-y border-dory-line md:grid-cols-2">
              {moreFeatureKeys.map((key, index) => {
                const Icon = moreFeatureIcons[index];

                return (
                  <div
                    key={key}
                    className="border-b border-dory-line p-5 md:border-r md:p-6 md:even:border-r-0"
                  >
                    <Icon className="mb-9 size-5 text-dory-muted" />
                    <h3 className="text-lg font-medium">{t(`moreFeatures.features.${key}.title`)}</h3>
                    <p className="mt-3 text-sm leading-6 text-dory-muted">
                      {t(`moreFeatures.features.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
            <SectionHeader label={t("faq.headerLabel")} title={t("faq.title")} />

            <div className="divide-y divide-dory-line border-y border-dory-line">
              {faqKeys.map((key) => (
                <div key={key} className="py-6">
                  <h3 className="text-xl font-medium">{t(`faq.items.${key}.question`)}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-dory-muted md:text-base md:leading-7">
                    {t(`faq.items.${key}.answer.paragraph1`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 pt-16 md:grid-cols-[1fr_auto] md:items-end md:pt-24">
            <div>
              <SectionLabel>{t("cta.badge")}</SectionLabel>
              <h2 className="max-w-[720px] text-5xl leading-[0.9] font-medium text-balance md:text-8xl">
                {t("cta.title")}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("cta.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/download" className={cn(buttonVariants(), "gap-2")}>
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
