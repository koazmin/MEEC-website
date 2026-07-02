import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const notoMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-mm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEEC — Mahar Euporia Education Centre",
  description:
    "A beacon of educational excellence in Yangon. GED, IGCSE, Secondary and professional diploma pathways that inspire lifelong learners.",
  openGraph: {
    title: "MEEC — Mahar Euporia Education Centre",
    description:
      "GED, IGCSE, Secondary and professional diploma pathways that inspire lifelong learners.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} ${notoMyanmar.variable}`}>
      <body>
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
