import LangBlogPage, {
  generateMetadata
} from '../../[lang]/blog/page';

export { generateMetadata };

export default function BlogPage() {
  return <LangBlogPage params={Promise.resolve({ lang: 'en' })} />;
}
