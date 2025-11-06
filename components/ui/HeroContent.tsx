import { ReactNode } from "react";
import GradientText from "@/components/ui/GradientText";

interface HeroContentProps {
  title: string;
  subtitle: string;
  description: string | ReactNode;
}

export default function HeroContent({ title, subtitle, description }: HeroContentProps) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight leading-tight">
          <GradientText variant="primary" className="drop-shadow-lg">
            {title}
          </GradientText>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-slate-700 mb-6 font-light tracking-wide">
          {subtitle}
        </p>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}

