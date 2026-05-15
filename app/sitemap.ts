import type { MetadataRoute } from 'next';

import { source } from '@/lib/source';

const siteUrl = 'https://docs.getdory.dev';

type SitemapEntry = MetadataRoute.Sitemap[number];

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

function getPriority(slugs: string[]) {
  if (slugs.length === 0) return 1;
  if (slugs.at(-1) === 'index') return 0.8;

  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesBySlug = new Map<
    string,
    Array<{ language: string; url: string; slugs: string[] }>
  >();

  for (const { language, pages } of source.getLanguages()) {
    for (const page of pages) {
      const key = page.slugs.join('/');
      const entries = pagesBySlug.get(key) ?? [];

      entries.push({
        language,
        url: page.url,
        slugs: page.slugs
      });
      pagesBySlug.set(key, entries);
    }
  }

  return Array.from(pagesBySlug.values())
    .flatMap((pages) =>
      pages.map<SitemapEntry>((page) => ({
        url: absoluteUrl(page.url),
        changeFrequency: 'weekly',
        priority: getPriority(page.slugs),
        alternates: {
          languages: Object.fromEntries(
            pages.map((alternate) => [
              alternate.language,
              absoluteUrl(alternate.url)
            ])
          )
        }
      }))
    )
    .sort((a, b) => a.url.localeCompare(b.url));
}
