'use client';

import React, { createContext, useContext, useState, useEffect, useTransition } from 'react';
import { Locale, locales, defaultLocale } from './config';
import en from './locales/en/common.json';
import hi from './locales/hi/common.json';
import mr from './locales/mr/common.json';
import ta from './locales/ta/common.json';
import te from './locales/te/common.json';
import bn from './locales/bn/common.json';

const translations: Record<Locale, Record<string, string>> = {
  en,
  hi,
  mr,
  ta,
  te,
  bn,
};

export const localeNames: Record<Locale, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  hi: { label: 'Hindi', native: 'हिंदी' },
  mr: { label: 'Marathi', native: 'मराठी' },
  ta: { label: 'Tamil', native: 'தமிழ்' },
  te: { label: 'Telugu', native: 'తెలుగు' },
  bn: { label: 'Bengali', native: 'বাংলা' },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portal_locale') as Locale;
      if (stored && locales.includes(stored)) {
        setLocaleState(stored);
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    startTransition(() => {
      setLocaleState(newLocale);
      try {
        localStorage.setItem('portal_locale', newLocale);
        document.documentElement.lang = newLocale;
      } catch {
        // Ignore localStorage write errors
      }
    });
  };

  const t = (key: string, fallback?: string): string => {
    const dict = translations[locale] || translations[defaultLocale];
    return dict[key] || translations[defaultLocale][key] || fallback || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
