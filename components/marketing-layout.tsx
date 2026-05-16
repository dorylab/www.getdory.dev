"use client";

import type { ComponentProps, ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { baseOptions } from '@/lib/layout.shared';

function MarketingContainer({
  children,
  className,
  ...props
}: ComponentProps<'main'>) {
  return (
    <main
      id="nd-home-layout"
      {...props}
      className={`flex flex-1 flex-col [--fd-layout-width:1400px] ${className ?? ''}`}
    >
      {children}
    </main>
  );
}

export function MarketingLayout({
  children,
  lang
}: {
  children: ReactNode;
  lang: string;
}) {
  return (
    <HomeLayout
      {...baseOptions(lang)}
      className="min-h-screen bg-transparent"
      slots={{ container: MarketingContainer }}
    >
      {children}
    </HomeLayout>
  );
}
