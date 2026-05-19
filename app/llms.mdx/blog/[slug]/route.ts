import { notFound } from 'next/navigation';

import { getBlogSlugs } from '@/lib/blog';
import { getBlogLLMText } from '@/lib/get-llm-text';

const lang = 'en';

export const revalidate = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const markdown = await getBlogLLMText(slug, lang);

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
  return getBlogSlugs().map((slug) => ({ slug }));
}
