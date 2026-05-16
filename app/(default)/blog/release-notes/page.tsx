import LangReleaseNotesPage, {
  generateMetadata
} from '../../../[lang]/blog/release-notes/page';

export { generateMetadata };

export default function ReleaseNotesPage() {
  return <LangReleaseNotesPage params={Promise.resolve({ lang: 'en' })} />;
}
