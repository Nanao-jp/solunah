import { LucideIcon } from "lucide-react";

interface ImagePlaceholderProps {
  icon: LucideIcon;
  className?: string;
}

export default function ImagePlaceholder({ icon: IconComponent, className = "" }: ImagePlaceholderProps) {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100 ${className}`} style={{ aspectRatio: '4/3' }}>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `
          linear-gradient(45deg, #cbd5e1 25%, transparent 25%),
          linear-gradient(-45deg, #cbd5e1 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #cbd5e1 75%),
          linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      }}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center border-2 border-dashed border-slate-300">
          <IconComponent className="w-12 h-12 text-slate-400" />
        </div>
      </div>
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-slate-300"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-slate-300"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-slate-300"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-slate-300"></div>
    </div>
  );
}

