"use client";

import Glassmorphism from "@/components/ui/Glassmorphism";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/ui/ContactForm";

export default function CTASection() {
  const handleSubmit = (data: { name: string; email: string; phone?: string; message: string }) => {
    // フォーム送信処理（後で実装）
    console.log("Form submitted:", data);
    alert("お問い合わせありがとうございます。後日ご連絡いたします。");
  };

  return (
    <section className="py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          {/* すりガラス背景エフェクト */}
          <Glassmorphism hoverEffect={true} />
          
          <div className="relative z-10 p-8 md:p-12">
            <div
              style={{
                animation: `fadeInUp 0.8s ease-out both`,
              }}
            >
              <SectionTitle title="お問い合わせ" />
              
              <p className="text-base md:text-lg text-slate-600 mb-8 text-center leading-relaxed font-light">
                ご質問やご相談がございましたら、お気軽にお問い合わせください。
                専門スタッフが丁寧に対応いたします。
              </p>

              <ContactForm showPhone={true} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

