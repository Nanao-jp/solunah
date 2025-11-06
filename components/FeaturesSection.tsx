"use client";

import { Clock, Heart, Stethoscope } from "lucide-react";
import SunCard from "@/components/ui/SunCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

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

export default function FeaturesSection() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="SOLUNAの特徴" />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <SunCard 
                key={index} 
                className="p-8 md:p-10 group hover:scale-105 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-600/30 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-orange-500" />
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

        <div className="text-center">
          <Button href="/about" variant="secondary">
            事業紹介をもっと見る
          </Button>
        </div>
      </div>
    </section>
  );
}

