"use client";

import SunCard from "@/components/ui/SunCard";
import SectionTitle from "@/components/ui/SectionTitle";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Glassmorphism from "@/components/ui/Glassmorphism";
import Link from "next/link";
import { HeartHandshake, Home } from "lucide-react";

const businessServices = [
  {
    title: "YOUR NURSE（保険外看護）",
    description: "保険適用外の看護サービスを提供します。柔軟なケアプランで、あなたのニーズに合わせた看護サポートを実現します。",
    icon: HeartHandshake,
    href: "/your-nurse",
  },
  {
    title: "保険内介護",
    description: "保険適用内の介護サービスを提供します。安心してご利用いただける、質の高い介護ケアを提供いたします。",
    icon: Home,
    href: "/insurance-nursing",
  },
];

function AnimatedCard({ service, index, isEven }: { service: typeof businessServices[0]; index: number; isEven: boolean }) {
  const IconComponent = service.icon;

  return (
    <div className="relative group">
      {/* すりガラス背景エフェクト - 静的（アニメさせない、アニメラッパーの外） */}
      <Glassmorphism hoverEffect={true} />
      
      {/* アニメーション用のラッパー（opacityのみ） */}
      <div
        className="relative"
        style={{
          animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
        }}
      >
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-stretch gap-12 p-6 md:p-8 relative z-10`}>
          {/* テキスト部分 */}
          <div className="flex-1 w-full flex">
            <Link href={service.href} className="flex-1 w-full">
              <SunCard className="p-8 md:p-10 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col h-full cursor-pointer bg-transparent">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-light mb-4 text-slate-900 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg flex-grow font-light">
                  {service.description}
                </p>
              </SunCard>
            </Link>
          </div>

          {/* 画像部分 */}
          <div className="flex-1 w-full flex">
            <Link href={service.href} className="flex-1 w-full">
              <ImagePlaceholder 
                icon={IconComponent} 
                className="shadow-xl group-hover:shadow-2xl transition-all duration-300 flex-1 cursor-pointer" 
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="主要サービス" />

        <div className="space-y-24">
          {businessServices.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <AnimatedCard
                key={index}
                service={service}
                index={index}
                isEven={isEven}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

