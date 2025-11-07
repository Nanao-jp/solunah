"use client";

import { LucideIcon } from "lucide-react";
import Glassmorphism from "./Glassmorphism";

interface PricingCardProps {
  icon: LucideIcon;
  title: string;
  period: string;
  price: string;
  unit: string;
}

export default function PricingCard({
  icon: Icon,
  title,
  period,
  price,
  unit,
}: PricingCardProps) {
  return (
    <div className="relative">
      <div className="relative px-8 py-12 h-full rounded-2xl overflow-hidden">
        <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
        
        <div className="relative z-10 flex flex-col h-full items-center text-center">
          <div className="mb-6">
            <Icon className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
            <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-2 tracking-wide">
              {title}
            </h3>
            <p className="text-slate-600 font-light text-sm mb-4">
              {period}
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-4xl md:text-5xl font-light text-slate-900">
                {price}
              </span>
              <span className="text-lg text-slate-600 font-light">
                {unit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

