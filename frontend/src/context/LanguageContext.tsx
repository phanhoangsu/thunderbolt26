"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import en from "@/lib/translations/en.json";
import vi from "@/lib/translations/vi.json";

export type Language = "en" | "vi";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const translations = { en, vi };

const STORAGE_KEY = "ww-language-v2";

<<<<<<< HEAD
const DEFAULT_LANGUAGE: Language = "vi";
=======
const DEFAULT_LANGUAGE: Language = "en";

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "vi" ? saved : DEFAULT_LANGUAGE;
}
>>>>>>> 650f2e54aafb60c5c0625e97360007503946210c

const getNestedTranslation = (obj: Record<string, unknown>, path: string): string => {
  const value = path.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
  return typeof value === "string" ? value : path;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
<<<<<<< HEAD
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "vi") {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
=======
  const [language, setLanguageState] = useState<Language>(() => readStoredLanguage());

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
>>>>>>> 650f2e54aafb60c5c0625e97360007503946210c
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      let text = getNestedTranslation(
        translations[language] as Record<string, unknown>,
        key,
      );
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
