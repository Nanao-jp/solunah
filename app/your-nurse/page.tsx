"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/ui/SectionTitle";
import { allServices } from "@/data/services";
import Image from "next/image";
import { Home, MessageCircle, Users, Clock } from "lucide-react";
import Glassmorphism from "@/components/ui/Glassmorphism";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import YourNurseFeaturesSection from "@/components/YourNurseFeaturesSection";

export default function YourNursePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* ヒーローセクション */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="relative">
            {/* Glassmorphismコンテナ */}
            <div className="relative px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
              <Glassmorphism blur="2xl" opacity={60} hoverOpacity={70} hoverEffect={true} />
              
              {/* コンテンツ */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="mb-8 md:mb-12">
                  <Image
                    src="/your-nurse-logo2.png"
                    alt="YOUR NURSE Logo"
                    width={600}
                    height={300}
                    className="object-contain mx-auto drop-shadow-2xl"
                    priority
                  />
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-wide">
                  保険外看護サービス
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-700 text-center max-w-3xl leading-relaxed font-light mb-4">
                  新しい看護の形を、あなたに
                </p>
                
                <p className="text-base md:text-lg text-slate-600 text-center max-w-2xl leading-relaxed font-light">
                  静かに寄り添い、温かく明るく、あなたの健康をサポートします
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR NURSEの特徴セクション（ロゴ付き） */}
      <YourNurseFeaturesSection />

      {/* サービス紹介セクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="サービス内容" />
          
          <div className="space-y-24">
            {allServices.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-stretch gap-12"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* テキスト部分 */}
                  <div className="flex-1 w-full">
                    <div className="h-full flex flex-col justify-center">
                      <div className="mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-orange-500" />
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-light mb-4 text-slate-900 tracking-wide">
                        {service.title}
                      </h3>
                      <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* 画像部分 */}
                  <div className="flex-1 w-full">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-50 to-amber-50" style={{ aspectRatio: '4/3' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center border-2 border-orange-200">
                          <IconComponent className="w-12 h-12 text-orange-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ロゴセクション */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="relative"
            style={{
              animation: `fadeInUp 0.8s ease-out both`,
            }}
          >
            <Image
              src="/your-nurse-logo2.png"
              alt="YOUR NURSE Logo 2"
              width={600}
              height={300}
              className="object-contain mx-auto"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

