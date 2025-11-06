"use client";

import { Home as HomeIcon, MessageCircle } from "lucide-react";
import SunCard from "@/components/ui/SunCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const mainServices = [
  {
    title: "訪問看護",
    description: "ご自宅での看護ケアを提供します。専門的な看護技術と温かい心でサポートします。",
    icon: HomeIcon,
  },
  {
    title: "健康相談",
    description: "看護師による健康相談サービス。日々の健康管理から専門的なアドバイスまで。",
    icon: MessageCircle,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="主要サービス" />

        <div className="space-y-24">
          {mainServices.map((service, index) => {
            const IconComponent = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-stretch gap-12 group`}
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* テキスト部分 */}
                <div className="flex-1 w-full flex">
                  <SunCard className="p-8 md:p-10 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col">
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
                </div>

                {/* 画像部分 */}
                <div className="flex-1 w-full flex">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 bg-slate-100 flex-1" style={{ aspectRatio: '4/3' }}>
                    {/* グリッドパターン */}
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: `
                        linear-gradient(45deg, #cbd5e1 25%, transparent 25%),
                        linear-gradient(-45deg, #cbd5e1 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #cbd5e1 75%),
                        linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)
                      `,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}></div>
                    
                    {/* 中央のアイコン */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                        <IconComponent className="w-12 h-12 text-slate-400" />
                      </div>
                    </div>
                    
                    {/* 角の装飾 */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-slate-300"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-slate-300"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-slate-300"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-slate-300"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button href="/services" variant="secondary">
            サービス一覧を見る
          </Button>
        </div>
      </div>
    </section>
  );
}

