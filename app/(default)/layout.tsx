import { RootProvider } from 'fumadocs-ui/provider/next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/contexts/theme-provider';
import { getMessages } from '@/lib/i18n';
import { i18nUI } from '@/lib/layout.shared';

const lang = 'en';

export default async function DefaultLanguageLayout({
  children
}: {
  children: ReactNode;
}) {
  setRequestLocale(lang);

  const messages = await getMessages(lang);

  return (
    <RootProvider i18n={i18nUI.provider(lang)}>
      <NextIntlClientProvider locale={lang} messages={messages}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </RootProvider>
  );
}
