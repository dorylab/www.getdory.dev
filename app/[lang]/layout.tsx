import { RootProvider } from 'fumadocs-ui/provider/next';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/contexts/theme-provider';
import { getMessages, type Language } from '@/lib/i18n';
import { i18nUI } from '@/lib/layout.shared';

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const messages = await getMessages(lang as Language);

  return (
    <RootProvider i18n={i18nUI.provider(lang)}>
      <NextIntlClientProvider locale={lang} messages={messages}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </RootProvider>
  );
}
