import type { MetadataRoute } from 'next';
import { existsSync } from 'node:fs';

import { getBlogSlugs } from '@/lib/blog';
import { defaultLanguage, locales } from '@/lib/i18n';
import { source } from '@/lib/source';

const siteUrl = 'https://getdory.dev';
const docsBasePath = '/docs';
const localizedDocExtensions = ['es', 'zh', 'ja'] as const;

type SitemapEntry = MetadataRoute.Sitemap[number];
type SitemapLanguage = (typeof locales)[number] | 'x-default';
type SourcePage = {
  language: string;
  url: string;
  slugs: string[];
};

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

function canonicalPath(locale: string, pathname: string) {
  if (locale === defaultLanguage) return pathname || '/';
  return `/${locale}${pathname}`;
}

function canonicalDocPath(page: SourcePage) {
  if (page.language !== defaultLanguage) return page.url;

  return page.url.replace(/^\/en(?=\/docs(?:\/|$))/, '');
}

function getDocPriority(slugs: string[]) {
  if (slugs.length === 0) return 0.95;
  if (slugs.at(0) === 'release-notes') {
    return slugs.length === 1 ? 0.5 : 0.35;
  }
  if (slugs.length === 1) return 0.8;

  return 0.65;
}

function getDocChangeFrequency(slugs: string[]): SitemapEntry['changeFrequency'] {
  return slugs.at(0) === 'release-notes' && slugs.length > 1
    ? 'monthly'
    : 'weekly';
}

function getDocContentFilePath(page: SourcePage) {
  const relativePath =
    page.slugs.length === 0
      ? 'index'
      : page.slugs.at(-1) === 'index'
        ? page.slugs.join('/')
        : page.slugs.join('/');

  if (page.language === defaultLanguage) {
    return `content/docs/${relativePath}.mdx`;
  }

  return `content/docs/${relativePath}.${page.language}.mdx`;
}

function hasLocalizedDocContent(page: SourcePage) {
  if (page.language === defaultLanguage) return true;
  if (!localizedDocExtensions.includes(page.language as never)) return false;

  return existsSync(getDocContentFilePath(page));
}

function buildAlternates(
  entries: Array<{ language: SitemapLanguage; url: string }>
) {
  return {
    languages: Object.fromEntries(
      entries.map((entry) => [entry.language, absoluteUrl(entry.url)])
    )
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pagesBySlug = new Map<
    string,
    SourcePage[]
  >();

  for (const { language, pages } of source.getLanguages()) {
    for (const page of pages) {
      const sourcePage = {
        language,
        url: page.url,
        slugs: page.slugs
      };

      if (!hasLocalizedDocContent(sourcePage)) continue;

      const key = page.slugs.join('/');
      const entries = pagesBySlug.get(key) ?? [];

      entries.push(sourcePage);
      pagesBySlug.set(key, entries);
    }
  }

  const docEntries = Array.from(pagesBySlug.values())
    .flatMap((pages) =>
      pages.map<SitemapEntry>((page) => {
        const alternates = pages.map((alternate) => ({
          language: alternate.language as SitemapLanguage,
          url: canonicalDocPath(alternate)
        }));
        const englishAlternate = alternates.find(
          (alternate) => alternate.language === defaultLanguage
        );

        if (englishAlternate) {
          alternates.push({
            language: 'x-default',
            url: englishAlternate.url
          });
        }

        return {
          url: absoluteUrl(canonicalDocPath(page)),
          changeFrequency: getDocChangeFrequency(page.slugs),
          priority: getDocPriority(page.slugs),
          alternates: buildAlternates(alternates)
        };
      })
    );

  const marketingPaths = [
    { pathname: '', priority: 1 },
    { pathname: docsBasePath, priority: 0.95 },
    { pathname: '/download', priority: 0.7 },
    { pathname: '/blog', priority: 0.7 }
  ] as const;

  const marketingEntries = marketingPaths.flatMap(({ pathname, priority }) => {
    const alternates = locales.map((locale) => ({
      language: locale as SitemapLanguage,
      url: canonicalPath(locale, pathname)
    }));
    const englishAlternate = alternates.find(
      (alternate) => alternate.language === defaultLanguage
    );

    if (englishAlternate) {
      alternates.push({
        language: 'x-default',
        url: englishAlternate.url
      });
    }

    return locales.map<SitemapEntry>((locale) => ({
      url: absoluteUrl(canonicalPath(locale, pathname)),
      changeFrequency: 'weekly',
      priority,
      alternates: buildAlternates(alternates)
    }));
  });

  const blogPostEntries = getBlogSlugs().flatMap((slug) => {
    const pathname = `/blog/${slug}`;
    const alternates = locales.map((locale) => ({
      language: locale as SitemapLanguage,
      url: canonicalPath(locale, pathname)
    }));
    const englishAlternate = alternates.find(
      (alternate) => alternate.language === defaultLanguage
    );

    if (englishAlternate) {
      alternates.push({
        language: 'x-default',
        url: englishAlternate.url
      });
    }

    return locales.map<SitemapEntry>((locale) => ({
      url: absoluteUrl(canonicalPath(locale, pathname)),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: buildAlternates(alternates)
    }));
  });

  const uniqueEntries = new Map<string, SitemapEntry>();

  for (const entry of [...marketingEntries, ...blogPostEntries, ...docEntries]) {
    uniqueEntries.set(entry.url, entry);
  }

  return Array.from(uniqueEntries.values());
}
