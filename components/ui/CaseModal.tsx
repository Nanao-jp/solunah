"use client";

import { useEffect } from "react";
import { LucideIcon, X } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: LucideIcon;
  title: string;
  message: string;
}

export default function CaseModal({ isOpen, onClose, icon: IconComponent, title, message }: CaseModalProps) {
  useEffect(() => {
    if (isOpen) {
      // モーダルが開いている時、背景のスクロールを無効化
      document.body.style.overflow = "hidden";
    } else {
      // モーダルが閉じている時、スクロールを有効化
      document.body.style.overflow = "";
    }

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 写真部分 */}
        <div className="relative w-full bg-slate-50 p-6 md:p-8">
          <div className="relative w-full max-w-2xl mx-auto">
            <ImagePlaceholder icon={IconComponent} className="rounded-lg" />
          </div>
        </div>

        {/* コンテンツ部分 */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">
              {title}
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

