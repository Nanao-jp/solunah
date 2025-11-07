"use client";

import { ReactNode, useState } from "react";

interface GlassmorphismProps {
  children?: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  blur?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  opacity?: number;
  hoverOpacity?: number;
}

export default function Glassmorphism({
  children,
  className = "",
  hoverEffect = true,
  blur = "xl",
  opacity = 40,
  hoverOpacity = 50,
}: GlassmorphismProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
    "2xl": "backdrop-blur-2xl",
    "3xl": "backdrop-blur-3xl",
  };

  const blurSizes = {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    "3xl": "32px",
  };

  const bgOpacity = hoverEffect && isHovered ? hoverOpacity : opacity;

  return (
    <div
      className={`absolute inset-0 -mx-4 md:-mx-6 lg:-mx-8 ${blurClasses[blur]} rounded-3xl border border-white/20 shadow-lg z-0 pointer-events-none ${
        hoverEffect ? "transition-all duration-300" : ""
      } ${className}`}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity / 100})`,
        WebkitBackdropFilter: `blur(${blurSizes[blur]})`,
      } as React.CSSProperties}
      onMouseEnter={() => hoverEffect && setIsHovered(true)}
      onMouseLeave={() => hoverEffect && setIsHovered(false)}
    >
      {children}
    </div>
  );
}

