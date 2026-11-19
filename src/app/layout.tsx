import type { Metadata, Viewport } from "next";
import { Newsreader, Inter_Tight } from "next/font/google";
import "./globals.css";
import "@/styles/editorial.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

/*
 * Marks the page as script-enabled before first paint so entrance animations
 * can start hidden. If the page never signals it is ready (for example a
 * script error), the class is removed so content can never stay invisible.
 */
const MOTION_BOOTSTRAP = `(function(d){d.classList.add("js");setTimeout(function(){if(!d.classList.contains("gv-ready")){d.classList.remove("js")}},4000)})(document.documentElement);`;

export const metadata: Metadata = {
  title: {
    template: "%s | Global Ventures — Financial Advisory & Business Brokerage",
    default: "GLOBAL VENTURES | Financial Advisory & Business Transaction Brokerage",
  },
  description:
    "Where Capital Meets Opportunity. Institutional corporate finance advisory, mergers & acquisitions, defensible business valuation, and discreet transaction brokerage.",
  metadataBase: new URL("https://globalventures.com"),
  keywords: [
    "Financial Advisory UAE",
    "Mergers and Acquisitions Dubai",
    "Business Valuation",
    "Business Brokerage UAE",
    "Corporate Finance",
    "Transaction Advisory",
    "Sell Business UAE",
    "Quality of Earnings",
  ],
  authors: [{ name: "Global Ventures Advisory Group" }],
  openGraph: {
    title: "GLOBAL VENTURES — Where Capital Meets Opportunity",
    description:
      "Clarity in Finance. Confidence in Every Transaction. Elite corporate finance, business valuation, and confidential M&A brokerage.",
    url: "https://globalventures.com",
    siteName: "Global Ventures",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1C30",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${newsreader.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
      </head>
      <body className="bg-navy-950 text-ivory-100 font-sans antialiased selection:bg-gold-500 selection:text-navy-950 min-h-screen flex flex-col justify-between">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-navy-950 focus:font-semibold focus:rounded text-xs uppercase tracking-wider shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
