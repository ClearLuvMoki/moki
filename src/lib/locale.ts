import { cookies } from "next/headers";
import { blogConfig } from "@/config/index";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types/config";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value as Locale | undefined;

  if (locale && blogConfig.i18n.locales.includes(locale)) {
    return locale;
  }

  const defaultLocale = blogConfig.i18n.default_locale;
  if (blogConfig.i18n.locales.includes(defaultLocale)) {
    return defaultLocale;
  }

  return "zh";
}

export async function getServerDictionary() {
  const locale = await getServerLocale();
  return getDictionary(locale);
}
