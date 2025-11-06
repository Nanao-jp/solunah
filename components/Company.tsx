"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import InfoCard from "@/components/ui/InfoCard";

export default function Company() {
  const companyInfo = [
    { label: "会社名", value: "株式会社SOLUNA" },
    { label: "事業内容", value: "保険外看護サービス「YOURNURSE」" },
    { label: "理念", value: "新しい看護の形を、あなたに" },
  ];

  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="会社情報" />

        <div className="space-y-8">
          <InfoCard delay={0} className="p-10 md:p-12">
            <h3 className="text-xl md:text-2xl font-light mb-6 text-slate-900 tracking-wide">企業理念</h3>
            <div className="space-y-4">
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                株式会社SOLUNAは、静かで温かい看護サービスを提供しています。
                静かに寄り添い、明るく温かく、お客様の健康をサポートします。
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                保険外看護サービス「YOURNURSE」を通じて、従来の医療保険の枠を超えた柔軟なケアを提供し、
                より多くの方々に質の高い看護サービスをお届けします。
              </p>
            </div>
          </InfoCard>

          <InfoCard delay={0.2} className="p-10 md:p-12">
            <h3 className="text-xl md:text-2xl font-light mb-8 text-slate-900 tracking-wide">会社概要</h3>
            <dl className="space-y-4">
              {companyInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center border-b border-slate-300/50 pb-4 hover:border-orange-500/30 transition-colors duration-200"
                >
                  <dt className="text-slate-600 font-light sm:w-32 mb-2 sm:mb-0">
                    {info.label}
                  </dt>
                  <dd className="text-slate-900 font-light sm:flex-1">
                    {info.value}
                  </dd>
                </div>
              ))}
            </dl>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

