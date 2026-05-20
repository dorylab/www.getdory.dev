import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FooterSection from "@/components/sections/footer";
import { MarketingLayout } from "@/components/marketing-layout";
import { getMDXComponents } from "@/mdx-components";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { defaultLanguage, locales, type Language } from "@/lib/i18n";

function resolveLanguage(lang: string): Language {
  return locales.includes(lang as Language) ? (lang as Language) : defaultLanguage;
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
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLanguage(lang);
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  const path = getBlogPostPath(slug, locale);
  const image = getBlogPostOgImage(slug, locale);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: path,
      siteName: "Dory Blog",
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveLanguage(lang);
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const MDX = post.body;

  return (
    <MarketingLayout lang={locale}>
      <main className="min-h-screen bg-dory-page px-4 pt-10 pb-20 text-dory-ink sm:px-6 md:px-10">
        <article className="mx-auto w-full max-w-3xl">
          <div className="mb-4 text-sm font-medium tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
            Blog
          </div>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <MDX components={getMDXComponents()} />
          </div>
        </article>
      </main>
      <FooterSection locale={locale} />
    </MarketingLayout>
  );
}
