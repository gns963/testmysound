import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config/site";
import {
  jsonLdScriptProps,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/jsonld";
import { themeInitScript } from "@/components/theme/theme-script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  verification: {
    google: "87XJehuT4jnwZoOfahby6Wj62QtV00imUuNor9NM9Pk",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Blocking, pre-hydration: applies a stored theme choice before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script {...jsonLdScriptProps(organizationJsonLd())} />
        <script {...jsonLdScriptProps(websiteJsonLd())} />
      </head>
      <body className="bg-bg text-text flex min-h-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
