import LangDownloadRedirectPage from '../../../[lang]/download/redirect/page';

export default function DownloadRedirectPage({
  searchParams
}: {
  searchParams: Promise<{ platform?: string }>;
}) {
  return (
    <LangDownloadRedirectPage
      params={Promise.resolve({ lang: 'en' })}
      searchParams={searchParams}
    />
  );
}
