"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getDictionary, type Dictionary } from "@/i18n";
import type { Locale } from "@/types/config";

const LOCALE_COOKIE = "locale";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000`;
}

type LocaleProviderProps = {
  children: ReactNode;
  defaultLocale: Locale;
};

export function LocaleProvider({
  children,
  defaultLocale,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setLocaleCookie(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dict: getDictionary(locale),
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
