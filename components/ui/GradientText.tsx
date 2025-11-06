import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function GradientText({ children, className = "", variant = "primary" }: GradientTextProps) {
  const gradientClasses = {
    primary: "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500",
    secondary: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
  };

  return (
    <span className={`${gradientClasses[variant]} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

