import { generate as DefaultImage } from 'fumadocs-ui/og';
import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';

import { locales } from '@/lib/i18n';
import {
  getMarketingOgContent,
  type MarketingOgPage
} from '@/lib/marketing-og';

const pages = ['home', 'blog', 'download'] satisfies MarketingOgPage[];

export const revalidate = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; page: string }> }
) {
  const { lang, page } = await params;

  if (!locales.includes(lang as (typeof locales)[number]) || !isMarketingOgPage(page)) {
    notFound();
  }

  const content = await getMarketingOgContent(page, lang);

  return new ImageResponse(
    (
      <DefaultImage
        title={content.title}
        description={content.description}
        site={content.site}
      />
    ),
    {
      width: 1200,
      height: 630
    }
  );
}

export function generateStaticParams() {
  return locales.flatMap((lang) => pages.map((page) => ({ lang, page })));
}

function isMarketingOgPage(page: string): page is MarketingOgPage {
  return pages.includes(page as MarketingOgPage);
}
