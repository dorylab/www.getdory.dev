import LangHomePage from '../[lang]/page';

export default function HomePage() {
  return <LangHomePage params={Promise.resolve({ lang: 'en' })} />;
}
