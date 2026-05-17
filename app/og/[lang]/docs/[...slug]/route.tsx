import { generate as DefaultImage } from 'fumadocs-ui/og';
import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';

import { getPageImage, source } from '@/lib/source';

const siteName = 'Dory Docs';

export const revalidate = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; slug: string[] }> }
) {
  const { lang, slug } = await params;
  const page = source.getPage(slug.slice(0, -1), lang);

  if (!page) {
    notFound();
  }

  return new ImageResponse(
    (
      <DefaultImage
        title={page.data.title}
        description={page.data.description}
        site={siteName}
      />
    ),
    {
      width: 1200,
      height: 630
    }
  );
}

export function generateStaticParams() {
  return source
    .getPages()
    .map((page) => ({
      lang: page.locale,
      slug: getPageImage(page).segments
    }));
}
