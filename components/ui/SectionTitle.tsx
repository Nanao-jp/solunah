interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`text-center mb-20 ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 tracking-wide leading-tight">
        {title}
      </h2>
    </div>
  );
}

