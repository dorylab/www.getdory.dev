import {
  ArrowRight,
  Bot,
  ChartColumn,
  Code2,
  Database,
  FileClock,
  Layers3,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Table2,
  TerminalSquare,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ComponentType, ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { DownloadButton } from "@/components/landing/download-button";
import { buttonVariants } from "@/components/landing/variants";
import Github from "@/components/logos/github";
import { MarketingLayout } from "@/components/marketing-layout";
import FooterSection from "@/components/sections/footer";
import { Link } from "@/i18n/navigation";
import { getLatestReleaseDownloads } from "@/lib/github-release";
import { generateMarketingMetadata } from "@/lib/marketing-og";
import { cn } from "@/lib/utils";
import AiTablePreview from "@/public/ai-table-overview.png";
import ConsolePreview from "@/public/easy-to-use-sql-console.png";
import HeroPreview from "@/public/hero.png";
import McpPreview from "@/public/mcp.png";
import ResultPreview from "@/public/result-table.png";

type PageProps = {
  params: Promise<{ lang: string }>;
};

type Icon = ComponentType<{ className?: string }>;

type TextItem = {
  title: string;
  description: string;
};

type DatabaseGroup = {
  label: string;
  items: string[];
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return generateMarketingMetadata({ page: "home", lang });
}

const proofIcons = [Bot, TerminalSquare, FileClock] as const;
const workspaceIcons = [TerminalSquare, Bot, Layers3] as const;
const classicIcons = [
  Code2,
  Database,
  Table2,
  Search,
  ChartColumn,
  FileClock,
] as const;
const faqKeys = ["plainMcp", "dailyClient", "desktopMcp", "dataSafety"] as const;
const databaseIcons: Record<string, string> = {
  ClickHouse: "/icons/databases/clickhouse.svg",
  PostgreSQL: "/icons/databases/postgresql.svg",
  MySQL: "/icons/databases/mysql.svg",
  MariaDB: "/icons/databases/mariadb.svg",
  SQLite: "/icons/databases/sqlite.svg",
  DuckDB: "/icons/databases/duckdb.svg",
  "SQL Server": "/icons/databases/sqlserver.svg",
  Oracle: "/icons/databases/oracle.svg",
  Neon: "/icons/databases/neon.svg",
  Snowflake: "/icons/databases/more.svg",
};

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
  children,
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-black/10 bg-[#11100f] p-2 shadow-[0_36px_120px_rgba(16,16,15,0.2)] dark:border-white/12 dark:shadow-[0_36px_120px_rgba(0,0,0,0.5)]",
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
      {children}
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

function IconItem({
  icon: IconComponent,
  title,
  description,
  index,
}: TextItem & {
  icon: Icon;
  index?: number;
}) {
  return (
    <article className="border border-dory-line bg-dory-surface p-5 md:p-6">
      <div className="mb-8 flex items-center justify-between text-sm text-dory-muted">
        <IconComponent className="size-5" />
        {typeof index === "number" ? <span>0{index + 1}</span> : null}
      </div>
      <h3 className="text-xl leading-tight font-medium text-balance md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-dory-muted">{description}</p>
    </article>
  );
}

function MiniImage({
  src,
  alt,
  className,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-dory-line bg-[#11100f] p-1.5",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        className="aspect-[1.42/1] w-full bg-black object-cover object-left-top"
      />
    </div>
  );
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const [t, downloads] = await Promise.all([
    getTranslations({ locale: lang, namespace: "landing" }),
    getLatestReleaseDownloads(),
  ]);

  const proofItems = t.raw("agentHome.proof.items") as TextItem[];
  const workspaceColumns = t.raw("agentHome.workspace.columns") as TextItem[];
  const classicFeatures = t.raw("agentHome.classic.features") as TextItem[];
  const mcpSteps = t.raw("agentHome.mcp.steps") as string[];
  const databaseGroups = t.raw(
    "agentHome.database.groups",
  ) as DatabaseGroup[];

  return (
    <MarketingLayout lang={lang}>
      <main className="min-h-screen overflow-x-clip bg-dory-page px-4 pb-20 text-dory-ink sm:px-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col">
          <section className="relative overflow-hidden border-b border-dory-line pt-18 pb-0 text-center md:pt-24">
            <div className="pointer-events-none absolute inset-x-[-12%] top-0 h-[700px] bg-[radial-gradient(circle_at_50%_0%,rgba(47,108,255,0.12),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.5),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(136,182,255,0.12),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_58%)]" />

            <div className="relative z-10 mx-auto max-w-5xl">
              <h1 className="mx-auto max-w-[980px] text-[clamp(3.8rem,10.4vw,9.2rem)] leading-[0.88] font-medium tracking-normal text-balance [word-break:keep-all]">
                {t("agentHome.hero.title")}
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-dory-muted md:text-xl md:leading-9">
                {t("agentHome.hero.description")}
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
              alt={t("agentHome.hero.imageAlt")}
              priority
              className="relative z-10 mx-auto mt-14 max-w-[1180px] translate-y-8 shadow-[0_28px_90px_rgba(16,16,15,0.16)] md:translate-y-12"
            />
          </section>

          <section className="grid gap-10 border-b border-dory-line py-14 md:grid-cols-[0.82fr_1.18fr] md:py-20">
            <SectionHeader
              label={t("agentHome.proof.label")}
              title={t("agentHome.proof.title")}
              description={t("agentHome.proof.description")}
            />
            <div className="grid gap-4 md:grid-cols-3">
              {proofItems.map((item, index) => (
                <IconItem
                  key={item.title}
                  icon={proofIcons[index] ?? Sparkles}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:py-24">
            <div className="grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-end">
              <SectionHeader
                label={t("agentHome.workspace.label")}
                title={t("agentHome.workspace.title")}
              />
              <p className="max-w-2xl text-base leading-7 text-dory-muted md:justify-self-end md:text-lg md:leading-8">
                {t("agentHome.workspace.description")}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {workspaceColumns.map((item, index) => (
                <IconItem
                  key={item.title}
                  icon={workspaceIcons[index] ?? Sparkles}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:grid-cols-[0.78fr_1.22fr] md:py-24">
            <div>
              <SectionHeader
                label={t("agentHome.mcp.label")}
                title={t("agentHome.mcp.title")}
                description={t("agentHome.mcp.description")}
              />

              <div className="mt-8 grid gap-3">
                {mcpSteps.map((step) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 border-b border-dory-line py-3 text-sm leading-6 text-dory-muted last:border-b-0"
                  >
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-dory-ink" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="border border-dory-line bg-[#171615] p-5 text-[#f7f1e8] shadow-[0_26px_90px_rgba(16,16,15,0.18)]">
                <div className="mb-5 flex items-center justify-between text-xs text-[#f7f1e8]/55">
                  <span>{t("agentHome.mcp.codeLabel")}</span>
                  <TerminalSquare className="size-4" />
                </div>
                <pre className="overflow-x-auto text-sm leading-7">
                  <code>{`codex mcp add dory --url http://127.0.0.1:3318/api/mcp\nclaude mcp add --transport http dory http://127.0.0.1:3318/api/mcp`}</code>
                </pre>
              </div>

              <ProductFrame
                src={McpPreview}
                alt={t("agentHome.mcp.imageAlt")}
                className="rounded-[18px] p-1.5 shadow-none"
                imageClassName="aspect-[1.62/1]"
              />
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:py-24">
            <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <SectionHeader
                label={t("agentHome.classic.label")}
                title={t("agentHome.classic.title")}
              />
              <p className="max-w-2xl text-base leading-7 text-dory-muted md:justify-self-end md:text-lg md:leading-8">
                {t("agentHome.classic.description")}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.24fr_0.76fr]">
              <ProductFrame
                src={ConsolePreview}
                alt={t("agentHome.classic.imageAlt")}
                className="min-w-0 shadow-[0_28px_90px_rgba(16,16,15,0.16)]"
              />
              <div className="grid border-y border-dory-line sm:grid-cols-2 lg:grid-cols-1 lg:border-y-0">
                {classicFeatures.map((feature, index) => {
                  const IconComponent = classicIcons[index] ?? Sparkles;

                  return (
                    <div
                      key={feature.title}
                      className="border-b border-dory-line py-5 sm:border-r sm:p-5 sm:[&:nth-child(2n)]:border-r-0 lg:border-r-0 lg:px-0 lg:first:pt-0 lg:last:border-b-0"
                    >
                      <IconComponent className="mb-5 size-5 text-dory-muted" />
                      <h3 className="text-lg font-medium">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-dory-muted">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <MiniImage src={ResultPreview} alt={t("agentHome.classic.resultsAlt")} />
              <MiniImage src={AiTablePreview} alt={t("agentHome.classic.chartsAlt")} />
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
            <SectionHeader
              label={t("agentHome.database.label")}
              title={t("agentHome.database.title")}
              description={t("agentHome.database.description")}
            />

            <div className="grid gap-4">
              {databaseGroups.map((group, groupIndex) => (
                <div
                  key={group.label}
                  className={cn(
                    "border border-dory-line bg-dory-surface p-5",
                    groupIndex === 0 &&
                      "bg-[linear-gradient(135deg,rgba(217,196,139,0.18),transparent_55%),var(--dory-surface-strong)]",
                  )}
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-medium">{group.label}</h3>
                    {groupIndex === 0 ? (
                      <span className="text-xs font-medium text-dory-muted">
                        {t("agentHome.database.clickhouseNote")}
                      </span>
                    ) : null}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((name) => (
                      <div
                        key={name}
                        className="flex min-h-16 items-center gap-3 border border-dory-line bg-dory-page p-3"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center border border-dory-line bg-dory-surface">
                          <Image
                            src={databaseIcons[name] ?? "/icons/databases/more.svg"}
                            alt=""
                            width={28}
                            height={28}
                            className="h-7 w-7 object-contain"
                          />
                        </span>
                        <span className="min-w-0 text-sm font-medium md:text-base">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-16 md:grid-cols-[0.72fr_1.28fr] md:py-24">
            <SectionHeader
              label={t("agentHome.faq.label")}
              title={t("agentHome.faq.title")}
            />

            <div className="divide-y divide-dory-line border-y border-dory-line">
              {faqKeys.map((key) => (
                <div key={key} className="py-6">
                  <h3 className="text-xl font-medium">
                    {t(`agentHome.faq.items.${key}.question`)}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-dory-muted md:text-base md:leading-7">
                    {t(`agentHome.faq.items.${key}.answer`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 pt-16 md:grid-cols-[1fr_auto] md:items-end md:pt-24">
            <div>
              <SectionLabel>{t("agentHome.cta.label")}</SectionLabel>
              <h2 className="max-w-[760px] text-5xl leading-[0.9] font-medium text-balance md:text-8xl">
                {t("agentHome.cta.title")}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.cta.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/download" className={cn(buttonVariants(), "gap-2")}>
                {t("downloadLatest")}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://app.getdory.dev"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
              >
                <Play className="size-4" />
                {t("heroExperienceCta")}
              </a>
              <a
                href="https://github.com/dorylab/dory"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
              >
                <Github className="size-4" />
                {t("viewOnGitHub")}
              </a>
            </div>
          </section>
        </div>
      </main>
      <FooterSection locale={lang} />
    </MarketingLayout>
  );
}
