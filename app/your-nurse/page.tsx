"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import Glassmorphism from "@/components/ui/Glassmorphism";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import InteractiveYourNurseSection from "@/components/InteractiveYourNurseSection";
import { ArrowRight } from "lucide-react";

export default function YourNursePage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="relative">
            {/* Glassmorphismコンテナ */}
            <div className="relative px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
              <Glassmorphism blur="2xl" opacity={60} hoverOpacity={70} hoverEffect={true} />
              
              {/* コンテンツ */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="mb-8 md:mb-12">
                  <Image
                    src="/your-nurse-logo2.png"
                    alt="YOUR NURSE Logo"
                    width={600}
                    height={300}
                    className="object-contain mx-auto drop-shadow-2xl"
                    priority
                  />
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-wide">
                  保険外看護サービス
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* インタラクティブ体験セクション */}
      <InteractiveYourNurseSection />

      {/* クイックリンクセクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="詳しく知る" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <Link
              href="/your-nurse/services"
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="text-2xl font-light mb-4 text-slate-900 group-hover:text-orange-600 transition-colors">
                サービス
              </h3>
              <p className="text-slate-600 font-light mb-4">
                訪問看護、健康相談、在宅ケアなど、充実したサービスをご用意しています。
              </p>
              <div className="flex items-center text-orange-500 font-medium">
                詳しく見る
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/your-nurse/features"
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="text-2xl font-light mb-4 text-slate-900 group-hover:text-orange-600 transition-colors">
                特徴
              </h3>
              <p className="text-slate-600 font-light mb-4">
                YOUR NURSEが選ばれる理由。24時間サポート、温かいケア、柔軟なサービス。
              </p>
              <div className="flex items-center text-orange-500 font-medium">
                詳しく見る
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/your-nurse/pricing"
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="text-2xl font-light mb-4 text-slate-900 group-hover:text-orange-600 transition-colors">
                料金
              </h3>
              <p className="text-slate-600 font-light mb-4">
                お客様のニーズに合わせた柔軟な料金プランをご用意しています。
              </p>
              <div className="flex items-center text-orange-500 font-medium">
                詳しく見る
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/your-nurse/contact"
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="text-2xl font-light mb-4 text-slate-900 group-hover:text-orange-600 transition-colors">
                お問い合わせ
              </h3>
              <p className="text-slate-600 font-light mb-4">
                ご質問やご相談がございましたら、お気軽にお問い合わせください。
              </p>
              <div className="flex items-center text-orange-500 font-medium">
                お問い合わせ
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

