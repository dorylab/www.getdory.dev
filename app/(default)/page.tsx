import LangHomePage, {
  generateMetadata as generateLangMetadata
} from '../[lang]/page';

export function generateMetadata() {
  return generateLangMetadata({ params: Promise.resolve({ lang: 'en' }) });
}

export default function HomePage() {
  return <LangHomePage params={Promise.resolve({ lang: 'en' })} />;
}
