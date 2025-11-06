"use client";

import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          style={{
            animation: `fadeInUp 0.8s ease-out both`,
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-slate-900 tracking-wide leading-tight">
            お問い合わせ
          </h2>
          <p className="text-base md:text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
            専門スタッフが丁寧に対応いたします。
          </p>
          <Button href="/contact" variant="secondary">
            お問い合わせフォームへ
          </Button>
        </div>
      </div>
    </section>
  );
}

