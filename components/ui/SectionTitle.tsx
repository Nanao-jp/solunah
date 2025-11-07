interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`text-center mb-20 ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 tracking-wide leading-tight mb-6">
        {title}
      </h2>
      {/* モダンなライン */}
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-400 to-orange-500"></div>
        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
        <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-orange-500 via-orange-400 to-transparent"></div>
      </div>
    </div>
  );
}

