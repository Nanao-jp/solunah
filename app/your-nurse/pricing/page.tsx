"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import Glassmorphism from "@/components/ui/Glassmorphism";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import PricingSimulator from "@/components/ui/PricingSimulator";
import PricingCard from "@/components/ui/PricingCard";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import LongTermPackTable from "@/components/ui/LongTermPackTable";
import { Clock, Calendar, Home, Camera, MapPin } from "lucide-react";

export default function YourNursePricingPage() {

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
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                  お客様のニーズに合わせた柔軟な料金プランをご用意しています
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

      {/* 料金シミュレーター */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50 overflow-visible">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="料金シミュレーター" />
          
          <div className="mt-16">
            <div className="relative px-8 py-12 rounded-2xl overflow-visible">
              <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
              
              <div className="relative z-10">
                <PricingSimulator />
              </div>
            </div>
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

      {/* 定期契約・カメラマンコラボセクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 定期契約 */}
            <div className="relative">
              <div className="relative px-8 py-12 h-full rounded-2xl overflow-hidden">
                <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-4 tracking-wide">
                    定期契約
                  </h3>
                  <p className="text-slate-600 font-light">
                    ご契約内容により割引適用あり
                  </p>
                </div>
              </div>
            </div>

            {/* カメラマンコラボ */}
            <div className="relative">
              <div className="relative px-8 py-12 h-full rounded-2xl overflow-hidden">
                <Glassmorphism blur="xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-8 h-8 text-orange-500" />
                    <h3 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">
                      カメラマンコラボ
                    </h3>
                    <span className="text-sm text-slate-500 font-light">現在確認中</span>
                  </div>
                  <p className="text-slate-600 font-light mb-6">
                    現状、福岡県在住のカメラマンとコラボして諦めていた夢を叶えたことを想い出に残せる。今後、地域拡大予定
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm whitespace-nowrap">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="py-2 px-3 sm:px-4 font-light text-slate-900 text-left whitespace-nowrap">プラン</th>
                          <th className="py-2 px-3 sm:px-4 font-light text-slate-900 text-left whitespace-nowrap">料金</th>
                          <th className="py-2 px-3 sm:px-4 font-light text-slate-900 text-left whitespace-nowrap">時間</th>
                          <th className="py-2 px-3 sm:px-4 font-light text-slate-900 text-left whitespace-nowrap">編集枚数</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">ミニプラン</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-900 whitespace-nowrap">¥15,000</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">60分</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">40枚</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">スタンダード</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-900 whitespace-nowrap">¥18,000</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">90分</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">50枚</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">延長30分毎に</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-900 whitespace-nowrap">¥3,000</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">30分</td>
                          <td className="py-2 px-3 sm:px-4 font-light text-slate-600 whitespace-nowrap">+10枚</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="mt-6 text-sm text-slate-600 font-light">
                    編集前後全データお渡し<br />
                    オンラインドライブ... 無料<br />
                    USB... ¥2,200
                  </p>
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
              icon={Camera}
              title="孫の七五三参り"
              timeInfo="11:00～13:00　total: 2時間"
              price="¥35,600"
              breakdown={[
                "内訳：¥8,800×2 = ¥17,600",
                "カメラマンコラボ(スタンダード)　¥18,000",
              ]}
              timeIcon="clock"
            />

            <CaseStudyCard
              icon={MapPin}
              title="ディズニー旅行"
              timeInfo="2泊3日夜間別室　total：35.75時間"
              price="¥251,680"
              breakdown={[
                "内訳：¥8,800×35.75時間 = ¥314,600",
                "長時間ご利用いただいたため、20％お値引き",
                "¥314,600×0.8 = ¥251,680",
              ]}
              details={[
                "1日目　新大阪の新幹線から同席(10:45～21:00/10.25時間)",
                "2日目　ディズニー旅行(6:30～21:00/14.5時間)",
                "3日目　新大阪駅まで(7:00～18:00/11時間)",
              ]}
              timeIcon="calendar"
            />

            <CaseStudyCard
              icon={Home}
              title="在宅"
              timeInfo="毎週月・水・木曜日　13:00～16:00/3時間"
              price="¥316,800"
              breakdown={[
                "¥8,800×3時間×3回/週×4週/月 = ¥316,800",
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
    </>
  );
}
