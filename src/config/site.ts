import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Moki",
  handle: "@moki",
  description: "Personal blog of Moki. ",
  url: "https://moonqueakes.online",
  ogImage: "/images/og.png",
  links: {
    mail: "clearluvmoki@gmail.com",
    twitter: "",
    github: "https://github.com/ClearLuvMoki",
  },
  author: {
    name: "Moki",
    email: "clearluvmoki@gmail.com",
    avatar: ""
  },
  nav: [
    {
      title: "Snippets",
      href: "/snippets",
      description:
        "Code snippets that I use often. Mostly for personal reference.",
    },
    {
      title: "Notes",
      href: "/notes",
      description: "My notes on various topics. Mostly for personal reference.",
    },
    {
      title: "Photos",
      href: "/photos",
      description: "My photos from various events and places.",
    },
  ],
};
