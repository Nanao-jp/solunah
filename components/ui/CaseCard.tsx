"use client";

import { LucideIcon } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

interface CaseCardProps {
  icon: LucideIcon;
  title: string;
  index: number;
}

export default function CaseCard({ icon: IconComponent, title, index }: CaseCardProps) {
  return (
    <div
      className="relative bg-slate-50/50 p-6 md:p-8"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* 写真フレーム部分 */}
      <div className="relative">
        {/* 写真の影とフレーム */}
        <div className="relative bg-white p-3 md:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          {/* 写真部分 */}
          <div className="relative w-full">
            <ImagePlaceholder icon={IconComponent} className="rounded-none" />
          </div>
        </div>
      </div>

      {/* キャプション部分 */}
      <div className="mt-4 md:mt-6 text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
          <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-orange-500/70" />
          <h3 className="text-base md:text-lg font-light text-slate-700 tracking-wide">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

