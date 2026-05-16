import { defineI18n } from 'fumadocs-core/i18n';
import type { AbstractIntlMessages } from 'next-intl';

export const languages = {
  en: 'English',
  zh: '中文'
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage = 'en';
export const locales = Object.keys(languages) as Language[];
export const isI18nEnabled = true;

export const i18n = defineI18n({
  defaultLanguage,
  languages: locales
});

export type Messages = AbstractIntlMessages;

export async function getMessages(locale: Language): Promise<Messages> {
  const messages = (await import(`@/public/messages/${locale}.json`)).default;
  return messages as Messages;
}
