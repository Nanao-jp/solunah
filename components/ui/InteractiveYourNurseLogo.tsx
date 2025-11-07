"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import YourNurseLogoWithText from "./YourNurseLogoWithText";

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

/**
 * インタラクティブなYOUR NURSEロゴコンポーネント
 * クリックで90度回転し、右側のハートがクローズアップされる
 */
export default function InteractiveYourNurseLogo() {
  const [currentIndex, setCurrentIndex] = useState(1); // 初期状態: 右側（全国）

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % 4);
  };

  const currentDetail = heartDetails[currentIndex];
  const rotation = currentIndex * 90; // 0度, 90度, 180度, 270度

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* 左側: SVGロゴ（回転・クローズアップ） */}
      <div className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0">
        <motion.div
          className="w-full h-full cursor-pointer"
          onClick={handleClick}
          animate={{
            rotate: rotation,
            scale: 1.2, // クローズアップ効果
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          style={{
            transformOrigin: "center center",
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            {/* 右側のハート部分をクローズアップ */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
              }}
            >
              <YourNurseLogoWithText
                imageWidth={1200}
                imageHeight={1200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
        
        {/* クリックヒント */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-slate-500 font-light">
          クリックで回転
        </div>
      </div>

      {/* 右側: 詳細テキスト */}
      <div className="flex flex-col justify-center">
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
  );
}

