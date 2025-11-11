"use client";

import { ReactNode } from "react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Glassmorphism from "@/components/ui/Glassmorphism";

interface SolunahHeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string | ReactNode;
}

export default function SolunahHeroSection({ 
  title, 
  subtitle,
  description 
}: SolunahHeroSectionProps) {
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
              {subtitle && (
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light mb-6">
                  {subtitle}
                </p>
              )}
              {description && (
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

