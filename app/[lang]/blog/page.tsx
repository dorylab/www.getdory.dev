import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { ArrowRight, ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { MarketingLayout } from "@/components/marketing-layout";
import FooterSection from "@/components/sections/footer";
import {
  formatReleaseLabel,
  getBlogCategories,
  getReleaseNotes,
} from "@/lib/blog";
import { defaultLanguage, locales, type Language } from "@/lib/i18n";
import { generateMarketingMetadata } from "@/lib/marketing-og";

function resolveLanguage(lang: string): Language {
  return locales.includes(lang as Language) ? (lang as Language) : defaultLanguage;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLanguage(lang);

  return generateMarketingMetadata({ page: "blog", lang: locale });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLanguage(lang);
  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getReleaseNotes(locale),
  ]);
  const categories = getBlogCategories();
  const latestPost = posts[0] ?? null;
  const featuredPosts = posts.slice(0, 4);
  const recentPosts = posts.slice(0, 12);
  const releaseNoteHref = (slug: string) =>
    `/docs/release-notes/${slug.replaceAll(".", "-")}`;

  return (
    <MarketingLayout lang={lang}>
    <main className="min-h-screen bg-dory-page px-4 pt-10 pb-20 text-dory-ink sm:px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-12">
        <section className="grid min-h-[28rem] gap-px overflow-hidden border border-slate-950/10 bg-slate-950/10 md:grid-cols-[1.22fr_0.78fr] dark:border-white/10 dark:bg-white/10">
          {latestPost ? (
            <Link
              href={releaseNoteHref(latestPost.slug)}
              className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden bg-dory-brand-panel p-6 text-[#f7f7f4] md:p-8 lg:p-10"
            >
              <div className="absolute inset-0 bg-[image:var(--dory-release-background)]" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[image:var(--dory-release-fade)]" />
              <div className="relative max-w-2xl">
                <div className="mb-4 inline-flex border border-white/18 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] text-[#f7f7f4] uppercase">
                  {t("latestRelease")} · {formatReleaseLabel(latestPost.version)}
                </div>
                <h1 className="text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance md:text-6xl">
                  {latestPost.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#dbe3ef] md:text-lg">
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
                  className="group flex min-h-[9rem] flex-col justify-between bg-dory-page-wash p-5 text-dory-ink transition hover:bg-dory-surface md:p-6 dark:bg-[#111827] dark:text-[#eaf2ff] dark:hover:bg-white/[0.06]"
              >
                <div>
                  <div className="mb-3 text-xs font-medium tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                    {formatReleaseLabel(post.version)}
                  </div>
                  <h2 className="text-xl leading-tight font-semibold tracking-[-0.03em] text-balance text-slate-950 md:text-2xl dark:text-[#eaf2ff]">
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
          <span className="bg-brand px-4 py-2 text-sm font-medium text-brand-foreground">
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
                  <h2 className="text-2xl leading-tight font-semibold tracking-[-0.035em] text-balance text-slate-950 md:text-3xl dark:text-[#eaf2ff]">
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

        <section className="grid gap-6 bg-dory-brand-soft p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
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
    <FooterSection />
    </MarketingLayout>
  );
}
