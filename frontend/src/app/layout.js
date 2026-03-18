import "./globals.css";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Astroxadv | Legal Excellence & Advocacy",
  description:
    "Astroxadv is a premier law firm delivering trusted legal counsel across corporate, civil, criminal, and family law. Experience excellence in advocacy.",
  keywords: "law firm, legal services, advocates, Astroxadv, attorneys, legal counsel",
};

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
