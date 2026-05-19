import { llms } from 'fumadocs-core/source';

import { getBlogPostBySlug, getBlogSlugs } from '@/lib/blog';
import { defaultLanguage, locales, type Language } from '@/lib/i18n';
import { llmsConfig } from '@/lib/llms';
import { source } from '@/lib/source';

export const revalidate = false;

function localizedBlogLLMPath(slug: string, locale: Language) {
  return locale === defaultLanguage
    ? `/llms.mdx/blog/${slug}`
    : `/llms.mdx/${locale}/blog/${slug}`;
}

async function getBlogLLMIndex() {
  const links = await Promise.all(
    locales.flatMap((locale) =>
      getBlogSlugs().map(async (slug) => {
        const post = await getBlogPostBySlug(slug, locale);

        if (!post) {
          return null;
        }

        return `- [${post.title}](${localizedBlogLLMPath(slug, locale)}): ${post.description}`;
      })
    )
  );
  const entries = links.filter((link): link is string => Boolean(link));

  if (entries.length === 0) {
    return '';
  }

  return `## Blog\n\n${entries.join('\n')}`;
}

export async function GET() {
  const [docsIndex, blogIndex] = await Promise.all([
    Promise.resolve(llms(source, llmsConfig).index()),
    getBlogLLMIndex()
  ]);

  return new Response([docsIndex, blogIndex].filter(Boolean).join('\n\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
