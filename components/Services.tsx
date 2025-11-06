"use client";

import { Home, MessageCircle, Users, Clock } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import SunCard from "@/components/ui/SunCard";

export default function Services() {
  const services = [
    {
      title: "訪問看護",
      description: "ご自宅での看護ケアを提供します。専門的な看護技術と温かい心でサポートします。",
      icon: Home,
    },
    {
      title: "健康相談",
      description: "看護師による健康相談サービス。日々の健康管理から専門的なアドバイスまで。",
      icon: MessageCircle,
    },
    {
      title: "在宅ケア",
      description: "日常生活のサポートから医療的なケアまで、包括的な在宅ケアサービスを提供します。",
      icon: Users,
    },
    {
      title: "24時間サポート",
      description: "静かに寄り添い、温かく明るく、24時間いつでもサポートいたします。",
      icon: Clock,
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="サービス内容" />

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <SunCard
                key={index}
                delay={index * 0.1}
                className="p-8 md:p-10 group"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-600/30 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-light mb-4 text-slate-900 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  {service.description}
                </p>
              </SunCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

