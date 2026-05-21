import './global.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://getdory.dev'),
  title: {
    default: 'Dory',
    template: '%s | Dory'
  },
  description:
    'Dory is an AI-native data workspace for querying databases, understanding spreadsheets, and talking with data.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="dory-shell flex min-h-screen flex-col font-[family-name:'IBM_Plex_Sans','Segoe_UI',sans-serif]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
