"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { Clock, Heart, Stethoscope } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24時間サポート",
    description: "夜間も24時間体制で、いつでも寄り添う看護サービス。緊急時にも安心です。",
  },
  {
    icon: Heart,
    title: "温かいケア",
    description: "明るく温かい看護で、あなたの健康を支えます。心のケアも大切にしています。",
  },
  {
    icon: Stethoscope,
    title: "柔軟なサービス",
    description: "保険外看護サービスで、より柔軟なケアを提供。お客様のニーズに合わせます。",
  },
];

export default function YourNurseFeaturesPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-wide">
            YOUR NURSEの特徴
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
            選ばれる理由があります
          </p>
        </div>
      </section>

      {/* 特徴詳細セクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="主な特徴" />
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <div
                  key={index}
                  className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-slate-900 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

