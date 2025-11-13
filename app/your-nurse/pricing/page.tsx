"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Glassmorphism from "@/components/ui/Glassmorphism";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import PricingSimulator from "@/components/ui/PricingSimulator";
import PricingCard from "@/components/ui/PricingCard";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import LongTermPackTable from "@/components/ui/LongTermPackTable";
import ContactForm from "@/components/ui/ContactForm";
import { Clock, Calendar, Home, Camera, MapPin, Building, Calculator } from "lucide-react";

export default function YourNursePricingPage() {
  const [pricingResult, setPricingResult] = useState<string>("");

  const scrollToSimulator = () => {
    const element = document.getElementById("pricing-simulator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInquiryRequest = (message: string) => {
    setPricingResult(message);
    // 問い合わせフォームまでスクロール
    setTimeout(() => {
      const formElement = document.getElementById("contact-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="relative">
            <div className="relative px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
              <Glassmorphism blur="2xl" opacity={60} hoverOpacity={70} hoverEffect={true} />
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-wide">
                  料金について
                </h1>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                  少しでも長くスペシャルタイムを過ごしていただけるよう長時間パックもご準備しております。
                  <br />
                  ご利用者様のニーズに合わせて料金シュミレーターが出来、そのままお問い合わせも可能です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 基本料金セクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="基本料金" />
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <PricingCard
              icon={Clock}
              title="通常料金"
              period="5時～22時"
              price="¥8,800"
              unit="/時間"
            />
            <PricingCard
              icon={Clock}
              title="夜間料金"
              period="22時～翌5時"
              price="¥11,000"
              unit="/時間"
            />
            <PricingCard
              icon={Calendar}
              title="年末年始"
              period="12/30～1/3"
              price="¥11,880"
              unit="/時間"
            />
          </div>
        </div>
      </section>

      {/* 長時間パック料金表 */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-wide mb-2">
              長時間パック
            </h2>
            <p className="text-lg text-slate-600 font-light">
              （夜間・年末年始除く）
            </p>
          </div>
          
          <div className="mt-16 relative">
            <div className="relative px-8 py-12 rounded-2xl overflow-hidden">
              <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
              
              <LongTermPackTable />
            </div>
          </div>
        </div>
      </section>

      {/* カメラマンオプションセクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="relative px-8 py-12 rounded-2xl overflow-hidden">
              <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-8 h-8 text-orange-500" />
                  <h3 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">
                    カメラマンオプション
                  </h3>
                  <span className="text-sm text-slate-500 font-light">現在確認中</span>
                </div>
                <p className="text-slate-600 font-light mb-6">
                  現状、福岡県在住のカメラマンとコラボして諦めていた夢を叶えたことを想い出に残せる。今後、地域拡大予定
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-base whitespace-nowrap">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="py-3 px-4 sm:px-6 font-light text-slate-900 text-left whitespace-nowrap">プラン</th>
                          <th className="py-3 px-4 sm:px-6 font-light text-slate-900 text-left whitespace-nowrap">料金</th>
                          <th className="py-3 px-4 sm:px-6 font-light text-slate-900 text-left whitespace-nowrap">時間</th>
                          <th className="py-3 px-4 sm:px-6 font-light text-slate-900 text-left whitespace-nowrap">編集枚数</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">ミニプラン</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-900 whitespace-nowrap">¥15,000</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">60分</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">30枚</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">スタンダード</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-900 whitespace-nowrap">¥18,000</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">90分</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">50枚</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">延長30分毎に</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-900 whitespace-nowrap">¥5,000</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">30分</td>
                          <td className="py-3 px-4 sm:px-6 font-light text-slate-600 whitespace-nowrap">+10枚</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <p className="text-base text-slate-600 font-light">
                      当日撮影した全データお渡し<br />
                      オンラインドライブ…無料<br />
                      USB…¥2,200
                    </p>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600 font-light mb-3">
                        ※弊社HPやSNSでお写真を使わせていただけるのであれば
                      </p>
                      <div className="space-y-2 text-sm text-slate-600 font-light pl-4">
                        <p>顔出しあり　カメラマンコラボの時間のみ25％off</p>
                        <p>顔出しなし　カメラマンコラボの時間のみ10％off</p>
                        <p>残りの時間は本来の時間の長時間パックの割引額対象</p>
                        <div className="pl-4 space-y-1 mt-2">
                          <p>3～8時間　5％</p>
                          <p>9～11時間　10％</p>
                          <p>12時間以上　15％</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* 事例セクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="料金事例" />
          
          <div className="space-y-8 mt-16">
            <CaseStudyCard
              icon={Building}
              title="病院や施設・自宅からの外出"
              timeInfo="10:00～13:00　total:3時間(長時間パック適応)"
              price="¥25,080"
              breakdown={[]}
              timeIcon="clock"
            />

            <CaseStudyCard
              icon={Camera}
              title="孫の七五三参り"
              timeInfo="11:00～14:00　total:3時間"
              price="¥40,440"
              breakdown={[
                "内訳：カメラマンオプションの時間(顔出し提供25％off)",
                "¥8,800×1.5時間×0.75⁼¥9,900",
                "残りの時間",
                "¥8,800×1.5時間×0.95⁼¥12,540",
                "カメラマンオプション(スタンダード:90分)　¥18,000",
                "データオンラインドライブ　¥0",
              ]}
              timeIcon="clock"
            />

            <CaseStudyCard
              icon={MapPin}
              title="ディズニー旅行"
              timeInfo="1泊2日夜間別室　total：22時間"
              price="¥168,960+旅費等"
              breakdown={[
                "内訳：長時間パック",
                "¥89,760(12時間)+¥79,200(10時間)⁼¥168,960",
              ]}
              details={[
                "1日目　新大阪の新幹線から同席(9:00～21:00/12時間)",
                "2日目　新大阪駅まで(8:00～18:00/10時間)",
              ]}
              timeIcon="calendar"
            />

            <CaseStudyCard
              icon={Home}
              title="在宅"
              timeInfo="毎週月・水・木曜日　13:00～16:00/3時間"
              price="¥269,280"
              breakdown={[
                "内訳：3時間長時間パック×12回/月⁼¥300,960",
                "さらに！　定期利用割引適応",
              ]}
              timeIcon="calendar"
            />

            {/* イベント救護 */}
            <div className="relative">
              <div className="relative px-8 py-12 rounded-2xl overflow-hidden">
                <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-4 tracking-wide">
                    イベント救護も対応可能
                  </h3>
                  <p className="text-slate-600 font-light">
                    各種イベントでの救護対応も承っております。詳細はお問い合わせください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金シミュレーター */}
      <section id="pricing-simulator" className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50 overflow-visible">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="料金シミュレーター" />
          
          <div className="mt-16">
            <div className="relative px-8 py-12 rounded-2xl overflow-visible">
              <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
              
              <div className="relative z-10">
                <PricingSimulator onInquiryRequest={handleInquiryRequest} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section id="contact-form" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="お問い合わせ" />
          
          <div className="mt-16">
            <div className="relative px-8 py-12 rounded-2xl overflow-hidden">
              <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
              
              <div className="relative z-10">
                <p className="text-base md:text-lg text-slate-600 mb-8 text-center leading-relaxed font-light">
                  ご質問やご相談がございましたら、お気軽にお問い合わせください。
                </p>
                <ContactForm showPhone={true} initialPricingResult={pricingResult} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative px-8 py-16 rounded-2xl overflow-hidden">
            <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 tracking-wide">
                ご不明な点がございましたら
              </h2>
              <p className="text-xl text-slate-600 font-light mb-8">
                お気軽にお問い合わせください
              </p>
              <a
                href="/your-nurse/contact"
                className="inline-block px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 料金シミュレーターへのスクロールボタン */}
      <button
        onClick={scrollToSimulator}
        className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-3 py-2 md:px-5 md:py-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 md:gap-2 group"
        aria-label="料金シミュレーターへスクロール"
      >
        <Calculator className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
        <span className="text-xs md:text-sm font-medium whitespace-nowrap">料金シミュレーター</span>
      </button>
    </>
  );
}
