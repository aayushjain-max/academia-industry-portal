import './globals.css';
import React from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'Courier New', 'monospace'],
  adjustFontFallback: false,
});

export const metadata = {
  title: 'SKILLBRIDGE // SIH-2024 — Swiss Typographic Portal',
  description: 'Connecting Students, Industries, Academicians, and Institutions through mathematically verified skills and industrial research opportunities.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen bg-bg-canvas text-fg-primary antialiased font-body-md flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
