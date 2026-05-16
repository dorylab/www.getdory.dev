'use client';

import { type ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  {
    ssr: false,
  },
);

export function ContentAdoptionBackground(props: ComponentProps<typeof GrainGradient>) {
  const { resolvedTheme } = useTheme();

  return (
    <GrainGradient
      colors={
        resolvedTheme === 'dark'
          ? [
            '#3B82F6',
            '#06B6D4',
            '#6366F1',
            '#0B122000',
          ]
          : [
            '#2563EB',
            '#22D3EE',
            '#A5B4FC',
            '#FFFFFF00',
          ]
      }
      speed={0}
      colorBack={resolvedTheme === 'dark' ? '#050814' : '#F8FAFF'}
      shape="sphere"
      {...props}
    />
  );
}
