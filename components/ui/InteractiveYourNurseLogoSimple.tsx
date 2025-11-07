"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Glassmorphism from "@/components/ui/Glassmorphism";

interface HeartDetail {
  title: string;
  description: string;
}

const heartDetails: HeartDetail[] = [
  {
    title: "24時間365日",
    description: "いつでも、どこでも、あなたの健康をサポートします。夜間や休日も含めて、24時間365日体制で看護サービスを提供いたします。",
  },
  {
    title: "全国対応",
    description: "全国どこへでもお伺いします。地方や遠方でも、お客様のご要望に応じて柔軟に対応いたします。",
  },
  {
    title: "1時間から",
    description: "短時間からご利用いただけます。1時間単位でのサービス提供が可能で、お客様のスケジュールに合わせた柔軟なプランをご用意しています。",
  },
  {
    title: "看護師経験5年以上",
    description: "経験豊富な看護師が、専門的な看護技術と知識を活かして、質の高いケアを提供いたします。5年以上の実務経験を持つ看護師が対応します。",
  },
];

// ハートのテキスト（画像の上に表示）
const heartTexts = [
  "24時間365日",
  "全国",
  "1時間から",
  ["看護師経験", "5年以上"], // 2行に分ける
];

/**
 * YOUR NURSEの特徴を表示するコンポーネント
 * ページャーで複数の特徴を切り替え
 */
export default function InteractiveYourNurseLogoSimple() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? heartDetails.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === heartDetails.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const currentDetail = heartDetails[currentIndex];
  const rotation = currentIndex * 90; // 0度, 90度, 180度, 270度

  return (
    <div className="relative">
      {/* Glassmorphismコンテナ - 全体を囲む */}
      <div className="relative px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16">
        <Glassmorphism blur="2xl" opacity={50} hoverOpacity={60} hoverEffect={true} />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 左カラム: ロゴ画像とページャー */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            {/* 正方形のコンテナ */}
            <div 
              className="relative w-full aspect-square overflow-hidden rounded-2xl cursor-pointer border border-white/30 shadow-xl"
              onClick={goToNext}
            >
              {/* 画像を回転させる - 左側に配置して拡大 */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: rotation,
                  scale: 2.0, // 画像をより拡大
                  x: "-50%", // もっと左に移動して右側のハートを表示
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <Image
                  src="/your-nurse-logo.png"
                  alt="YOUR NURSE Logo"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "left center" }}
                  priority
                />
              </motion.div>
              
              {/* 画像の上に装飾されたテキストを表示 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* テキスト背景 */}
                  <div className="px-8 py-6 md:px-12 md:py-8 rounded-2xl bg-white/80">
                    <h2
                      className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 text-center"
                      style={{
                        fontFamily: "'Noto Sans JP', sans-serif",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {Array.isArray(heartTexts[currentIndex]) ? (
                        <span>
                          {heartTexts[currentIndex][0]}
                          <br />
                          {heartTexts[currentIndex][1]}
                        </span>
                      ) : (
                        heartTexts[currentIndex]
                      )}
                    </h2>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* ページャーコントロール - 画像の下に配置 */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {/* 前へボタン */}
              <button
                onClick={goToPrevious}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-orange-50/80 hover:border-orange-300/50 transition-all flex items-center justify-center shadow-lg"
                aria-label="前へ"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              
              {/* ドットインジケーター */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/30">
                {heartDetails.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index
                        ? "w-8 bg-orange-500 shadow-md"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`${index + 1}ページ目へ`}
                  />
                ))}
              </div>
              
              {/* 次へボタン */}
              <button
                onClick={goToNext}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-orange-50/80 hover:border-orange-300/50 transition-all flex items-center justify-center shadow-lg"
                aria-label="次へ"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>

          {/* 右カラム: 詳細テキスト */}
          <div className="flex flex-col justify-center min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 tracking-wide">
                  {currentDetail.title}
                </h3>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                  {currentDetail.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

