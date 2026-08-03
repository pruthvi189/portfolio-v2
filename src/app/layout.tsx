import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-dev-site.vercel.app";

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
    url: siteUrl,
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
  metadataBase: new URL(siteUrl),
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
