import { Roboto_Mono as FontCode, Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import type { Metadata } from "next";
// import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layout/footer";
import MainNavbar from "@/components/layout/main-nav";
import Logo from "@/components/logo";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontCode.variable,
          fontHeading.variable,
        )}
      >
        {/* <SessionProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md">
              <div className="container lg:max-w-4xl xl:max-w-6xl m-auto">
                <div className="flex h-20 items-center justify-between px-6 space-x-8 py-6">
                  <Logo />
                  <MainNavbar />
                </div>
              </div>
            </header>
            <main className="container flex-1 py-6 md:py-10 lg:max-w-4xl xl:max-w-6xl m-auto px-6">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" className="!font-sans" />
          {/* <ScrollToTopButton /> */}
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
        {/* </SessionProvider> */}

        {isProduction && (
          <script defer src="https://cloud.umami.is/script.js" data-website-id="a6b0f31d-cd50-4adc-ba32-7b85ae4d8bee"></script>
        )}
      </body>
    </html>
  );
}
