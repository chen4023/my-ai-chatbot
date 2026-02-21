import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mulmaru = localFont({
  src: "../public/Mulmaru.ttf",
  variable: "--font-mulmaru",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Studio",
  description: "나만의 맞춤형 AI 챗봇을 만들어보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${mulmaru.variable} font-mulmaru antialiased`}>
        {children}
      </body>
    </html>
  );
}
