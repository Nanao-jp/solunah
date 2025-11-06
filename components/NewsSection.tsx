"use client";

import { Calendar, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Link from "next/link";

// 全ニュースアイテム（ニュースページから取得する想定）
const allNewsItems = [
  {
    date: "2025年11月1日",
    category: "お知らせ",
    title: "YOURNURSE新サービス開始のお知らせ",
    description: "保険外看護サービス「YOURNURSE」の新サービスを開始いたしました。",
  },
  {
    date: "2025年10月15日",
    category: "お知らせ",
    title: "サービスエリア拡大のお知らせ",
    description: "サービス提供エリアを拡大し、より多くの地域の方々にご利用いただけるようになりました。",
  },
  {
    date: "2025年9月20日",
    category: "お知らせ",
    title: "健康相談サービスの拡充について",
    description: "看護師による健康相談サービスを拡充し、より多くの方々に質の高いアドバイスを提供できるようになりました。",
  },
  {
    date: "2025年8月10日",
    category: "お知らせ",
    title: "株式会社SOLUNA設立のお知らせ",
    description: "この度、保険外看護サービス「YOURNURSE」を提供する株式会社SOLUNAを設立いたしました。",
  },
];

// TOPページでは最大3件まで表示
const MAX_NEWS_ITEMS = 3;

export default function NewsSection() {
  const newsItems = allNewsItems.slice(0, MAX_NEWS_ITEMS);

  return (
    <section className="py-32">
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <SectionTitle title="お知らせ" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {newsItems.map((news, index) => (
              <Link
                key={index}
                href="/news"
                className="block group border-b border-slate-200 last:border-b-0 py-8 hover:bg-slate-50/50 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                }}
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
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/news" variant="secondary">
              すべてのお知らせを見る
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

