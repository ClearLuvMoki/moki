export type SiteConfig = {
  name: string;
  handle: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    mail: string;
    twitter: string;
    github: string;
  };
  author: {
    name: string;
    email: string;
    avatar: string
  };
  nav: NavItem[];
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
