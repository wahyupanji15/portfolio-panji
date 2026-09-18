import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Wahyu Panji Sugiantoro — Profile",
  description:
    "Bilateral Trade Officer, Ministry of Industry, Republic of Indonesia — profile, CV, and policy paper publications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} font-sans bg-paper text-ink antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <footer className="max-w-3xl mx-auto px-6 py-16 text-sm text-ink-soft border-t border-line mt-24">
          © {new Date().getFullYear()} Wahyu Panji Sugiantoro.
        </footer>
      </body>
    </html>
  );
}
