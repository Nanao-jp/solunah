"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import NewsItemComponent from "@/components/ui/NewsItem";
import { allNewsItems } from "@/data/news";

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
              <NewsItemComponent key={index} news={news} index={index} />
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

