import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './locales/en.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';

const locales = { en, zh, ar, fr };

const languageNames = {
  en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
  zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = languageNames[lang].dir;
    // Add/remove RTL class for Tailwind
    if (languageNames[lang].dir === 'rtl') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [lang]);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = locales[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key; // fallback to key if not found
  }, [lang]);

  const switchLanguage = (newLang) => {
    if (locales[newLang]) setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, switchLanguage, languages: languageNames, isRTL: languageNames[lang].dir === 'rtl' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
