interface SectionDividerProps {
  variant?: "default" | "gradient" | "dots" | "wave";
  className?: string;
}

export default function SectionDivider({ variant = "default", className = "" }: SectionDividerProps) {
  if (variant === "gradient") {
    return (
      <div className={`relative py-16 ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/50"></div>
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`py-16 flex justify-center ${className}`}>
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-slate-300"
              style={{
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative py-8 overflow-hidden ${className}`}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            className="opacity-30"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#fb923c" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative py-12 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-4">
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

