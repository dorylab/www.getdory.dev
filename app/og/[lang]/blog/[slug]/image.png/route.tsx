import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { locales, type Language } from "@/lib/i18n";
import { DoryOgImage } from "@/lib/og-image";
import { getOgLogoDataUrl } from "@/lib/og-logo";

export const revalidate = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; slug: string }> },
) {
  const { lang, slug } = await params;

  if (!locales.includes(lang as Language)) {
    notFound();
  }

  const post = await getBlogPostBySlug(slug, lang as Language);

  if (!post) {
    notFound();
  }

  const logoSrc = await getOgLogoDataUrl();

  return new ImageResponse(
    (
      <DoryOgImage
        title={post.title}
        description={post.description}
        site="Dory Blog"
        label="Blog"
        logoSrc={logoSrc}
        tone="release"
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return locales.flatMap((lang) => getBlogSlugs().map((slug) => ({ lang, slug })));
}
