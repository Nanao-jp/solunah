"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import InfoCard from "@/components/ui/InfoCard";
import FeatureCard from "@/components/ui/FeatureCard";
import { features } from "@/data/features";

export default function About() {

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="事業紹介" />

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
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

