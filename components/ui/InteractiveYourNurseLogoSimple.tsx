"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Glassmorphism from "@/components/ui/Glassmorphism";

/**
 * ハートの詳細情報の型定義
 */
interface HeartDetail {
  title: string;
  description: string;
}

/**
 * ハートの詳細情報データ
 * 4つの特徴を順番に表示
 */
const heartDetails: HeartDetail[] = [
  {
    title: "24時間365日",
    description: "保険内ではカバーしづらい長時間、夜間、休日にも臨機応変に対応可能",
  },
  {
    title: "全国対応",
    description: "全国各地で活動するフリーランス看護師と連携を取り、幅広い地域で対応可能",
  },
  {
    title: "1時間から",
    description: "最短1時間から15分単位での柔軟なプランで対応可能\n※長時間で各種割引適応あり",
  },
  {
    title: "看護師経験5年以上",
    description: "経験豊富なフリーランス看護師が、質の高いケアをご提供いたします。\n★現在全国1000人以上の看護師登録あり",
  },
];

/**
 * ハートのテキスト（画像の上に表示）
 * 画像の回転に合わせて表示されるテキスト
 * 配列の場合は2行に分けて表示
 */
const heartTexts: (string | [string, string])[] = [
  "24時間365日",
  "全国",
  "1時間から",
  ["看護師経験", "5年以上"], // 2行に分ける
];

/**
 * YOUR NURSEの特徴を表示するインタラクティブなコンポーネント
 * 
 * 機能:
 * - ロゴ画像を回転させて4つの特徴を順番に表示
 * - ページャーで手動切り替え可能
 * - 画像クリックで次の特徴に移動
 * 
 * 注意: アニメーションロジックは変更しないこと
 */
export default function InteractiveYourNurseLogoSimple() {
  // 現在表示中の特徴のインデックス（0-3）
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /**
   * 前の特徴に移動
   * 最初の場合は最後にループ
   */
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? heartDetails.length - 1 : prev - 1));
  };

  /**
   * 次の特徴に移動
   * 最後の場合は最初にループ
   */
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === heartDetails.length - 1 ? 0 : prev + 1));
  };

  /**
   * 指定したインデックスの特徴に直接移動
   * @param index 移動先のインデックス（0-3）
   */
  const goToIndex = (index: number) => {
    if (index >= 0 && index < heartDetails.length) {
      setCurrentIndex(index);
    }
  };

  // 現在表示中の特徴の詳細情報
  const currentDetail = heartDetails[currentIndex];
  
  // 画像の回転角度（各特徴ごとに90度ずつ回転）
  // 0度, 90度, 180度, 270度で4つのハートを表示
  const rotation = currentIndex * 90;

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
              {/* 
                画像を回転させるアニメーション
                - rotate: 現在のインデックスに応じて90度ずつ回転
                - scale: 画像を2倍に拡大してハート部分を大きく表示
                - x: 左に50%移動して右側のハートを中央に表示
                - transition: スプリングアニメーションで滑らかに回転
                
                注意: これらの値は慎重に調整されたため、変更しないこと
              */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: rotation,
                  scale: 2.0, // 画像をより拡大
                  x: "-50%", // もっと左に移動して右側のハートを表示
                }}
                transition={{
                  type: "spring",
                  stiffness: 100, // スプリングの硬さ（変更しない）
                  damping: 15, // 減衰（変更しない）
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
                <div className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                  {currentDetail.description.split('\n').map((line, index) => (
                    <p key={index} className={index > 0 ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

