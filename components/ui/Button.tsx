import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({ 
  children, 
  href, 
  variant = "secondary", 
  className = "",
  showArrow = true,
  type,
  onClick
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105";
  
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
  };

  const buttonContent = (
    <>
      {children}
      {showArrow && <ArrowRight className="w-5 h-5" />}
    </>
  );

  if (type || onClick) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {buttonContent}
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {buttonContent}
      </Link>
    );
  }

  return null;
}

