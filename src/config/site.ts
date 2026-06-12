import { blogConfig } from "@/config/index";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: blogConfig.title,
  handle: `@${blogConfig.author.toLowerCase()}`,
  description: blogConfig.description,
  url: blogConfig.url,
  ogImage: blogConfig.og_image,
  avatar: blogConfig.avatar,
  favicon: blogConfig.favicon,
  links: {
    mail: blogConfig.social.email,
    twitter: blogConfig.social.twitter,
    github: blogConfig.social.github,
  },
  author: {
    name: blogConfig.author,
    email: blogConfig.social.email,
    avatar: blogConfig.avatar,
  },
  nav: Object.entries(blogConfig.menu).map(([title, href]) => ({
    title,
    href,
  })),
  i18n: blogConfig.i18n,
  theme: blogConfig.theme,
  comments: blogConfig.comments,
};
