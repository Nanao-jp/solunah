"use client";

import { ReactNode } from "react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Glassmorphism from "@/components/ui/Glassmorphism";

interface YourNurseHeroSectionProps {
  title: string;
  description?: string | ReactNode;
}

export default function YourNurseHeroSection({ title, description }: YourNurseHeroSectionProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="relative">
          <div className="relative px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <Glassmorphism blur="2xl" opacity={60} hoverOpacity={70} hoverEffect={true} />
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-wide">
                {title}
              </h1>
              {description && (
                <div className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                  {typeof description === 'string' ? (
                    description.split('\n').map((line, index) => (
                      <p key={index} className={index > 0 ? "mt-4" : ""}>
                        {line}
                      </p>
                    ))
                  ) : (
                    description
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

