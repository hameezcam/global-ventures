import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-navy-950 text-ivory-100 font-sans antialiased selection:bg-gold-500 selection:text-navy-950 min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
