import { BookOpen, Newspaper } from 'lucide-react';
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
      search: '搜索文档',
      searchNoResult: '没有找到结果',
      toc: '本页内容',
      tocNoHeadings: '没有标题',
      lastUpdate: '最后更新于',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      chooseTheme: '主题',
      editOnGithub: '在 GitHub 上编辑'
    }
  }
});

export function baseOptions(locale: string): BaseLayoutProps {
  const isZh = locale === 'zh';
  const localePrefix = isZh ? '/zh' : '';

  return {
    i18n: false,
    githubUrl: undefined,
    nav: {
      transparentMode: 'always',
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <img
            src="/logo.png"
            alt="Dory"
            className="h-8 w-8 object-contain"
          />
          Dory
        </span>
      )
    },
    links: [
      {
        type: 'main',
        text: isZh ? '文档' : 'Docs',
        url: `${localePrefix}/docs`,
        active: 'nested-url',
        icon: <BookOpen />
      },
      {
        type: 'main',
        text: isZh ? '博客' : 'Blog',
        url: `${localePrefix}/blog`,
        active: 'nested-url',
        icon: <Newspaper />
      },
      {
        type: 'button',
        text: isZh ? '下载' : 'Download',
        url: `${localePrefix}/download`,
        active: 'nested-url',
        secondary: true
      }
    ]
  };
}
