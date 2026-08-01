import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pruthvi Shah — ML Engineer",
  description:
    "ML Engineer building AI applications with deep learning, NLP, and full-stack development.",
  openGraph: {
    title: "Pruthvi Shah — ML Engineer",
    description:
      "ML Engineer building AI applications with deep learning, NLP, and full-stack development.",
    url: "https://portfolio-dev-site.vercel.app",
    siteName: "Pruthvi Shah",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pruthvi Shah — ML Engineer",
    description:
      "ML Engineer building AI applications with deep learning, NLP, and full-stack development.",
  },
  metadataBase: new URL("https://portfolio-dev-site.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
