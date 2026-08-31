import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Academia-Industry Collaboration Portal',
  description: 'Connecting Students, Industries, Academicians, and Institutions for career acceleration and skill readiness.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
