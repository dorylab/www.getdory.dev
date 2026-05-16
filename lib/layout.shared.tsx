import { BookOpen, Download, Newspaper } from 'lucide-react';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { i18n } from '@/lib/i18n';

export const i18nUI = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English'
    },
    zh: {
      displayName: '简体中文',
      search: '搜索文档'
    }
  }
});

export function baseOptions(locale: string): BaseLayoutProps {
  const isZh = locale === 'zh';

  return {
    i18n,
    githubUrl: 'https://github.com/dorylab/dory',
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <img
            src="/logo.png"
            alt="Dory"
            className="h-8 w-8 rounded-xl object-contain shadow-sm"
          />
          Dory
        </span>
      )
    },
    links: [
      {
        type: 'main',
        text: isZh ? '文档' : 'Docs',
        url: '/docs',
        active: 'nested-url',
        icon: <BookOpen />
      },
      {
        type: 'main',
        text: isZh ? '博客' : 'Blog',
        url: '/blog',
        active: 'nested-url',
        icon: <Newspaper />
      },
      {
        type: 'main',
        text: isZh ? '下载' : 'Download',
        url: '/download',
        active: 'nested-url',
        icon: <Download />
      }
    ]
  };
}
