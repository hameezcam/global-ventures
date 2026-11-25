import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import "@/styles/nocturne.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MobileBar } from "@/components/nocturne/client";
import { SITE_URL } from "@/lib/site";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

/*
 * Marks the page as script-enabled before first paint so entrance animations
 * can start hidden. If the page never signals it is ready (for example a
 * script error), the class is removed so content can never stay invisible.
 */
const MOTION_BOOTSTRAP = `(function(d){d.classList.add("js");setTimeout(function(){if(!d.classList.contains("gv-ready")){d.classList.remove("js")}},4000)})(document.documentElement);`;

const DESCRIPTION =
  "Independent advice for owners, boards and investors on selling, acquiring, valuing and financing private companies.";

export const metadata: Metadata = {
  title: {
    template: "%s | Global Venture",
    default: "Global Venture | Financial Advisory & Business Transactions",
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "Financial advisory UAE",
    "Mergers and acquisitions Dubai",
    "Business valuation",
    "Business restructuring UAE",
    "Fund raising and working capital",
    "Sell a business UAE",
    "Joint ventures",
    "Investor matchmaking",
    "Board member development",
    "Financial management",
    "FinTech advisory",
  ],
  openGraph: {
    title: "Global Venture — Where Capital Meets Opportunity",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Global Venture",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06111D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
      </head>
      <body className="gv">
        <a href="#main-content" className="skip">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
