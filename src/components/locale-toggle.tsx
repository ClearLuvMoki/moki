"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/components/providers/locale-provider";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types/config";

export function LocaleToggle() {
  const { locale, setLocale, dict } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Languages className="size-5" />
          <span className="sr-only">{dict.locale.toggle}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {siteConfig.i18n.locales.map((item: Locale) => (
          <DropdownMenuItem
            key={item}
            onClick={() => setLocale(item)}
            className={locale === item ? "font-semibold" : ""}
          >
            {dict.locale[item]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
