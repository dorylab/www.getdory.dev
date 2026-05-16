import type { Metadata } from 'next';

import LangReleaseNoteDetailPage, {
  generateMetadata as generateLangMetadata
} from '../../../../[lang]/blog/release-notes/[slug]/page';

export function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return generateLangMetadata({
    params: params.then(({ slug }) => ({ lang: 'en', slug }))
  });
}

export default function ReleaseNoteDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <LangReleaseNoteDetailPage
      params={params.then(({ slug }) => ({ lang: 'en', slug }))}
    />
  );
}
