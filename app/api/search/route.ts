import { createFromSource } from 'fumadocs-core/search/server';

import { source } from '@/lib/source';

export const { GET } = createFromSource(source, {
  language: 'english',
  localeMap: {
    en: {
      language: 'english'
    },
    zh: {
      language: 'english'
    },
    ja: {
      language: 'english'
    },
    es: {
      language: 'spanish'
    }
  }
});
