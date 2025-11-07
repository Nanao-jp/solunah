"use client";

import { Mail } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import SunCard from "@/components/ui/SunCard";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import ContactForm from "@/components/ui/ContactForm";

export default function Contact() {
  const handleSubmit = (data: { name: string; email: string; phone?: string; message: string }) => {
    // フォーム送信処理（実際の実装ではAPIに送信）
    alert("お問い合わせありがとうございます。後日ご連絡いたします。");
  };

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="お問い合わせ" />

        <div
          className="flex flex-col md:flex-row items-stretch gap-12 group"
          style={{
            animation: `fadeInUp 0.8s ease-out both`,
          }}
        >
          {/* フォーム部分 */}
          <div className="flex-1 w-full flex">
            <SunCard className="p-8 md:p-10 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col">
              <ContactForm showPhone={false} onSubmit={handleSubmit} />
            </SunCard>
          </div>

          {/* 画像部分 */}
          <div className="flex-1 w-full flex">
            <ImagePlaceholder 
              icon={Mail} 
              className="shadow-xl group-hover:shadow-2xl transition-all duration-300 flex-1" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

