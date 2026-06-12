export type Locale = "zh" | "en";

export type BlogConfig = {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  language: string;
  timezone: string;
  url: string;
  avatar: string;
  favicon: string;
  og_image: string;
  theme: {
    default_mode: "light" | "dark" | "system";
  };
  i18n: {
    default_locale: Locale;
    locales: Locale[];
  };
  database: {
    provider: "sqlite" | "postgresql";
  };
  comments: {
    enabled: boolean;
    provider: "builtin" | "giscus" | "utterances";
    giscus: {
      repo: string;
      repo_id: string;
      category: string;
      category_id: string;
      mapping: string;
      reactions_enabled: boolean;
    };
  };
  menu: Record<string, string>;
  social: {
    github: string;
    twitter: string;
    email: string;
  };
  analytics: {
    umami: {
      enabled: boolean;
      website_id: string;
    };
  };
};
