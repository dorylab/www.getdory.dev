import './global.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://getdory.dev'),
  manifest: '/site.webmanifest',
  title: {
    default: 'Dory',
    template: '%s | Dory'
  },
  description:
    'Dory is an AI-native data workspace for querying databases, understanding spreadsheets, and talking with data.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
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
