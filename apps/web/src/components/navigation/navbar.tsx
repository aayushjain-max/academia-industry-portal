'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './language-switcher';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMarketingPage =
    pathname === '/' ||
    pathname === '/ecosystem' ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname === '/how-it-works' ||
    pathname === '/privacy' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password');

  return (
    <>
      <header className="w-full bg-bg-surface border-b border-border-strong sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-space-md lg:px-space-lg max-w-[1440px] mx-auto h-14">
          <div className="flex items-center gap-space-lg h-full">
            {/* Brand Logo Anchor */}
            <Link
              href="/"
              className="text-headline-sm font-headline-sm tracking-tight text-fg-primary uppercase flex items-center gap-space-xs whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              <span className="w-3.5 h-3.5 bg-accent-signal inline-block border border-border-strong" />
              <span>SKILLBRIDGE // SIH-2024</span>
            </Link>
          </div>

          {/* Trailing Controls & Role Switcher Matrix */}
          <div className="flex items-center gap-space-sm">
            <LanguageSwitcher />

            <button
              type="button"
              className="p-2 text-fg-primary hover:bg-bg-subtle transition-colors duration-150 border border-transparent hover:border-border-strong"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search Ecosystem"
              aria-label="Search Ecosystem"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {!isMarketingPage && (
              <div className="relative">
                <Link
                  href="/student/notifications"
                  className="p-2 text-fg-primary hover:bg-bg-subtle transition-colors duration-150 border border-transparent hover:border-border-strong relative flex items-center justify-center"
                  title="Notifications"
                  aria-label="Notifications"
                >
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
                </Link>
              </div>
            )}

            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-1.5 bg-fg-primary text-bg-surface px-space-md py-1.5 text-body-sm font-label-mono hover:bg-accent-signal hover:text-fg-primary hover:border-border-strong transition-colors duration-150 uppercase border border-border-strong font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>Connect Portal</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="md:hidden p-2 text-fg-primary hover:bg-bg-subtle border border-border-strong"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-strong bg-bg-surface px-space-md py-space-sm space-y-1">
            <div className="pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 bg-fg-primary text-bg-surface py-2 text-body-sm font-label-mono uppercase"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Connect Portal</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-none p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-xl shadow-[6px_6px_0px_0px_#18181B] p-space-lg">
            <div className="flex justify-between items-center border-b border-border-strong pb-space-sm mb-space-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
                <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
                  GLOBAL ECOSYSTEM SEARCH // SIH-2024
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-fg-muted hover:text-fg-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="relative mb-space-md">
              <input
                type="text"
                autoFocus
                placeholder="Search skills, research dockets, corporate grants, universities..."
                className="w-full border border-border-strong p-3 text-body-md bg-bg-canvas font-mono placeholder:text-fg-muted focus:outline-none focus:ring-1 focus:ring-fg-primary"
              />
            </div>

            <div className="space-y-2">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase tracking-wider block">
                Quick Jump Nodes:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <Link
                  href="/student/dashboard"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 border border-border-hairline hover:border-border-strong hover:bg-bg-subtle flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent-signal" />
                  <span>Student Progress Radar</span>
                </Link>
                <Link
                  href="/academician/research"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 border border-border-hairline hover:border-border-strong hover:bg-bg-subtle flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent-signal" />
                  <span>Research Lab Pods</span>
                </Link>
                <Link
                  href="/industry/talent"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 border border-border-hairline hover:border-border-strong hover:bg-bg-subtle flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent-signal" />
                  <span>AI JD Skill Extractor</span>
                </Link>
                <Link
                  href="/institution/analytics"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 border border-border-hairline hover:border-border-strong hover:bg-bg-subtle flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent-signal" />
                  <span>AICTE Skill Gap Telemetry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

