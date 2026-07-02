import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { defaultLanguage, type Language } from '@/lib/i18n';

export type MarketingOgPage = 'home' | 'blog' | 'download';

const siteName = 'Dory';
const homeOgImageVersion = '20260527-actions-large';
const homeTitles: Partial<Record<Language, string>> = {
  en: 'Dory - AI-native SQL client for humans and agents',
  zh: 'Dory - 面向人类和 Agent 的 AI 原生 SQL 客户端',
  ja: 'Dory - 人間とエージェントのための AI ネイティブ SQL クライアント',
  es: 'Dory - Cliente SQL nativo de IA para humanos y agentes'
};

export function getMarketingOgImage(page: MarketingOgPage, lang: string) {
  const localeSegment = lang === defaultLanguage ? '' : `/${lang}`;
  const version = page === 'home' ? `?v=${homeOgImageVersion}` : '';

  return {
    url: `/og${localeSegment}/pages/${page}/image.png${version}`,
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
      site: `${siteName} Blog`,
      label: 'Release Notes',
      tone: 'release' as const
    };
  }

  if (page === 'download') {
    const t = await getTranslations({ locale: lang, namespace: 'downloadCenter' });

    return {
      title: t('title'),
      description: t('description', { product: 'Dory' }),
      site: siteName,
      label: 'Download',
      tone: 'default' as const
    };
  }

  const t = await getTranslations({ locale: lang, namespace: 'landing' });
  const locale = lang as Language;

  return {
    title: homeTitles[locale] ?? homeTitles[defaultLanguage] ?? siteName,
    description: t('heroDescription'),
    site: siteName,
    label: 'AI-native SQL Client',
    tone: 'default' as const
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
  const title =
    content.title.includes(siteName) || page === 'home'
      ? { absolute: content.title }
      : content.title;

  return {
    title,
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
