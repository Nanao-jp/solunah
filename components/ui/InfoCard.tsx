import { ReactNode } from "react";

interface InfoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function InfoCard({ children, className = "", delay = 0 }: InfoCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl border-2 border-orange-200 hover:shadow-orange-500/20 hover:shadow-2xl hover:border-orange-400 hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

