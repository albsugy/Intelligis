import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import * as React from 'react';

import '@/styles/globals.css';

import { AI } from '@/lib/ai/actions';
import { cn } from '@/lib/utils';

import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: '@albsugy',
  },
  authors: [
    {
      name: 'Medhat Albsugy',
      url: 'https://albsugy.com/medhat',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <AI>
        <html lang='en'>
          <body
            className={cn(
              'min-h-screen bg-background font-sans antialiased',
              fontSans.variable
            )}
          >
            {children}
            <Toaster />
          </body>
        </html>
      </AI>
    </ClerkProvider>
  );
}
