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
  const post = await getBlogPostBySlug(slug, resolveLanguage(lang));

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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
      <FooterSection />
    </MarketingLayout>
  );
}
