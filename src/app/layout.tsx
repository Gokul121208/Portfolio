import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import Loader from "@/components/motion/Loader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100"),
  title: { default: "Gokul M | Digital Marketer, Trader & Creator", template: "%s | Gokul M" },
  description:
    "Gokul M is a digital marketer, Forex & Futures trader and content creator, and founder of The Moments Lab AI Marketing Agency.",
  openGraph: { title: "Gokul M", description: "Digital Marketer · Forex & Futures Trader · Content Creator", type: "website" },
};
export const viewport: Viewport = { themeColor: "#07070b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <Loader />
            <Cursor />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <BackToTop />
            <WhatsAppWidget />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
