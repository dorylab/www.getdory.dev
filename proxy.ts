import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';

import { i18n } from '@/lib/i18n';

const fumadocsI18nMiddleware = createI18nMiddleware(i18n);
const { rewrite: rewriteDefaultDocsToMarkdown } = rewritePath(
  '/docs{/*path}',
  '/llms.mdx/docs{/*path}'
);
const { rewrite: rewriteLocalizedDocsToMarkdown } = rewritePath(
  '/:lang/docs{/*path}',
  '/llms.mdx/:lang/docs{/*path}'
);

const defaultLanguagePaths = [
  '/',
  '/docs',
  '/download',
  '/download/redirect',
  '/blog'
];

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (isMarkdownPreferred(request)) {
    const markdownPath =
      rewriteDefaultDocsToMarkdown(pathname) ||
      rewriteLocalizedDocsToMarkdown(pathname);

    if (markdownPath) {
      return NextResponse.rewrite(new URL(markdownPath, request.nextUrl));
    }
  }

  if (
    defaultLanguagePaths.includes(pathname) ||
    pathname.startsWith('/docs/') ||
    pathname === '/blog/release-notes' ||
    pathname.startsWith('/blog/release-notes/')
  ) {
    return NextResponse.next();
  }

  return fumadocsI18nMiddleware(request, event);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png|.*\\..*).*)']
};
