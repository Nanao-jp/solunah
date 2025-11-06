"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import FeatureCard from "@/components/ui/FeatureCard";
import { features } from "@/data/features";

export default function FeaturesSection() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="SOLUNAの特徴" />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button href="/about" variant="secondary">
            事業紹介をもっと見る
          </Button>
        </div>
      </div>
    </section>
  );
}

