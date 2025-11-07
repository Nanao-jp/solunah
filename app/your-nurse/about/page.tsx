"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import Glassmorphism from "@/components/ui/Glassmorphism";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function YourNurseAboutPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="relative">
            <div className="relative px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
              <Glassmorphism blur="2xl" opacity={60} hoverOpacity={70} hoverEffect={true} />
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-wide">
                  YOUR NURSEについて
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div
              className="relative"
              style={{
                animation: `fadeInUp 0.8s ease-out both`,
              }}
            >
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/30 via-orange-500/20 to-transparent"></div>
              <div className="pl-12">
                <h2 className="text-3xl md:text-4xl font-light mb-8 text-slate-900 tracking-tight">
                  新しい看護の形を、あなたに
                </h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                    YOURNURSEは、保険外看護サービスとして、従来の医療保険の枠を超えた柔軟な看護ケアを提供します。
                    訪問看護、在宅ケア、健康相談など、お客様のニーズに合わせた多様なサービスをご用意しています。
                  </p>
                  <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                    静かに寄り添い、温かく明るく、あなたの健康をサポートします。
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative mt-16"
              style={{
                animation: `fadeInUp 0.8s ease-out 0.2s both`,
              }}
            >
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-light mb-6 text-slate-900">
                  私たちの想い
                </h3>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                  医療保険の制約にとらわれず、お客様一人ひとりの状況やご希望に合わせた、
                  より柔軟で質の高い看護サービスを提供したい。それがYOURNURSEの想いです。
                  専門的な看護技術と、温かく明るい心で、いつでもあなたの健康をサポートします。
                </p>
              </div>
            </div>

            <div
              className="relative mt-16 text-center"
              style={{
                animation: `fadeInUp 0.8s ease-out 0.4s both`,
              }}
            >
              <Image
                src="/your-nurse-logo2.png"
                alt="YOUR NURSE Logo"
                width={600}
                height={300}
                className="object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

