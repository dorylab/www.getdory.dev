import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { MarketingLayout } from "@/components/marketing-layout";
import { Link } from "@/i18n/navigation";
import { formatReleaseLabel, getReleaseNotes } from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Release Notes",
    description:
      "See what shipped in each Dory release, including new features, improvements, and fixes.",
  };
}

export default async function ReleaseNotesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [t, posts] = await Promise.all([
    getTranslations({ locale: lang, namespace: "blog" }),
    getReleaseNotes(),
  ]);

  return (
    <MarketingLayout lang={lang}>
    <main className="relative min-h-screen overflow-hidden bg-[#f7fbff] px-4 pt-28 pb-12 text-slate-950 md:px-16 md:pt-32 dark:bg-[#07101f] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(24,168,144,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.28)_38%,rgba(255,255,255,0)_72%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_34%),radial-gradient(circle_at_top_right,rgba(46,211,183,0.18),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.72),rgba(15,23,42,0.24)_42%,rgba(15,23,42,0)_76%)]" />
      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-8">
        <div className="space-y-4">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
          >
            {t("blogHome")}
            <ChevronRight className="size-4" />
            <span>{t("releaseNotes")}</span>
          </Link>
          <div>
            <div className="border-brand/20 bg-brand/5 text-brand inline-flex rounded-full border px-3 py-1 text-sm font-medium">
              {t("categoryLabel")}
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              {t("releaseNotes")}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7 md:text-lg">
              {t("releaseNotesDescription")}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group hover:border-brand/30 relative cursor-pointer rounded-[28px] border border-slate-200/80 bg-white/72 px-6 py-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-950/58"
            >
              <Link
                href={`/blog/release-notes/${post.slug}`}
                aria-label={`${t("readPost")}: ${post.title}`}
                className="absolute inset-0 rounded-[28px]"
              />
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="pointer-events-none relative z-10 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="border-brand/20 bg-brand/5 text-brand rounded-full border px-3 py-1 font-medium">
                      {formatReleaseLabel(post.version)}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mt-3 leading-7">
                    {post.description}
                  </p>
                </div>
                <div className="pointer-events-none relative z-10 flex shrink-0 flex-col gap-3 md:items-end">
                  <div className="text-brand inline-flex items-center gap-2 font-medium">
                    {t("readPost")}
                    <ChevronRight className="size-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
    </MarketingLayout>
  );
}
