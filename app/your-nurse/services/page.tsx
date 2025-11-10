"use client";

import SectionDivider from "@/components/ui/SectionDivider";
import YourNurseHeroSection from "@/components/ui/YourNurseHeroSection";
import { Heart, MapPin, ImageIcon, UtensilsCrossed, Calendar, Plane, Users } from "lucide-react";
import CaseCard from "@/components/ui/CaseCard";

export default function YourNurseServicesPage() {
  return (
    <>
      <YourNurseHeroSection
        title="私たちの想い"
        description="「スペシャルタイムをよりスペシャルに」をコンセプトに、看護が必要な利用者様とフリーランスの看護師とを繋げる保険外看護サービスです。"
      />

      {/* セクション1: ナースをより身近に - フルワイド背景画像レイアウト */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* 背景画像プレースホルダー */}
        <div className="absolute inset-0 w-full h-full bg-slate-100">
          {/* チェック柄パターン */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `
              linear-gradient(45deg, #cbd5e1 25%, transparent 25%),
              linear-gradient(-45deg, #cbd5e1 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #cbd5e1 75%),
              linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
          }}></div>
          {/* プレースホルダーテキスト */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center border-4 border-dashed border-slate-300">
                <ImageIcon className="w-12 h-12 text-slate-400" />
              </div>
              <p className="text-slate-500 font-light text-lg md:text-xl">ここに画像が入る予定</p>
            </div>
          </div>
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/80"></div>
        </div>

        {/* コンテンツ */}
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div
            className="flex flex-col items-center text-center space-y-12"
            style={{
              animation: `fadeInUp 0.6s ease-out 0s both`,
            }}
          >
            {/* アイコン */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500/30 flex items-center justify-center shadow-lg backdrop-blur-sm bg-white/50">
              <Heart className="w-12 h-12 text-orange-500" />
            </div>

            {/* タイトル */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-wide">
              ナースをより身近に
            </h2>

            {/* テキスト */}
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light max-w-3xl">
              どのようなシーンでも喜びや不安を一緒に分かち合い、ご利用者様の家族の一員のような存在を目指し、常に寄り添った看護を提供いたします。
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* セクション2: 諦めていたことを諦めない世界 - 中央ブロックとバッジグリッドレイアウト */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div
            className="flex flex-col items-center space-y-16"
            style={{
              animation: `fadeInUp 0.6s ease-out 0.1s both`,
            }}
          >
            {/* 上部: タイトルと説明 */}
            <div className="text-center space-y-6 max-w-4xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-wide">
                諦めていたことを諦めない世界
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                私たちは出来ないと諦めていたことを叶えるお手伝いをしています。
              </p>
            </div>

            {/* 下部: 事例カードグリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl">
              <CaseCard icon={UtensilsCrossed} title="お食事会" index={0} />
              <CaseCard icon={Calendar} title="冠婚葬祭" index={1} />
              <CaseCard icon={Plane} title="家族旅行" index={2} />
              <CaseCard icon={Users} title="家族行事" index={3} />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* セクション3: ご利用者様とお外に - 左右非対称レイアウト */}
      <section className="relative min-h-[80vh] flex items-center py-32 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="w-full mx-auto">
          <div
            className="grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center"
            style={{
              animation: `fadeInUp 0.6s ease-out 0.2s both`,
            }}
          >
            {/* 左側: 画像エリア（6カラム） */}
            <div className="md:col-span-6 order-2 md:order-1">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-amber-100" style={{ aspectRatio: '4/3' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center border-4 border-orange-200">
                    <MapPin className="w-16 h-16 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* 右側: テキスト部分（6カラム） */}
            <div className="md:col-span-6 order-1 md:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-wide leading-tight">
                ご利用者様とお外に
              </h2>
              
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                  いつもと違う風景を見に、外に出てみませんか？
                </p>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                  看護師が付き添うことで安心して外出できるようサポートします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}




