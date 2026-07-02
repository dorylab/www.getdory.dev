import { BookOpen, House, Newspaper } from 'lucide-react';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import Github from '@/components/logos/github';
import { defaultLanguage, i18n } from '@/lib/i18n';

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
    },
    ja: {
      displayName: '日本語',
      search: 'ドキュメントを検索',
      searchNoResult: '結果が見つかりません',
      toc: 'このページの内容',
      tocNoHeadings: '見出しがありません',
      lastUpdate: '最終更新',
      chooseLanguage: '言語を選択',
      nextPage: '次のページ',
      previousPage: '前のページ',
      chooseTheme: 'テーマ',
      editOnGithub: 'GitHub で編集'
    },
    es: {
      displayName: 'Español',
      search: 'Buscar en la documentación',
      searchNoResult: 'No se encontraron resultados',
      toc: 'En esta página',
      tocNoHeadings: 'No hay encabezados',
      lastUpdate: 'Última actualización',
      chooseLanguage: 'Elegir idioma',
      nextPage: 'Página siguiente',
      previousPage: 'Página anterior',
      chooseTheme: 'Tema',
      editOnGithub: 'Editar en GitHub'
    }
  }
});

export function baseOptions(locale: string): BaseLayoutProps {
  const localePrefix = locale === defaultLanguage ? '' : `/${locale}`;
  const navCopy = {
    en: {
      home: 'Home',
      docs: 'Docs',
      blog: 'Blog',
      download: 'Download'
    },
    zh: {
      home: '首页',
      docs: '文档',
      blog: '博客',
      download: '下载'
    },
    ja: {
      home: 'ホーム',
      docs: 'ドキュメント',
      blog: 'ブログ',
      download: 'ダウンロード'
    },
    es: {
      home: 'Inicio',
      docs: 'Documentación',
      blog: 'Blog',
      download: 'Descargar'
    }
  }[locale] ?? {
    home: 'Home',
    docs: 'Docs',
    blog: 'Blog',
    download: 'Download'
  };

  return {
    i18n: false,
    githubUrl: undefined,
    nav: {
      transparentMode: 'always',
      url: localePrefix || '/',
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
        text: navCopy.home,
        url: localePrefix || '/',
        active: 'url',
        icon: <House />
      },
      {
        type: 'main',
        text: navCopy.docs,
        url: `${localePrefix}/docs`,
        active: 'nested-url',
        icon: <BookOpen />
      },
      {
        type: 'main',
        text: navCopy.blog,
        url: `${localePrefix}/blog`,
        active: 'nested-url',
        icon: <Newspaper />
      },
      {
        type: 'icon',
        text: 'GitHub',
        label: 'GitHub',
        icon: <Github />,
        url: 'https://github.com/dorylab/dory',
        active: 'none',
        external: true,
        secondary: true
      },
      {
        type: 'button',
        text: navCopy.download,
        url: `${localePrefix}/download`,
        active: 'nested-url',
        secondary: true
      }
    ]
  };
}
