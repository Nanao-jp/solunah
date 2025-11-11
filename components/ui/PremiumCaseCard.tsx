"use client";

import { memo, useCallback } from "react";
import { LucideIcon } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { fadeInUpStyle, getDelayByIndex } from "@/utils/animations";

interface PremiumCaseCardProps {
  icon: LucideIcon;
  title: string;
  index: number;
  onClick: () => void;
}

function PremiumCaseCard({ icon: IconComponent, title, index, onClick }: PremiumCaseCardProps) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <div
      className="relative cursor-pointer"
      onClick={handleClick}
      style={fadeInUpStyle(getDelayByIndex(index, 0.1), 0.8)}
    >
      {/* アルバムページ風の背景 */}
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50/80 p-8 md:p-10 rounded-3xl">
        {/* 写真フレーム部分 - より立体的に */}
        <div className="relative">
          {/* 外側の影とフレーム */}
          <div className="relative bg-white p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]">
            {/* 内側のマット */}
            <div className="relative bg-slate-50 p-2 md:p-3">
              {/* 写真部分 */}
              <div className="relative w-full">
                <ImagePlaceholder icon={IconComponent} className="rounded-none" />
              </div>
            </div>
          </div>
          
          {/* 装飾的なコーナー */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-orange-300/50"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-orange-300/50"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-orange-300/50"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-orange-300/50"></div>
        </div>

        {/* キャプション部分 - より洗練されたデザイン */}
        <div className="mt-6 md:mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-orange-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
              <IconComponent className="w-4 h-4 text-orange-500" />
            </div>
            <h3 className="text-base md:text-lg font-light text-slate-800 tracking-wide">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PremiumCaseCard);

