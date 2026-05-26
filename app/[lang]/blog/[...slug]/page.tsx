import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { mdxComponents as blogMdxComponents } from "@/components/blog/mdx-components";
import FooterSection from "@/components/sections/footer";
import { MarketingLayout } from "@/components/marketing-layout";
import { getMDXComponents } from "@/mdx-components";
import {
  getBlogPostBySlug,
  getBlogSlugs,
  getReleaseNoteBySlug,
} from "@/lib/blog";
import { defaultLanguage, locales, type Language } from "@/lib/i18n";
import { source } from "@/lib/source";
import { Link } from "@/i18n/navigation";

function resolveLanguage(lang: string): Language {
  return locales.includes(lang as Language)
    ? (lang as Language)
    : defaultLanguage;
}

function getBlogSlug(slug: string[]) {
  return slug.length === 1 ? slug[0] : null;
}

function getReleaseNoteSlug(slug: string[]) {
  return slug[0] === "release-notes" && slug.length === 2 ? slug[1] : null;
}

function normalizeReleaseNoteSlug(slug: string) {
  return /^v?\d+(?:[-.]\d+)*$/i.test(slug) ? slug.replaceAll(".", "-") : slug;
}

function getBlogPostPath(slug: string, lang: Language) {
  return lang === defaultLanguage ? `/blog/${slug}` : `/${lang}/blog/${slug}`;
}

function getBlogPostOgImage(slug: string, lang: Language) {
  const localeSegment = lang === defaultLanguage ? "" : `/${lang}`;

  return {
    url: `/og${localeSegment}/blog/${slug}/image.png`,
    width: 1200,
    height: 630,
    alt: "Dory blog post preview",
  };
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getBlogSlugs().map((slug) => ({
      lang,
      slug: [slug],
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLanguage(lang);
  const blogSlug = getBlogSlug(slug);
  const releaseNoteSlug = getReleaseNoteSlug(slug);
  const releaseNotePage = releaseNoteSlug
    ? source.getPage(
        ["release-notes", normalizeReleaseNoteSlug(releaseNoteSlug)],
        locale,
      )
    : null;

  if (releaseNotePage) {
    return {
      title: releaseNotePage.data.title,
      description: releaseNotePage.data.description,
      openGraph: {
        title: releaseNotePage.data.title,
        description: releaseNotePage.data.description,
      },
      twitter: {
        card: "summary_large_image",
        title: releaseNotePage.data.title,
        description: releaseNotePage.data.description,
      },
    };
  }

  const post = blogSlug
    ? await getBlogPostBySlug(blogSlug, locale)
    : releaseNoteSlug
      ? await getReleaseNoteBySlug(releaseNoteSlug, locale)
      : null;

  if (!post) {
    return {};
  }

  const postPath = blogSlug ? getBlogPostPath(blogSlug, locale) : undefined;
  const image = blogSlug ? getBlogPostOgImage(blogSlug, locale) : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: postPath
      ? {
          canonical: postPath,
        }
      : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      url: postPath,
      siteName: "Dory Blog",
      type: "article",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: image ? [image.url] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveLanguage(lang);
  const blogSlug = getBlogSlug(slug);
  const releaseNoteSlug = getReleaseNoteSlug(slug);
  const releaseNotePage = releaseNoteSlug
    ? source.getPage(
        ["release-notes", normalizeReleaseNoteSlug(releaseNoteSlug)],
        locale,
      )
    : null;
  const post = blogSlug
    ? await getBlogPostBySlug(blogSlug, locale)
    : releaseNoteSlug && !releaseNotePage
      ? await getReleaseNoteBySlug(releaseNoteSlug, locale)
      : null;

  if (!post && !releaseNotePage) {
    notFound();
  }

  const isReleaseNote = Boolean(releaseNoteSlug);
  const releaseNoteBody =
    post && typeof post.body === "string" ? post.body : null;
  const MDX =
    releaseNotePage?.data.body ??
    (post && typeof post.body !== "string" ? post.body : null);
  const t = await getTranslations({ locale, namespace: "blog" });
  const linkLocale = locale === defaultLanguage ? undefined : locale;

  return (
    <MarketingLayout lang={locale}>
      <main className="min-h-screen bg-dory-page px-4 pt-10 pb-20 text-dory-ink sm:px-6 md:px-10">
        <article className="mx-auto w-full max-w-3xl">
          <Link
            href={isReleaseNote ? "/docs/release-notes" : "/blog"}
            locale={linkLocale}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="size-4" />
            {isReleaseNote ? t("backToReleaseNotes") : t("backToBlog")}
          </Link>
          <div className="mb-4 text-sm font-medium tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
            {isReleaseNote ? "Release Notes" : "Blog"}
          </div>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            {releaseNoteBody ? (
              <MDXRemote
                source={releaseNoteBody}
                options={{ parseFrontmatter: true }}
                components={blogMdxComponents}
              />
            ) : MDX ? (
              <MDX components={getMDXComponents()} />
            ) : null}
          </div>
        </article>
      </main>
      <FooterSection locale={locale} />
    </MarketingLayout>
  );
}
