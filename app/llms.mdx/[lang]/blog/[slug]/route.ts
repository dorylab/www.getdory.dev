import { notFound } from 'next/navigation';

import { getBlogSlugs } from '@/lib/blog';
import { getBlogLLMText } from '@/lib/get-llm-text';
import { defaultLanguage, locales, type Language } from '@/lib/i18n';

function resolveLanguage(lang: string): Language {
  return locales.includes(lang as Language) ? (lang as Language) : defaultLanguage;
}

export const revalidate = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; slug: string }> }
) {
  const { lang, slug } = await params;
  const markdown = await getBlogLLMText(slug, resolveLanguage(lang));

  if (!markdown) {
    notFound();
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getBlogSlugs().map((slug) => ({
      lang,
      slug
    }))
  );
}
