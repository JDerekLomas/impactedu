import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://impact-edu.ai"),
  title: {
    default: "Impact-Edu.ai — Research & Tools for AI in Education",
    template: "%s | Impact-Edu.ai",
  },
  description:
    "Impact-Edu.ai conducts and funds research on AI's impact in education, and builds open tools for that research. A program of Wisdom Frontiers.",
  openGraph: {
    title: "Impact-Edu.ai — Research & Tools for AI in Education",
    description:
      "Open research, open tools, and practitioner training for equitable AI in education.",
    url: "https://impact-edu.ai",
    siteName: "Impact-Edu.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact-Edu.ai — Research & Tools for AI in Education",
    description:
      "Open research, open tools, and practitioner training for equitable AI in education.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
