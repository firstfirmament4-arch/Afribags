import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import SiteChrome from "@/components/SiteChrome";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "AFRIBAGS by D'Avafrik",
  description: "Sacs, bandoulières et huiles traditionnelles made in Cameroun.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${fraunces.variable} ${inter.variable} font-body bg-cream text-ink`}>
        <LanguageProvider>
          <CartProvider>
            <SiteChrome>{children}</SiteChrome>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
