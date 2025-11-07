"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { allServices } from "@/data/services";
import Image from "next/image";
import Glassmorphism from "@/components/ui/Glassmorphism";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function YourNurseServicesPage() {
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
                  サービスについて
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                  お客様のニーズに合わせた多様なサービスをご用意しています
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR NURSEについてセクション */}
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
          </div>
        </div>
      </section>

      {/* サービス内容セクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="サービス内容" />
          
          <div className="space-y-24">
            {allServices.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-stretch gap-12"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* テキスト部分 */}
                  <div className="flex-1 w-full">
                    <div className="h-full flex flex-col justify-center">
                      <div className="mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-orange-500" />
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-light mb-4 text-slate-900 tracking-wide">
                        {service.title}
                      </h3>
                      <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* 画像部分 */}
                  <div className="flex-1 w-full">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-50 to-amber-50" style={{ aspectRatio: '4/3' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center border-2 border-orange-200">
                          <IconComponent className="w-12 h-12 text-orange-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

