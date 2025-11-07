import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ui/ParticleBackground";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "株式会社SOLUNAH | 保険外看護サービス YOURNURSE",
  description: "株式会社SOLUNAHは、保険外看護サービス「YOURNURSE」を提供しています。柔軟で質の高い看護サービスで、お客様の健康をサポートします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} antialiased`}
      >
        {/* 固定ラッパー - backdrop共有用 */}
        <div className="fixed inset-0 z-0">
          <ParticleBackground />
        </div>
        {/* アプリ本体 */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
