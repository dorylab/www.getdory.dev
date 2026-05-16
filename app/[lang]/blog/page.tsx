import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { ArrowRight, ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { MarketingLayout } from "@/components/marketing-layout";
import {
  formatReleaseLabel,
  getBlogCategories,
  getReleaseNotes,
} from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description:
      "Product updates, release notes, and future writing from the Dory team.",
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [t, posts] = await Promise.all([
    getTranslations({ locale: lang, namespace: "blog" }),
    getReleaseNotes(),
  ]);
  const categories = getBlogCategories();
  const latestPost = posts[0] ?? null;
  const featuredPosts = posts.slice(0, 4);
  const recentPosts = posts.slice(0, 12);
  const releaseNoteHref = (slug: string) =>
    `/docs/release-notes/${slug.replaceAll(".", "-")}`;

  return (
    <MarketingLayout lang={lang}>
    <main className="min-h-screen bg-[#f7f7f3] px-4 pt-10 pb-20 text-slate-950 sm:px-6 md:px-10 dark:bg-[#0d1117] dark:text-white">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-12">
        <section className="grid min-h-[28rem] gap-px overflow-hidden border border-slate-950/10 bg-slate-950/10 md:grid-cols-[1.22fr_0.78fr] dark:border-white/10 dark:bg-white/10">
          {latestPost ? (
            <Link
              href={releaseNoteHref(latestPost.slug)}
              className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden bg-[#0f172a] p-6 text-white md:p-8 lg:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.5),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(20,184,166,0.38),transparent_28%),linear-gradient(135deg,#08111f,#172033_62%,#e9eef7)]" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/74 to-transparent" />
              <div className="relative max-w-2xl">
                <div className="mb-4 inline-flex border border-white/18 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase text-blue-100">
                  {t("latestRelease")} · {formatReleaseLabel(latestPost.version)}
                </div>
                <h1 className="text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance md:text-6xl">
                  {latestPost.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
                  {latestPost.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  {t("readPost")}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ) : null}

          <div className="grid gap-px bg-slate-950/10 dark:bg-white/10">
            {featuredPosts.slice(1, 4).map((post, index) => (
              <Link
                key={post.slug}
                href={releaseNoteHref(post.slug)}
                className="group flex min-h-[9rem] flex-col justify-between bg-[#fbfbf7] p-5 transition hover:bg-white md:p-6 dark:bg-[#111827] dark:hover:bg-[#151f2e]"
              >
                <div>
                  <div className="mb-3 text-xs font-medium tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                    {formatReleaseLabel(post.version)}
                  </div>
                  <h2 className="text-xl leading-tight font-semibold tracking-[-0.03em] text-balance md:text-2xl">
                    {post.title}
                  </h2>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>{index === 0 ? t("readLatest") : t("readPost")}</span>
                  <ChevronRight className="size-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-5xl leading-none font-semibold tracking-[-0.06em] md:text-7xl">
              {t("title")}
            </h1>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>
        </section>

        <section className="flex flex-wrap gap-2 border-y border-slate-950/10 py-4 dark:border-white/10">
          <span className="bg-slate-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-950">
            {t("postCount", { count: posts.length })}
          </span>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href="/docs/release-notes"
              className="border border-slate-950/12 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950 dark:border-white/12 dark:text-slate-300 dark:hover:border-white dark:hover:text-white"
            >
              {category.title}
            </Link>
          ))}
        </section>

        <section className="grid gap-0 border-t border-slate-950/10 dark:border-white/10">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={releaseNoteHref(post.slug)}
                className="group grid gap-4 border-b border-slate-950/10 py-6 transition hover:bg-white/60 md:grid-cols-[10rem_minmax(0,1fr)_8rem] md:items-start md:px-2 dark:border-white/10 dark:hover:bg-white/5"
              >
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {formatReleaseLabel(post.version)}
                </div>
                <div>
                  <h2 className="text-2xl leading-tight font-semibold tracking-[-0.035em] text-balance md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 md:justify-end dark:text-slate-400">
                  {t("readPost")}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))
          ) : (
            <p className="py-12 leading-7 text-slate-600 dark:text-slate-300">
              {t("empty")}
            </p>
          )}
        </section>

        <section className="grid gap-6 bg-[#e9edf3] p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8 dark:bg-white/8">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
              {t("categoryLabel")}
            </div>
            <p className="mt-4 max-w-3xl text-2xl leading-tight font-semibold tracking-[-0.035em] text-balance md:text-4xl">
              {t("releaseNotesDescription")}
            </p>
          </div>
          {latestPost ? (
            <Link
              href="/docs/release-notes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"
            >
              {t("readLatest")}
              <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </section>
      </div>
    </main>
    </MarketingLayout>
  );
}
