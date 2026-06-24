import { Farro, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { defaultSiteSettings, mergeSiteSettings } from "@/lib/siteSettings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const farro = Farro({
  variable: "--font-farro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export async function generateMetadata() {
  const settings = await getGlobalSettings();
  return {
    title: settings.seo.defaultMetaTitle,
    description: settings.seo.defaultMetaDescription,
    keywords: settings.seo.defaultMetaKeywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    openGraph: {
      title: settings.seo.defaultMetaTitle,
      description: settings.seo.defaultMetaDescription,
      images: settings.seo.defaultOgImage ? [settings.seo.defaultOgImage] : [],
      siteName: settings.seo.siteName,
    },
    robots: settings.seo.defaultRobots,
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
  };
}

async function getGlobalSettings() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: "global" }).lean();
    return mergeSiteSettings(settings);
  } catch {
    return defaultSiteSettings;
  }
}

export default async function RootLayout({ children }) {
  const settings = await getGlobalSettings();
  const gaId = settings.seo.googleAnalyticsId?.trim();
  const gtmId = settings.seo.googleTagManagerId?.trim();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${farro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {children}
        <Toaster richColors position="top-right" />
        {gtmId ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
