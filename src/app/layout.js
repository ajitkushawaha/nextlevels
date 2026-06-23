import { Farro, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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

export const metadata = {
  title: "Next Level Education Consultancy | Study Abroad Expert",
  description: "Leading overseas education consultancy providing free student visa consultation, university admission guidance, and comprehensive support to study in the UK, Canada, Australia, and New Zealand.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${farro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
