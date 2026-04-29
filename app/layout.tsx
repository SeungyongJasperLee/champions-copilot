import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Champions Copilot",
  description: "포켓몬 챔피언스 AI 파티 빌더",
  keywords: ["포켓몬", "챔피언스", "파티 빌더", "VGC", "Pokemon Champions", "AI", "팀빌더"],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Champions Copilot",
    description: "포켓몬 챔피언스 AI 파티 빌더",
    url: "https://champions-copilot.vercel.app",
    siteName: "Champions Copilot",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Champions Copilot",
    description: "포켓몬 챔피언스 AI 파티 빌더",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
