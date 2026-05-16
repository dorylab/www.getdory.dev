import LangDownloadPage from '../../[lang]/download/page';

export default function DownloadPage() {
  return <LangDownloadPage params={Promise.resolve({ lang: 'en' })} />;
}
