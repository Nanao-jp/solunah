"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/ui/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export default function YourNurseContactPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-wide">
            お問い合わせ
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
            ご質問やご相談がございましたら、お気軽にお問い合わせください
          </p>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* お問い合わせフォーム */}
            <div>
              <SectionTitle title="お問い合わせフォーム" />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* 連絡先情報 */}
            <div>
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
                    <h3 className="text-lg font-medium text-slate-900 mb-2">電話</h3>
                    <p className="text-slate-600 font-light">
                      0120-XXX-XXX
                    </p>
                    <p className="text-sm text-slate-500 font-light mt-1">
                      受付時間: 平日 9:00 - 18:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">所在地</h3>
                    <p className="text-slate-600 font-light">
                      〒XXX-XXXX<br />
                      東京都XX区XX町X-X-X
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl">
                <h3 className="text-xl font-light text-slate-900 mb-4">
                  YOUR NURSEについて
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  保険外看護サービス「YOUR NURSE」に関するご質問やご相談を承っております。
                  サービス内容、料金、利用方法など、お気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

