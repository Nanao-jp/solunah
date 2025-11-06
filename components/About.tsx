"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { features } from "@/data/features";

export default function About() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="事業紹介" />

        {/* 特徴リスト */}
        <div className="space-y-16 mb-32">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="relative group"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                }}
              >
                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-2 border-orange-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500/40 transition-all duration-500">
                        <IconComponent className="w-10 h-10 text-orange-500" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-light mb-4 text-slate-900 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {index < features.length - 1 && (
                  <div className="absolute -bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* YOURNURSEについて */}
        <div
          className="relative"
          style={{
            animation: `fadeInUp 0.8s ease-out 0.6s both`,
          }}
        >
          <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/30 via-orange-500/20 to-transparent"></div>
          <div className="pl-12">
            <h3 className="text-4xl md:text-5xl font-light mb-12 text-slate-900 tracking-tight">
              YOURNURSEについて
            </h3>
            <div className="space-y-6 max-w-3xl">
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
      </div>
    </section>
  );
}

