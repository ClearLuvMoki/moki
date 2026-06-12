import type { Locale } from "@/types/config";
import { en } from "./locales/en";
import { zh } from "./locales/zh";

export const dictionaries = { zh, en } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.zh;
}
