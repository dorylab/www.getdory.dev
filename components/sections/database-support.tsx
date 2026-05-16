import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Section } from "../ui/section";

const databaseDefinitions = [
  {
    key: "postgresql",
    name: "PostgreSQL",
    icon: "/icons/databases/postgresql.svg",
  },
  {
    key: "mysql",
    name: "MySQL",
    icon: "/icons/databases/mysql.svg",
  },
  {
    key: "sqlite",
    name: "SQLite",
    icon: "/icons/databases/sqlite.svg",
  },
  {
    key: "mariadb",
    name: "MariaDB",
    icon: "/icons/databases/mariadb.svg",
  },
  {
    key: "neon",
    name: "Neon",
    icon: "/icons/databases/neon.svg",
  },
  {
    key: "clickhouse",
    name: "ClickHouse",
    icon: "/icons/databases/clickhouse.svg",
  },
] as const;

const plannedDatabases = [
  {
    key: "duckdb",
    name: "DuckDB",
    icon: "/icons/databases/duckdb.svg",
  },
] as const;

type SupportedDatabase = (typeof databaseDefinitions)[number];
type PlannedDatabase = (typeof plannedDatabases)[number];
type DatabaseDefinition = SupportedDatabase | PlannedDatabase;

export default function DatabaseSupport() {
  const t = useTranslations("landing.databaseSupport");
  const highlightFeatures = t.raw("highlightFeatures") as string[];
  const clickHouse = databaseDefinitions.find(
    (database) => database.key === "clickhouse",
  );

  return (
    <Section className="relative overflow-hidden py-0 md:py-6">
      <div className="container mx-auto py-6 lg:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.86fr,1.14fr] lg:gap-10">
          <div className="space-y-4 text-center lg:sticky lg:top-28 lg:text-left">
            <div className="marketing-eyebrow">{t("badge")}</div>
            <h2 className="marketing-title text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="marketing-lead mx-auto max-w-[52ch] text-base leading-7 whitespace-pre-line lg:mx-0 lg:text-lg">
              {t("description")}
            </p>
          </div>

          <div className="marketing-panel overflow-hidden rounded-[28px] p-3 md:p-4">
            <div className="grid gap-3">
              <div className="rounded-[24px] border border-slate-200/70 bg-white/54 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:p-4 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="mb-4 px-1 text-sm font-semibold text-slate-950 dark:text-white">
                  {t("panelTitle")}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {databaseDefinitions.map((database) => (
                    <DatabaseChip key={database.key} database={database} />
                  ))}
                </div>
              </div>

              {clickHouse ? (
                <div className="relative overflow-hidden rounded-[24px] border border-emerald-500/18 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_42%),rgba(16,185,129,0.04)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] dark:border-emerald-300/16 dark:bg-emerald-300/[0.035] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <DatabaseIcon
                      database={clickHouse}
                      size="large"
                      glow="emerald"
                    />
                    <div className="min-w-0">
                      <div className="text-base font-semibold text-emerald-700 dark:text-emerald-300">
                        {t("highlightTitle")}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {highlightFeatures.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full border border-emerald-500/14 bg-white/64 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm dark:border-emerald-300/14 dark:bg-white/[0.045] dark:text-slate-200"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 rounded-[24px] border border-dashed border-amber-500/24 bg-amber-500/[0.055] p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-amber-300/[0.06]">
                <div className="flex min-w-0 items-center gap-3">
                  {plannedDatabases.map((database) => (
                    <DatabaseIcon key={database.key} database={database} />
                  ))}
                  <div className="min-w-0">
                    <div className="text-xs font-semibold tracking-[0.14em] text-amber-700 uppercase dark:text-amber-300">
                      {t("comingNextLabel")}
                    </div>
                    <div className="mt-1 truncate text-base font-semibold text-slate-950 dark:text-white">
                      {plannedDatabases
                        .map((database) => database.name)
                        .join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function DatabaseIcon({
  database,
  size = "default",
  glow = "none",
}: {
  database: DatabaseDefinition;
  size?: "default" | "large";
  glow?: "none" | "blue" | "emerald";
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out dark:border-white/10 dark:bg-white/8",
        size === "large" ? "h-14 w-14" : "h-10 w-10",
        database.key === "mysql" &&
          "border-sky-500/18 bg-sky-950 dark:border-sky-300/18 dark:bg-sky-950",
        glow === "blue" &&
          "border-blue-500/24 shadow-[0_10px_24px_rgba(37,99,235,0.14)] dark:border-blue-300/24 dark:shadow-[0_10px_24px_rgba(96,165,250,0.16)]",
        glow === "emerald" &&
          "border-emerald-500/28 shadow-[0_10px_30px_rgba(16,185,129,0.18)] dark:border-emerald-300/24 dark:shadow-[0_10px_30px_rgba(52,211,153,0.16)]",
      )}
    >
      <Image
        src={database.icon}
        alt=""
        width={size === "large" ? 28 : 20}
        height={size === "large" ? 28 : 20}
        className="object-contain"
      />
    </span>
  );
}

function DatabaseChip({ database }: { database: SupportedDatabase }) {
  return (
    <div className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-slate-200/76 bg-white/70 px-3 py-3 transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-blue-500/28 hover:bg-blue-50/64 hover:shadow-[0_12px_28px_rgba(37,99,235,0.09)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-300/24 dark:hover:bg-white/[0.07] dark:hover:shadow-[0_12px_28px_rgba(96,165,250,0.1)]">
      <div className="flex min-w-0 items-center gap-3">
        <span className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
          <DatabaseIcon database={database} glow="blue" />
        </span>
        <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
          {database.name}
        </span>
      </div>
      <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-300" />
    </div>
  );
}
