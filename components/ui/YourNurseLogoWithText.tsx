"use client";

interface YourNurseLogoWithTextProps {
  className?: string;
  /**
   * ロゴ画像の幅（viewBoxの幅に合わせる）
   * 実際の画像サイズに合わせて調整してください
   */
  imageWidth?: number;
  /**
   * ロゴ画像の高さ（viewBoxの高さに合わせる）
   * 実際の画像サイズに合わせて調整してください
   */
  imageHeight?: number;
}

interface HeartText {
  lines: string[];
  x: number;
  y: number;
  lineHeight: number;
  fontSize?: string;
}

/**
 * YOUR NURSEロゴにテキストをオーバーレイするSVGコンポーネント
 * 方法B: PNG下地＋SVGテキストオーバーレイ方式
 */
export default function YourNurseLogoWithText({
  className = "",
  imageWidth = 1200,
  imageHeight = 1200,
}: YourNurseLogoWithTextProps) {
  // 座標定数（ハートの位置調整用）
  const POSITIONS = {
    TOP_X: 0.5,        // 中央
    TOP_Y: 0.18,       // 上
    RIGHT_X: 0.80,     // 右
    RIGHT_Y: 0.5,      // 中央
    BOTTOM_X: 0.5,     // 中央
    BOTTOM_Y: 0.82,    // 下
    LEFT_X: 0.20,      // 左
    LEFT_Y: 0.47,      // 中央より少し上
  } as const;

  // スタイル定数
  const STYLES = {
    DEFAULT_FONT_SIZE: "1.2em",
    SMALL_FONT_SIZE: "1.0em",
    EXTRA_SMALL_FONT_SIZE: "0.85em", // 看護師経験５年以上用
    LINE_HEIGHT: 70,
    // レスポンシブフォントサイズ: 最小36px、最大48px、5vwでスケーリング
    // 小さな画面でも読みやすいサイズを確保
    BASE_FONT_SIZE: "clamp(36px, 5vw, 48px)",
    // テキストの色と装飾
    TEXT_COLOR: "#1e293b", // slate-800（サイトの雰囲気に合わせた濃いグレー）
    TEXT_SHADOW_FILTER: "your-nurse-text-shadow", // SVGフィルターID（ユニークなID）
    // フォント設定（サイトに合わせて）
    FONT_FAMILY: "'Noto Sans JP', sans-serif", // 直接フォント名を指定
    FONT_WEIGHT: 300, // font-light（サイトの雰囲気に合わせて）
  } as const;

  // 4つのハートのテキスト（時計回り: 上→右→下→左）
  // ハートの視覚的な中心に正確に配置するため、座標を1つずつ調整可能
  const heartTexts: HeartText[] = [
    // 上: 24時間 / 365日 - 2行に分ける
    { 
      lines: ["24時間", "365日"], 
      x: imageWidth * POSITIONS.TOP_X, 
      y: imageHeight * POSITIONS.TOP_Y,
      lineHeight: STYLES.LINE_HEIGHT,
    },
    // 右: 全国
    { 
      lines: ["全国"], 
      x: imageWidth * POSITIONS.RIGHT_X,
      y: imageHeight * POSITIONS.RIGHT_Y,
      lineHeight: 0,
    },
    // 下: 1時間から
    { 
      lines: ["1時間から"], 
      x: imageWidth * POSITIONS.BOTTOM_X, 
      y: imageHeight * POSITIONS.BOTTOM_Y,
      lineHeight: 0,
    },
    // 左: 看護師経験 / ５年以上 - 2行に分ける
    { 
      lines: ["看護師経験", "５年以上"], 
      x: imageWidth * POSITIONS.LEFT_X,
      y: imageHeight * POSITIONS.LEFT_Y,
      lineHeight: STYLES.LINE_HEIGHT,
      fontSize: STYLES.EXTRA_SMALL_FONT_SIZE, // さらに小さく
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${imageWidth} ${imageHeight}`}
      preserveAspectRatio="xMidYMid meet"
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        // SVG全体のベースフォントサイズをclamp()でレスポンシブに設定
        // 各テキストのfontSizeはemで相対的に指定
        fontSize: STYLES.BASE_FONT_SIZE,
        fontFamily: STYLES.FONT_FAMILY,
        fontWeight: STYLES.FONT_WEIGHT,
        letterSpacing: "0.05em",
      }}
    >
      {/* SVGフィルター定義（テキストシャドウ用） */}
      <defs>
        <filter id={STYLES.TEXT_SHADOW_FILTER} x="-50%" y="-50%" width="200%" height="200%">
          {/* 白いシャドウで可読性を向上（背景とのコントラスト） */}
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="2"
            floodColor="rgba(255, 255, 255, 0.9)"
            floodOpacity="1"
          />
          {/* オレンジ系の軽いドロップシャドウ（サイトの雰囲気に合わせて） */}
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="4"
            floodColor="rgba(249, 115, 22, 0.2)"
            floodOpacity="1"
          />
        </filter>
      </defs>

      {/* PNGロゴ画像を下地として配置 */}
      <image
        href="/your-nurse-logo.png"
        x="0"
        y="0"
        width={imageWidth}
        height={imageHeight}
        preserveAspectRatio="xMidYMid meet"
      />

      {/* テキストオーバーレイ */}
      {heartTexts.map((item, index) => {
        // デフォルトは1.2em、個別指定があればそれを使用
        const fontSizeEm = item.fontSize || STYLES.DEFAULT_FONT_SIZE;
        
        // 複数行の場合は<tspan>を使用
        if (item.lines.length > 1) {
          // 中央揃えのため、最初の行を中央から上にずらす
          // dominantBaseline="hanging"を使うので、最初の行の位置を計算
          const totalHeight = item.lineHeight * (item.lines.length - 1);
          const firstLineY = item.y - totalHeight / 2;
          
          return (
            <text
              key={index}
              x={item.x}
              y={firstLineY}
              textAnchor="middle"
              dominantBaseline="hanging"
              fill={STYLES.TEXT_COLOR}
              filter={`url(#${STYLES.TEXT_SHADOW_FILTER})`}
              style={{
                fontSize: fontSizeEm,
              }}
            >
              {item.lines.map((line, lineIndex) => (
                <tspan
                  key={lineIndex}
                  x={item.x}
                  dy={lineIndex === 0 ? 0 : item.lineHeight}
                >
                  {line}
                </tspan>
              ))}
            </text>
          );
        } else {
          // 単一行のテキスト
          return (
            <text
              key={index}
              x={item.x}
              y={item.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={STYLES.TEXT_COLOR}
              filter={`url(#${STYLES.TEXT_SHADOW_FILTER})`}
              style={{
                fontSize: fontSizeEm,
              }}
            >
              {item.lines[0]}
            </text>
          );
        }
      })}
    </svg>
  );
}

