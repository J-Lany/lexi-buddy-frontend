import './globals.css';

import type { Metadata, Viewport } from 'next';
import { DM_Sans, DM_Serif_Display, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import React from 'react';

import { CookieConsentModal } from '@/features/cookie-consent';
import { I18nProvider } from '@/shared/i18n';
import { ReactQueryProvider } from '@/shared/providers/react-query-provider';
import { Toaster } from '@/shared/ui/sonner';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif-display',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lexi Buddy',
  description: 'AI-powered lesson builder for English teachers',
  icons: {
    icon: '/icon.webp',
    shortcut: '/icon.webp',
    apple: '/icon.webp',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${plusJakartaSans.variable}
        ${spaceMono.variable}
        ${dmSans.variable}
        ${dmSerifDisplay.variable}
      `}
    >
      <body className="font-sans">
        <ReactQueryProvider>
          <I18nProvider>
            <Toaster />
            {children}
            <CookieConsentModal />
          </I18nProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
