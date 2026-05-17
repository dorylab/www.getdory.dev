import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsPage
} from 'fumadocs-ui/layouts/docs/page';

import { Feedback } from '@/components/feedback/client';
import { getMDXComponents } from '@/mdx-components';
import { source } from '@/lib/source';

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);

  if (!page) {
    return {};
  }

  return {
    title: page.data.title,
    description: page.data.description
  };
}

export default async function DocPage({
  params
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={false}>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page)
          })}
        />
        <Feedback locale={lang} />
      </DocsBody>
    </DocsPage>
  );
}
