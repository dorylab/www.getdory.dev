import LangDownloadPage, {
  generateMetadata as generateLangMetadata
} from '../../[lang]/download/page';

export function generateMetadata() {
  return generateLangMetadata({ params: Promise.resolve({ lang: 'en' }) });
}

export default function DownloadPage() {
  return <LangDownloadPage params={Promise.resolve({ lang: 'en' })} />;
}
