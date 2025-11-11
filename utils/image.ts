/**
 * 画像関連のユーティリティ
 */

/**
 * 画像のサイズを最適化するためのsizes属性を生成
 * @param breakpoints ブレークポイントとサイズのマッピング
 * @returns sizes属性の文字列
 */
export function generateImageSizes(breakpoints: Record<string, string>): string {
  const entries = Object.entries(breakpoints)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([bp, size]) => `(max-width: ${bp}px) ${size}`)
    .join(", ");
  
  // デフォルトサイズを追加
  const defaultSize = breakpoints.default || "100vw";
  return entries ? `${entries}, ${defaultSize}` : defaultSize;
}

/**
 * よく使う画像サイズのプリセット
 */
export const IMAGE_SIZES = {
  // カード用（モバイル: 100vw, タブレット: 50vw, デスクトップ: 33vw）
  card: generateImageSizes({
    "768": "50vw",
    "1024": "33vw",
    default: "100vw",
  }),
  // フル幅（常に100vw）
  fullWidth: "100vw",
  // コンテナ内（最大幅に合わせる）
  container: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
} as const;

