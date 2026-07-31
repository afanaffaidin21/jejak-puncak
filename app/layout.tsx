import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { BottomNavigation } from "@/components/common/bottom-navigation";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jejak Puncak",
  description:
    "Temukan, bandingkan, dan catat perjalanan mendaki gunung di Indonesia.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#19231e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a
          className="fixed top-sm left-sm z-overlay -translate-y-3xl rounded-md bg-primary px-sm py-xs text-label font-semibold text-primary-foreground shadow-floating transition-transform duration-fast ease-standard focus:translate-y-0"
          href="#main-content"
        >
          Lewati ke konten utama
        </a>
        <div className="flex min-h-screen flex-col pb-mobile-nav lg:pb-0">
          <Header />
          <main className="flex-1" id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
        <BottomNavigation />
      </body>
    </html>
  );
}
