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
import NavigationProgress from "@/components/NavigationProgress";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gokulm.in";
const TITLE = "Gokul M | Digital Marketer, Forex Trader & Content Creator";
const DESC =
  "Gokul M is a digital marketer, Forex & Futures trader, content creator and founder of The Moments Lab AI Marketing Agency — helping brands grow through social media, video production, Meta ads and AI-powered lead generation.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: TITLE, template: "%s | Gokul M" },
  description: DESC,
  keywords: [
    "Gokul M", "digital marketer", "content creator", "Forex trader", "Futures trader",
    "social media marketing", "video production", "Meta ads", "lead generation",
    "The Moments Lab", "AI marketing agency", "Pondicherry digital marketer",
    "Instagram marketing", "short-form video", "marketing automation",
  ],
  authors: [{ name: "Gokul M", url: BASE }],
  creator: "Gokul M",
  publisher: "Gokul M",
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website", locale: "en_IN", url: BASE, siteName: "Gokul M",
    title: TITLE, description: DESC,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Gokul M — Digital Marketer, Forex Trader & Content Creator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE, description: DESC,
    images: ["/opengraph-image"],
  },
  alternates: { canonical: BASE },
};
export const viewport: Viewport = { themeColor: "#07070b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <NavigationProgress />
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
