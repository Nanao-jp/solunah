"use client";

import { Mail, Phone, Fax } from "lucide-react";
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

        <div className="grid md:grid-cols-2 gap-12">
          {/* フォーム部分 */}
          <div className="flex-1 w-full flex">
            <SunCard className="p-8 md:p-10 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col">
              <ContactForm showPhone={false} onSubmit={handleSubmit} />
            </SunCard>
          </div>

          {/* 連絡先情報 */}
          <div className="flex-1 w-full flex flex-col">
            <SunCard className="p-8 md:p-10 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col">
              <SectionTitle title="連絡先情報" />
              <div className="mt-8 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">メール</h3>
                    <p className="text-slate-600 font-light">
                      info@solunah.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">主番号(転送あり)</h3>
                    <p className="text-slate-600 font-light">
                      092-692-7557
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Fax className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">FAX番号</h3>
                    <p className="text-slate-600 font-light">
                      092-692-7550
                    </p>
                  </div>
                </div>
              </div>
            </SunCard>
          </div>
        </div>
      </div>
    </section>
  );
}

