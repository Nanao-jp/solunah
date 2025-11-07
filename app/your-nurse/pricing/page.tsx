"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import Glassmorphism from "@/components/ui/Glassmorphism";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "基本プラン",
    description: "短時間からご利用いただける基本プラン",
    price: "1時間",
    priceUnit: "から",
    features: [
      "訪問看護（1時間単位）",
      "健康相談",
      "看護師経験5年以上",
      "24時間365日対応",
    ],
  },
  {
    name: "標準プラン",
    description: "定期的なケアに最適なプラン",
    price: "月額",
    priceUnit: "応相談",
    features: [
      "訪問看護（定期訪問）",
      "在宅ケアサポート",
      "健康相談",
      "看護記録の作成",
      "24時間365日対応",
    ],
  },
  {
    name: "プレミアムプラン",
    description: "包括的なケアを提供するプラン",
    price: "月額",
    priceUnit: "応相談",
    features: [
      "訪問看護（定期・緊急対応）",
      "在宅ケアサポート",
      "健康相談・アドバイス",
      "看護記録の作成",
      "家族へのサポート",
      "24時間365日対応",
      "全国対応",
    ],
  },
];

export default function YourNursePricingPage() {
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
                  料金について
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                  お客様のニーズに合わせた柔軟な料金プランをご用意しています
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="料金プラン" />
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="relative px-8 py-12 h-full">
                  <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-2 tracking-wide">
                        {plan.name}
                      </h3>
                      <p className="text-slate-600 font-light text-sm">
                        {plan.description}
                      </p>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-light text-slate-900">
                          {plan.price}
                        </span>
                        <span className="text-lg text-slate-600 font-light">
                          {plan.priceUnit}
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-orange-500" />
                          </div>
                          <span className="text-slate-600 font-light">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <button className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                        お問い合わせ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注意事項セクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-6 tracking-wide">
              ご注意事項
            </h2>
            <div className="space-y-4 text-slate-600 font-light">
              <p>
                ・料金はサービス内容や時間によって異なります。詳細はお問い合わせください。
              </p>
              <p>
                ・初回相談は無料で承っております。お気軽にお問い合わせください。
              </p>
              <p>
                ・緊急時の対応については、別途料金が発生する場合がございます。
              </p>
              <p>
                ・サービスエリアや時間帯によって、料金が変動する場合がございます。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

