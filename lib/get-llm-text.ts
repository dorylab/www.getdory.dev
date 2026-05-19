import type { InferPageType } from 'fumadocs-core/source';

import { getBlogPostBySlug } from '@/lib/blog';
import { defaultLanguage, type Language } from '@/lib/i18n';
import { source } from '@/lib/source';

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

function localizedBlogPath(slug: string, locale: Language) {
  return locale === defaultLanguage ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
}

export async function getBlogLLMText(
  slug: string,
  locale: Language = defaultLanguage
) {
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return null;
  }

  const processed = await post.getText('processed');

  return `# ${post.title} (${localizedBlogPath(slug, locale)})

${processed}`;
}
