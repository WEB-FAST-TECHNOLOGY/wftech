'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslations, SUPPORTED_LANGUAGES } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslations>;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
  t: getTranslations('fr'),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const stored = localStorage.getItem('wftech-lang') as Language | null;
    if (stored && SUPPORTED_LANGUAGES.find(l => l.code === stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('wftech-lang', lang);
    const dir = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.dir;
    document.documentElement.dir = dir ?? 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: getTranslations(language) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
