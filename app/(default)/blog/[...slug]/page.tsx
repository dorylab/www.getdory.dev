import LangBlogPostPage, {
  generateMetadata as generateLangMetadata,
} from "../../../[lang]/blog/[...slug]/page";

const lang = "en";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return [];
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return generateLangMetadata({
    params: params.then(({ slug }) => ({
      lang,
      slug,
    })),
  });
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return (
    <LangBlogPostPage
      params={params.then(({ slug }) => ({
        lang,
        slug,
      }))}
    />
  );
}
