"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import YourNurseLogoWithText from "@/components/ui/YourNurseLogoWithText";
import Glassmorphism from "@/components/ui/Glassmorphism";
import { fadeInUpStyle } from "@/utils/animations";

/**
 * YOUR NURSEの特徴をロゴと共に表示するセクション
 * サービス内容セクションの上に配置される
 */
export default function YourNurseFeaturesSection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionTitle title="YOUR NURSEの特徴" />

        <div className="mt-16 mb-8">
          <div className="relative max-w-4xl mx-auto min-w-[280px] px-4">
            <div className="relative">
              {/* Glassmorphismコンテナ - TOPと同じ構造 */}
              <div className="relative px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
                <Glassmorphism blur="2xl" opacity={60} hoverOpacity={70} hoverEffect={true} />
                
                {/* SVGコンテンツ */}
                <div className="relative z-10">
                  <YourNurseLogoWithText
                    imageWidth={1200}
                    imageHeight={1200}
                    className="drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* メッセージテキスト */}
        <div
          className="text-center mt-12 relative z-10"
          style={fadeInUpStyle(0.2, 0.8)}
        >
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
            いつでも、どこでも、あなたの健康をサポートします
          </p>
        </div>
      </div>
    </section>
  );
}

