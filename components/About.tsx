"use client";

import { Clock, Heart, Stethoscope } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import SunCard from "@/components/ui/SunCard";
import InfoCard from "@/components/ui/InfoCard";

export default function About() {
  const features = [
    {
      icon: Clock,
      title: "24時間サポート",
      description: "夜間も24時間体制で、いつでも寄り添う看護サービス",
    },
    {
      icon: Heart,
      title: "温かいケア",
      description: "明るく温かい看護で、あなたの健康を支えます",
    },
    {
      icon: Stethoscope,
      title: "YOURNURSE",
      description: "保険外看護サービスで、より柔軟なケアを提供",
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="事業紹介" />

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <SunCard key={index} delay={index * 0.2} className="p-8 md:p-10 group">
                <div className="mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-600/30 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-light mb-4 text-slate-900 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  {feature.description}
                </p>
              </SunCard>
            );
          })}
        </div>

        <InfoCard delay={0.6} className="p-10 md:p-14">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light mb-6 text-slate-900 tracking-wide">
              YOURNURSEについて
            </h3>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
              YOURNURSEは、保険外看護サービスとして、従来の医療保険の枠を超えた柔軟な看護ケアを提供します。
              訪問看護、在宅ケア、健康相談など、お客様のニーズに合わせた多様なサービスをご用意しています。
              静かに寄り添い、温かく明るく、あなたの健康をサポートします。
            </p>
          </div>
        </InfoCard>
      </div>
    </section>
  );
}

