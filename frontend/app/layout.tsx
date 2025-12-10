import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indus Public School, Rohtak | Shaping Excellence Since 2003",
  description: "A top 1% private school in India with strong academic and infrastructure credibility. Apply for Admission 2025-26.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          playfair.variable,
          "antialiased min-h-screen flex flex-col"
        )}
      >
        {children}
      </body>
    </html>
  );
}
