'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n, localeNames } from '@/lib/i18n/use-i18n';
import { Locale, locales } from '@/lib/i18n/config';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 border border-border-hairline hover:border-border-strong bg-bg-surface text-fg-primary text-body-sm font-label-mono uppercase transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select Language / भाषा चुनें"
      >
        <span className="material-symbols-outlined text-[16px] text-fg-secondary">translate</span>
        <span className="font-semibold">{localeNames[locale]?.native || locale.toUpperCase()}</span>
        <span className="material-symbols-outlined text-[14px] text-fg-muted">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-bg-surface border-2 border-border-strong shadow-[4px_4px_0px_0px_#18181B] z-50 py-1">
          {locales.map((loc: Locale) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setLocale(loc);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-label-mono flex items-center justify-between hover:bg-bg-subtle transition-colors ${
                locale === loc
                  ? 'bg-fg-primary text-bg-surface font-bold hover:bg-fg-primary'
                  : 'text-fg-primary'
              }`}
            >
              <span>{localeNames[loc].native}</span>
              <span className={`text-[10px] ${locale === loc ? 'text-bg-subtle' : 'text-fg-muted'}`}>
                {localeNames[loc].label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
