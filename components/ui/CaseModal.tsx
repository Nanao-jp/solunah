"use client";

import { LucideIcon } from "lucide-react";
import BaseModal from "@/components/ui/BaseModal";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: LucideIcon;
  title: string;
  message: string;
}

export default function CaseModal({ isOpen, onClose, icon: IconComponent, title, message }: CaseModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      zIndex={99999}
      showCloseButton={false}
    >
      {/* カスタム閉じるボタン */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* 写真部分 */}
      <div className="relative w-full bg-slate-50 p-6 md:p-8 -mx-8 -mt-8 mb-6">
        <div className="relative w-full max-w-2xl mx-auto">
          <ImagePlaceholder icon={IconComponent} className="rounded-lg" />
        </div>
      </div>

      {/* コンテンツ部分 */}
      <div className="pt-0">
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
    </BaseModal>
  );
}

