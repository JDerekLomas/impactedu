import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Impact-Edu.ai — AI for Every Learner",
    template: "%s | Impact-Edu.ai",
  },
  description:
    "Impact-Edu.ai advances equitable access to AI-powered learning through open research, open-source tools, and practitioner training.",
  openGraph: {
    title: "Impact-Edu.ai — AI for Every Learner",
    description:
      "Open research, open tools, and practitioner training for AI in education.",
    url: "https://impact-edu.ai",
    siteName: "Impact-Edu.ai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
