import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getBlogOgConfig } from "@/lib/blog-og";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { defaultLanguage } from "@/lib/i18n";
import { BlogOgImage } from "@/lib/og-image";
import { getOgLogoDataUrl } from "@/lib/og-logo";

export const revalidate = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, defaultLanguage);

  if (!post) {
    notFound();
  }

  const logoSrc = await getOgLogoDataUrl();
  const ogConfig = getBlogOgConfig(post, slug);

  return new ImageResponse(
    (
      <BlogOgImage
        title={post.title}
        description={post.description}
        slug={slug}
        category={ogConfig.category}
        logoSrc={logoSrc}
        locale={defaultLanguage}
        variant={ogConfig.variant}
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}
