"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import InteractiveYourNurseLogoSimple from "@/components/ui/InteractiveYourNurseLogoSimple";

/**
 * YOUR NURSEの特徴セクション
 * ページャーで複数の特徴を表示
 */
export default function InteractiveYourNurseSection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="YOUR NURSEの特徴" />
        
        <div className="mt-16">
          <InteractiveYourNurseLogoSimple />
        </div>
      </div>
    </section>
  );
}

