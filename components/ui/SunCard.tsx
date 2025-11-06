import { ReactNode, CSSProperties } from "react";

interface SunCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string;
  style?: CSSProperties;
}

export default function SunCard({ children, className = "", delay = 0, glowColor, style }: SunCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-2xl border-2 border-orange-200 overflow-hidden hover:shadow-orange-500/20 hover:shadow-2xl hover:border-orange-400 hover:-translate-y-1 transition-all duration-300 ${className}`}
      style={style}
    >
      {glowColor && (
        <div
          className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${glowColor} opacity-20 rounded-full blur-3xl transition-opacity duration-200`}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

