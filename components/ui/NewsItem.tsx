"use client";

import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { NewsItem } from "@/types/news";
import { fadeInUpStyle, getDelayByIndex } from "@/utils/animations";

interface NewsItemProps {
  news: NewsItem;
  index: number;
  href?: string;
}

export default function NewsItemComponent({ news, index, href = "/news" }: NewsItemProps) {
  return (
    <Link
      href={href}
      className="block group border-b border-slate-200 last:border-b-0 py-8 hover:bg-slate-50/50 transition-all duration-300"
      style={fadeInUpStyle(getDelayByIndex(index, 0.15), 0.6)}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 bg-orange-500/10 text-orange-600 text-xs font-medium rounded">
              {news.category}
            </span>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              {news.date}
            </div>
          </div>
          <h3 className="text-base md:text-lg font-light mb-2 text-slate-900 group-hover:text-orange-600 transition-colors tracking-wide">
            {news.title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
            {news.description}
          </p>
        </div>
        <div className="flex items-center text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity md:ml-8">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}

