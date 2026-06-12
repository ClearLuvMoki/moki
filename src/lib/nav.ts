import type { Locale } from "@/types/config";

const navTitles: Record<string, Record<Locale, string>> = {
  Home: { zh: "首页", en: "Home" },
  Blog: { zh: "博客", en: "Blog" },
};

export function getNavTitle(title: string, locale: Locale) {
  return navTitles[title]?.[locale] ?? title;
}
