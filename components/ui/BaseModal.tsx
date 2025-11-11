"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  showCloseButton?: boolean;
  closeOnBackgroundClick?: boolean;
  zIndex?: number;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
  showCloseButton = true,
  closeOnBackgroundClick = true,
  zIndex = 99997,
}: BaseModalProps) {
  // モーダルが開いている時、背景のスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackgroundClick = () => {
    if (closeOnBackgroundClick) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackgroundClick}
      style={{ zIndex }}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-xl ${maxWidthClasses[maxWidth]} w-full overflow-hidden my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー部分 */}
        {(title || showCloseButton) && (
          <div className="relative px-8 pt-8 pb-6 border-b border-slate-200">
            {title && (
              <h2 className="text-2xl font-light text-slate-900 pr-8">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        )}

        {/* コンテンツ部分 */}
        <div className={`${title || showCloseButton ? "p-8" : "p-8"} relative`}>
          {children}
        </div>
      </div>
    </div>
  );
}

