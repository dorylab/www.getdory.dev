import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import remarkGfm from "remark-gfm";

import { MarketingLayout } from "@/components/marketing-layout";
import { Link } from "@/i18n/navigation";
import { formatReleaseLabel, getReleaseNoteBySlug } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getReleaseNoteBySlug(slug);

  if (!post) {
    return {
      title: "Release notes",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function ReleaseNoteDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = await getTranslations({ locale: lang, namespace: "blog" });
  const post = await getReleaseNoteBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <MarketingLayout lang={lang}>
      <main className="min-h-screen bg-[#f7f7f3] px-4 pt-16 pb-20 text-slate-950 sm:px-6 md:px-10 dark:bg-[#0d1117] dark:text-white">
        <div className="mx-auto w-full max-w-[980px]">
          <Link
            href="/blog/release-notes"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            <ChevronLeft className="size-4" />
            {t("backToReleaseNotes")}
          </Link>

          <header className="mt-12 border-b border-slate-950/10 pb-10 md:mt-18 md:pb-14 dark:border-white/12">
            <div className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
              {formatReleaseLabel(post.version)}
            </div>
            <h1 className="mt-6 max-w-[900px] text-5xl leading-[0.94] font-semibold tracking-[-0.06em] text-balance md:text-7xl dark:text-white">
              {post.title}
            </h1>
            <p className="mt-7 max-w-[720px] text-lg leading-8 text-slate-600 md:text-xl md:leading-9 dark:text-slate-300">
              {post.description}
            </p>
          </header>

          <article className="mx-auto mt-10 max-w-[760px] md:mt-14">
            <DocsBody className="text-[1rem] leading-7 text-slate-700 md:text-[1.04rem] dark:text-slate-200 [&_a]:font-medium [&_a]:text-slate-950 [&_a]:underline [&_a]:decoration-slate-400 [&_a]:underline-offset-4 dark:[&_a]:text-white [&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-slate-950/10 [&_h2]:pt-10 [&_h2]:text-3xl [&_h2]:tracking-[-0.035em] dark:[&_h2]:border-white/12 [&_h3]:text-xl [&_p]:text-slate-700 dark:[&_p]:text-slate-200 [&_pre]:rounded-none [&_pre]:border [&_pre]:border-slate-950/10 dark:[&_pre]:border-white/12">
              <MDXRemote
                source={post.body}
                components={defaultMdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </DocsBody>
          </article>
        </div>
      </main>
    </MarketingLayout>
  );
}
