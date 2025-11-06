"use client";

import { LucideIcon } from "lucide-react";
import SunCard from "@/components/ui/SunCard";
import { Feature } from "@/data/features";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const IconComponent = feature.icon;
  
  return (
    <SunCard 
      className="p-8 md:p-10 group hover:scale-105 transition-all duration-300"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="mb-6">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-600/30 group-hover:scale-110 transition-all duration-300">
          <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-orange-500" />
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-light mb-4 text-slate-900 tracking-wide">
        {feature.title}
      </h3>
      <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
        {feature.description}
      </p>
    </SunCard>
  );
}

