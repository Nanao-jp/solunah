"use client";

import { LucideIcon } from "lucide-react";
import Glassmorphism from "./Glassmorphism";
import { Clock, Calendar, Percent } from "lucide-react";

interface CaseStudyCardProps {
  icon: LucideIcon;
  title: string;
  timeInfo: string;
  price: string;
  breakdown: string[];
  details?: string[];
  timeIcon?: "clock" | "calendar";
}

export default function CaseStudyCard({
  icon: Icon,
  title,
  timeInfo,
  price,
  breakdown,
  details,
  timeIcon = "clock",
}: CaseStudyCardProps) {
  const TimeIcon = timeIcon === "calendar" ? Calendar : Clock;

  return (
    <div className="relative">
      <div className="relative px-8 py-12 rounded-2xl overflow-hidden">
        <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                <Icon className="w-16 h-16 text-slate-400" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-4 tracking-wide">
                {title}
              </h3>
              <div className="space-y-3 text-slate-600 font-light mb-6">
                <div className="flex items-center gap-2">
                  <TimeIcon className="w-5 h-5 text-orange-500" />
                  <span>{timeInfo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-light text-slate-900">料金：{price}</span>
                </div>
                <div className="pl-7 space-y-1 text-sm">
                  {breakdown.map((item, index) => {
                    // Percentアイコンが必要な行をチェック
                    if (item.includes("お値引き") || item.includes("割引")) {
                      return (
                        <p key={index} className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-orange-500" />
                          {item}
                        </p>
                      );
                    }
                    return <p key={index}>{item}</p>;
                  })}
                </div>
                {details && details.length > 0 && (
                  <div className="mt-4 space-y-1 text-sm pl-7">
                    {details.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

