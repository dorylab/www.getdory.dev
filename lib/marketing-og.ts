import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { defaultLanguage, type Language } from '@/lib/i18n';

export type MarketingOgPage = 'home' | 'blog' | 'download';

const siteName = 'Dory';

export function getMarketingOgImage(page: MarketingOgPage, lang: string) {
  const localeSegment = lang === defaultLanguage ? '' : `/${lang}`;

  return {
    url: `/og${localeSegment}/pages/${page}/image.png`,
    width: 1200,
    height: 630
  };
}

export async function getMarketingOgContent(
  page: MarketingOgPage,
  lang: string = defaultLanguage
) {
  if (page === 'blog') {
    const t = await getTranslations({ locale: lang, namespace: 'blog' });

    return {
      title: t('title'),
      description: t('description'),
      site: `${siteName} Blog`
    };
  }

  if (page === 'download') {
    const t = await getTranslations({ locale: lang, namespace: 'downloadCenter' });

    return {
      title: t('title'),
      description: t('description', { product: 'Dory' }),
      site: siteName
    };
  }

  const t = await getTranslations({ locale: lang, namespace: 'landing' });

  return {
    title: 'Dory',
    description: t('heroDescription'),
    site: siteName
  };
}

export async function generateMarketingMetadata({
  page,
  lang = defaultLanguage
}: {
  page: MarketingOgPage;
  lang?: Language | string;
}): Promise<Metadata> {
  const content = await getMarketingOgContent(page, lang);
  const image = getMarketingOgImage(page, lang);

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      images: [image]
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [image.url]
    }
  };
}
