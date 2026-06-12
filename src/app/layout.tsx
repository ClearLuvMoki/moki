import { Roboto_Mono as FontCode, Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import type { Metadata } from "next";
// import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layout/footer";
import MainNavbar from "@/components/layout/main-nav";
import Logo from "@/components/logo";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { blogConfig } from "@/config/index";
import { siteConfig } from "@/config/site";
import { getServerLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { ViewTransitions } from "next-view-transitions";

// import { ScrollToTopButton } from "@/components/scroll-to-top-button"
// import { TailwindIndicator } from "@/components/tailwind-indicator"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontCode = FontCode({
  subsets: ["latin"],
  variable: "--font-code",
});

const fontHeading = localFont({
  src: "../../public/assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Moki",
    "ClearLuv",
    "ClearLuvMoki",
  ],
  authors: [
    {
      name: "Moki",
      url: "https://moonquakes.online",
    },
  ],
  creator: "Moki",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: siteConfig.ogImage,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.handle,
  },
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();
  const isProduction = process.env.NODE_ENV === "production";
  const umamiEnabled =
    isProduction && blogConfig.analytics.umami.enabled && blogConfig.analytics.umami.website_id;

  return (
    <ViewTransitions>
      <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontCode.variable,
          fontHeading.variable,
        )}
      >
        {/* <SessionProvider> */}
        <TRPCReactProvider>
          <LocaleProvider defaultLocale={locale}>
            <ThemeProvider
              attribute="class"
              defaultTheme={siteConfig.theme.default_mode}
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen flex-col">
                <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md">
                  <div className="container m-auto px-4 sm:px-6 lg:max-w-4xl xl:max-w-6xl">
                    <div className="flex h-[var(--site-header-height)] items-center justify-between gap-4 sm:space-x-8">
                      <Logo />
                      <MainNavbar />
                    </div>
                  </div>
                </header>
                <main className="container m-auto flex-1 px-4 py-6 sm:px-6 md:py-10 lg:max-w-4xl xl:max-w-6xl">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster position="bottom-right" className="!font-sans" />
            </ThemeProvider>
          </LocaleProvider>
        </TRPCReactProvider>

        {umamiEnabled && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={blogConfig.analytics.umami.website_id}
          />
        )}
      </body>
    </html>
    </ViewTransitions>
  );
}
