"use client";

import { Building2, Target } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function Company() {
  const companyInfo = [
    { label: "会社名", value: "株式会社SOLUNA" },
    { label: "事業内容", value: "保険外看護サービス「YOURNURSE」" },
    { label: "理念", value: "新しい看護の形を、あなたに" },
  ];

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="会社情報" />

        {/* 企業理念 */}
        <div
          className="mb-32"
          style={{
            animation: `fadeInUp 0.6s ease-out both`,
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-light mb-8 text-slate-900 tracking-wide">企業理念</h3>
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  株式会社SOLUNAは、静かで温かい看護サービスを提供しています。
                  静かに寄り添い、明るく温かく、お客様の健康をサポートします。
                </p>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                  保険外看護サービス「YOURNURSE」を通じて、従来の医療保険の枠を超えた柔軟なケアを提供し、
                  より多くの方々に質の高い看護サービスをお届けします。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 会社概要 - グリッドレイアウト */}
        <div
          style={{
            animation: `fadeInUp 0.6s ease-out 0.2s both`,
          }}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">会社概要</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <ImagePlaceholder icon={Building2} />
            </div>
            <div className="md:col-span-1">
              <div className="space-y-4 h-full flex flex-col justify-center">
                {companyInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 py-4 border-b border-slate-200 last:border-b-0"
                  >
                    <dt className="text-sm md:text-base text-slate-500 font-light tracking-wide">
                      {info.label}
                    </dt>
                    <dd className="text-base md:text-lg text-slate-900 font-light">
                      {info.value}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

