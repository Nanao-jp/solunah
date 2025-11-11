/**
 * 共通の型定義
 */

import { LucideIcon } from "lucide-react";

/**
 * アイコンとタイトル、説明を持つ基本的なアイテム
 */
export interface BaseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * モーダルの基本プロップス
 */
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * カードコンポーネントの基本プロップス
 */
export interface BaseCardProps {
  index?: number;
  className?: string;
}

