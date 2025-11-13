/**
 * 料金関連の定数
 */

// 基本料金
export const NORMAL_RATE = 8800; // 通常料金（5時～22時）
export const NIGHT_RATE = 11000; // 夜間料金（22時～翌5時）
export const NEW_YEAR_RATE = 11880; // 年末年始料金（12/30～1/3）

// カメラマンプラン
export const PHOTOGRAPHER_PLANS = {
  none: { name: "なし", price: 0 },
  mini: { name: "ミニプラン", price: 15000, duration: 1.0 }, // 60分 = 1時間
  standard: { name: "スタンダード", price: 18000, duration: 1.5 }, // 90分 = 1.5時間
} as const;

// コラボタイプ
export type CollaborationType = "with-face" | "without-face" | "no-collab";

// 延長料金
export const EXTENSION_PRICE = 5000; // 延長30分毎の料金

// コラボ割引の基準となる基本料金
export const BASE_RATE_FOR_COLLAB = 8800;

/**
 * コラボタイプに応じた割引率を取得
 */
export function getCollaborationDiscountRate(collaborationType: CollaborationType): number {
  switch (collaborationType) {
    case "with-face":
      return 0.25; // 25%
    case "without-face":
      return 0.10; // 10%
    case "no-collab":
      return 0; // 0%
  }
}

