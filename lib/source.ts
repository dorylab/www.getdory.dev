import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docs } from 'collections/server';

import { defaultLanguage } from '@/lib/i18n';
import { i18n } from '@/lib/i18n';

export const source = loader({
  baseUrl: '/docs',
  i18n,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()]
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];
  const locale = page.locale ?? defaultLanguage;
  const localeSegment = locale === defaultLanguage ? '' : `/${locale}`;

  return {
    segments,
    url: `/og${localeSegment}/docs/${segments.join('/')}`
  };
}
