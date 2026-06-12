import type { BlogConfig } from "./config";

export type SiteConfig = {
  name: string;
  handle: string;
  description: string;
  url: string;
  ogImage: string;
  avatar: string;
  favicon: string;
  links: {
    mail: string;
    twitter: string;
    github: string;
  };
  author: {
    name: string;
    email: string;
    avatar: string;
  };
  nav: NavItem[];
  i18n: BlogConfig["i18n"];
  theme: BlogConfig["theme"];
  comments: BlogConfig["comments"];
};

export interface ContentNavItem extends NavItem {
  href: string;
}

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  description?: string;
  content?: ContentNavItem[];
};
