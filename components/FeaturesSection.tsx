"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import FeatureCard from "@/components/ui/FeatureCard";
import Glassmorphism from "@/components/ui/Glassmorphism";
import { features } from "@/data/features";

export default function FeaturesSection() {
  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="SOLUNAHの特徴" />

        <div className="relative group">
          {/* すりガラス背景エフェクト */}
          <Glassmorphism hoverEffect={true} />
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

