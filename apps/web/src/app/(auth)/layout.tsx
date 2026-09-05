import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-canvas text-fg-primary flex flex-col font-body-md selection:bg-accent-signal selection:text-fg-primary">
      <header className="w-full bg-bg-surface border-b border-border-hairline z-30 sticky top-0">
        <div className="max-w-[1440px] mx-auto px-space-md md:px-space-lg h-14 flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <Link
              href="/"
              className="font-headline-sm text-headline-sm tracking-tight text-fg-primary uppercase flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="w-3.5 h-3.5 bg-accent-signal border border-border-strong inline-block" />
              <span>SKILLBRIDGE // SIH-2024</span>
            </Link>
            <span className="hidden md:inline-block text-border-hairline">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 font-label-mono text-label-mono text-fg-muted uppercase">
              <span className="w-2 h-2 bg-accent-signal border border-border-strong rounded-none inline-block" />
              AUTHENTICATION PROTOCOL // SECURE NODE
            </span>
          </div>
          <div className="flex items-center gap-space-lg">
            <span className="hidden lg:inline-block font-label-mono text-label-mono text-fg-muted">
              SESSION ID : <span className="text-fg-primary tabular-nums">0x8042-AUTH-ALPHA</span>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 font-body-sm text-body-sm text-fg-muted hover:text-fg-primary hover:underline transition-colors duration-150"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Ecosystem</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}

