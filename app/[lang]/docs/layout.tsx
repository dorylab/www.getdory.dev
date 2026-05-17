import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import FooterSection from '@/components/sections/footer';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default async function DocsLayoutPage({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const options = baseOptions(lang);

  return (
    <HomeLayout {...options} className="dory-docs-shell min-h-screen bg-transparent">
      <DocsLayout
        {...options}
        githubUrl={undefined}
        i18n={false}
        links={[]}
        nav={{}}
        searchToggle={{ enabled: false }}
        sidebar={{ collapsible: false }}
        themeSwitch={{ enabled: false }}
        tree={source.getPageTree(lang)}
        containerProps={{ className: 'docs-with-site-header dory-docs-layout' }}
      >
        {children}
      </DocsLayout>
      <FooterSection />
    </HomeLayout>
  );
}
