import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';

import { i18n } from '@/lib/i18n';

const fumadocsI18nMiddleware = createI18nMiddleware(i18n);

const defaultLanguagePaths = [
  '/',
  '/docs',
  '/download',
  '/download/redirect',
  '/blog',
  '/blog/release-notes'
];

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (
    defaultLanguagePaths.includes(pathname) ||
    pathname.startsWith('/docs/') ||
    pathname.startsWith('/blog/release-notes/')
  ) {
    return NextResponse.next();
  }

  return fumadocsI18nMiddleware(request, event);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png|.*\\..*).*)']
};
