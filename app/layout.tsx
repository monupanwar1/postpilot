import '@/app/globals.css';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Powered Social Media Post Generator',
  description:
    'Create and download custom LinkedIn or X (Twitter) posts and many more',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Header/>
        {children}
        </body>
    </html>
  );
}
