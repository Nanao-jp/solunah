"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import NewsItemComponent from "@/components/ui/NewsItem";
import { allNewsItems } from "@/data/news";

export default function News() {
  const newsItems = allNewsItems;

  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="お知らせ" />

        <div className="space-y-0">
          {newsItems.map((news, index) => (
            <NewsItemComponent key={index} news={news} index={index} href="#" />
          ))}
        </div>
      </div>
    </section>
  );
}

