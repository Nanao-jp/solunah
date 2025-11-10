# 技術ドキュメント

このドキュメントでは、SOLUNAHプロジェクトで使用されている再利用可能な技術パターンと実装方法について説明します。

## 📐 複数サイトを内包するアーキテクチャ

1つのNext.jsアプリケーション内に複数の独立したサイトを内包する構造です。

### ディレクトリ構造

```
app/
├── layout.tsx              # ルートレイアウト（全サイト共通）
├── page.tsx                # サイト1のトップページ
│
├── site-2/                 # サイト2
│   ├── layout.tsx          # サイト2専用レイアウト
│   ├── page.tsx
│   └── ...
│
└── site-3/                 # サイト3
    ├── layout.tsx          # サイト3専用レイアウト
    ├── page.tsx
    └── ...
```

### 実装パターン

#### 1. サイト専用レイアウト

各サイトに`layout.tsx`を配置して、独自のナビゲーションやフッターを設定：

```tsx
// app/site-2/layout.tsx
export default function Site2Layout({ children }) {
  return (
    <div>
      <Site2Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

#### 2. サイト切り替えナビゲーション

現在のサイトを判定してハイライト表示：

```tsx
const isCurrentSite = (path: string) => {
  if (path === "/") {
    return !pathname?.startsWith("/site-2") && 
           !pathname?.startsWith("/site-3");
  }
  return pathname?.startsWith(path);
};
```

### メリット

- コードの再利用性が高い
- 統一されたデザインシステム
- SEO最適化が容易
- メンテナンス性が高い

---

## 💰 料金シミュレーターの実装パターン

複雑な料金計算ロジックを持つ再利用可能なコンポーネントの実装方法です。

### 基本構造

```tsx
interface CalculationResult {
  totalHours: number;
  basePrice: number;
  discount: number;
  totalPrice: number;
  breakdown: {
    // 内訳
  };
}

function calculatePrice(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): CalculationResult {
  // 時間計算
  // 料金計算
  // 割引適用
  return result;
}
```

### 時間帯別料金の計算パターン

```tsx
// 1時間ごとに時間帯を判定
const current = new Date(start);
const stepMs = 60 * 60 * 1000; // 1時間

while (current < end) {
  const hour = current.getHours();
  
  if (isSpecialPeriod(current)) {
    specialHours += hours;
  } else if (hour >= dayStart && hour < dayEnd) {
    dayHours += hours;
  } else {
    nightHours += hours;
  }
  
  current.setTime(checkTime);
}
```

### 料金計算ルール（YOUR NURSE）

#### 1. 基本料金

時間帯別の料金を適用：

- **通常時間**: ¥8,800/時間（5時～22時）
- **夜間時間**: ¥11,000/時間（22時～翌5時）
- **年末年始**: ¥11,880/時間（12/30～1/3）

年末年始期間は優先的に適用されます。

#### 2. 写真提供コラボ割引

カメラマンオプションを選択し、コラボタイプを選択した場合に適用される割引です。

**割引率**:
- 顔出し有り: 25%割引
- 顔出し無し: 10%割引

**割引額の計算**:
- 基本料金（8,800円）を基準に固定割引額を計算
- スタンダードプラン（90分 = 1.5時間）:
  - 顔出し有り: 8,800円 × 0.25 × 1.5 = **3,300円**
  - 顔出し無し: 8,800円 × 0.10 × 1.5 = **1,320円**
- ミニプラン（60分 = 1時間）:
  - 顔出し有り: 8,800円 × 0.25 = **2,200円**
  - 顔出し無し: 8,800円 × 0.10 = **880円**

**特別ルール**:
- 12時間以上で顔出し無しコラボの場合、写真提供割引は適用されません（長時間パック割引の方が大きいため）

#### 3. 長時間パック割引

総合時間（基本料金の利用時間）に応じて割引率が適用されます。

**割引率**:
- 3～8時間: 5%
- 9～11時間: 10%
- 12時間以上: 15%

**適用方法**:
- コラボ以外の時間分の料金に、総合時間で判定した割引率を適用
- 例: 総合時間が5時間の場合、5%の割引率をコラボ以外の時間分に適用

#### 4. コラボ時間分とコラボ以外の時間分への分割

写真提供コラボが選択されている場合、基本料金を以下のように分割します：

1. **コラボ時間の割り当て**:
   - コラボ時間は通常時間から優先的に割り当て（夜間・年末年始は後回し）
   - ミニプラン: 1時間
   - スタンダードプラン: 1.5時間

2. **割引の適用**:
   - **コラボ時間分**: 写真提供割引を適用（固定金額）
   - **コラボ以外の時間分**: 長時間パック割引を適用（総合時間で判定した割引率）

#### 5. 計算の流れ

```
1. 基本料金を計算（通常・夜間・年末年始の合計）
2. コラボ時間分とコラボ以外の時間分に分割
3. コラボ時間分の料金を計算
4. コラボ以外の時間分の料金を計算
5. 総合時間で長時間パックの割引率を判定
6. コラボ時間分に写真提供割引を適用
7. コラボ以外の時間分に長時間パック割引を適用
8. 12時間以上で顔出し無しコラボの場合、写真提供割引を無効化
9. 合計金額 = 基本料金 - 写真提供割引 - 長時間パック割引 + カメラマンオプション料金
```

#### 6. 計算例

**例1: 4時間利用、スタンダードプラン、顔出し有り**
- 基本料金: 4時間 × 8,800円 = 35,200円
- コラボ時間分: 1.5時間 × 8,800円 = 13,200円 → 写真提供割引¥3,300適用
- コラボ以外: 2.5時間 × 8,800円 = 22,000円 → 長時間パック5%適用（¥1,100割引）
- 合計割引: ¥3,300 + ¥1,100 = ¥4,400
- カメラマンオプション: ¥18,000
- **合計金額: ¥35,200 - ¥4,400 + ¥18,000 = ¥48,800**

**例2: 12時間利用、スタンダードプラン、顔出し無し**
- 基本料金: 12時間 × 8,800円 = 105,600円
- コラボ時間分: 1.5時間 × 8,800円 = 13,200円
- コラボ以外: 10.5時間 × 8,800円 = 92,400円
- 総合時間12時間で長時間パック15%適用 → コラボ以外に15%適用（¥13,860割引）
- 写真提供割引: 12時間以上で顔出し無しのため適用されない
- カメラマンオプション: ¥18,000
- **合計金額: ¥105,600 - ¥13,860 + ¥18,000 = ¥109,740**

### 割引ロジックの実装

```tsx
// コラボ時間分とコラボ以外の時間分に分割
let collabNormalHours = 0;
let remainingCollabHours = collaborationHours;

if (remainingCollabHours > 0 && normalHours > 0) {
  collabNormalHours = Math.min(remainingCollabHours, normalHours);
  remainingCollabHours -= collabNormalHours;
}

// コラボ以外の時間
const nonCollabNormalHours = normalHours - collabNormalHours;

// 総合時間で長時間パックの割引率を判定
let longTermDiscountRate = 0;
const totalHoursInt = Math.floor(normalHours + nightHours + newYearHours);

if (totalHoursInt >= 12) {
  longTermDiscountRate = 0.15;
} else if (totalHoursInt >= 9) {
  longTermDiscountRate = 0.10;
} else if (totalHoursInt > 3) {
  longTermDiscountRate = 0.05;
}

// コラボ以外の時間分に長時間パック割引を適用
const nonCollabLongTermDiscount = Math.floor(
  nonCollabTotalPrice * longTermDiscountRate
);

// 写真提供割引の計算
let collaborationDiscount = 0;
if (photographerPlan !== "none" && collaborationType !== "no-collab") {
  const discountRate = getCollaborationDiscountRate(collaborationType);
  collaborationDiscount = Math.floor(
    BASE_RATE_FOR_COLLAB * discountRate * planDuration
  );
  
  // 12時間以上で顔出し無しコラボの場合、写真提供割引を適用しない
  if (totalHoursInt >= 12 && collaborationType === "without-face") {
    collaborationDiscount = 0;
  }
}
```

### パフォーマンス最適化

```tsx
const result = useMemo(() => {
  return calculatePrice(startDate, startTime, endDate, endTime);
}, [startDate, startTime, endDate, endTime]);
```

---

## 🕐 モバイル最適化日時入力UI

モバイルデバイスに最適化された日時入力コンポーネントの実装方法です。

### ポータル機能でz-index問題を解決

#### 1. ポータル用のdivを追加

```tsx
// app/layout.tsx
<body>
  {children}
  <div id="datepicker-portal" />
</body>
```

#### 2. react-datepickerでポータルを使用

```tsx
<DatePicker
  portalId="datepicker-portal"
  popperProps={{
    strategy: "fixed",
  }}
  popperClassName="!z-[99999]"
/>
```

**メリット**:
- 親要素のスタッキングコンテキストの影響を受けない
- カレンダーが常に最前面に表示される
- モバイルでも正しく動作

### モバイルでキーボードを表示しない

```tsx
<DatePicker
  readOnly
  inputProps={{
    readOnly: true,
    inputMode: "none",
  }}
/>
```

### カスタム時間選択モーダル

ネイティブの`select`要素ではなく、カスタムモーダルUIを使用：

```tsx
{isModalOpen && (
  <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4 bg-black/50">
    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
      {/* スクロール可能な選択リスト */}
      <div className="max-h-48 overflow-y-auto">
        {/* 選択肢 */}
      </div>
      {/* 決定ボタン */}
    </div>
  </div>
)}
```

### モーダル表示時のスクロール無効化

```tsx
useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  
  return () => {
    document.body.style.overflow = "";
  };
}, [isModalOpen]);
```

---

## 🎨 再利用可能なUIコンポーネントパターン

### 1. Glassmorphism（すりガラス効果）

```tsx
<div
  className="backdrop-blur-xl rounded-3xl border border-white/20"
  style={{
    backgroundColor: `rgba(255, 255, 255, ${opacity / 100})`,
    WebkitBackdropFilter: `blur(24px)`, // Safari対応
  }}
>
  {children}
</div>
```

**ポイント**:
- `backdrop-filter`で背景をぼかす
- `WebkitBackdropFilter`でSafari対応
- 半透明の背景色で透明度を調整

### 2. インタラクティブな画像回転ギミック

Framer Motionを使った画像回転とクローズアップアニメーション：

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const [currentIndex, setCurrentIndex] = useState(0);
const rotation = currentIndex * 90; // 90度ずつ回転

// 画像を回転・拡大・移動
<motion.div
  animate={{
    rotate: rotation,
    scale: 2.0, // 拡大
    x: "-50%", // 左に移動して特定部分を表示
  }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 15,
  }}
>
  <Image src="/logo.png" alt="Logo" fill />
</motion.div>

// テキストの切り替えアニメーション
<AnimatePresence mode="wait">
  <motion.div
    key={currentIndex}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {texts[currentIndex]}
  </motion.div>
</AnimatePresence>
```

**ポイント**:
- `motion.div`で`rotate`、`scale`、`x`をアニメーション
- `spring`アニメーションで自然な動きを実現
- `AnimatePresence`で要素の切り替え時にアニメーション
- クリックでインデックスを更新して回転角度を変更

### 3. パフォーマンス最適化アニメーション

Canvas APIを使った軽量なアニメーション：

```tsx
// グローバルに状態を保持（再マウント時の再生成を防止）
let globalBalls: Ball[] | null = null;
let isInitialized = false;

// React.memoで再レンダリングを防止
export default memo(ParticleBackground);

// フレームレートを制限（30fps）
let lastTime = 0;
const targetFPS = 30;
const frameInterval = 1000 / targetFPS;

const animate = (currentTime: number) => {
  const elapsed = currentTime - lastTime;
  
  if (elapsed >= frameInterval) {
    // 描画処理
    lastTime = currentTime - (elapsed % frameInterval);
  }
  
  requestAnimationFrame(animate);
};
```

**ポイント**:
- グローバル変数で状態を保持
- `React.memo`で再レンダリングを防止
- フレームレートを制限してパフォーマンス最適化

---

## 🔧 技術的な実装パターン

### 1. z-indexの管理

階層的なz-index管理：

```
z-0: 背景
z-10: メインコンテンツ
z-50: ナビゲーション
z-[99997]: モーダル1
z-[99998]: モーダル2
z-[99999]: ポッパー（カレンダー等）
```

### 2. ポータルパターン

モーダルやポッパーをbody直下にレンダリング：

```tsx
// layout.tsx
<div id="portal-target" />

// コンポーネント内
<Component portalId="portal-target" />
```

**メリット**:
- 親要素のスタッキングコンテキストの影響を受けない
- z-indexの問題を回避
- モバイルでも正しく動作

### 3. SSR対応

クライアント側でのみ動作するコンポーネント：

```tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

return isMounted ? <ClientComponent /> : <Placeholder />;
```

### 4. パフォーマンス最適化

- **メモ化**: `React.memo`、`useMemo`、`useCallback`を適切に使用
- **フレームレート制限**: アニメーションを30fpsに制限
- **グローバル状態**: 再生成を防ぐためにグローバル変数を使用

---

## 📱 モバイル最適化のポイント

### 1. キーボードの制御

```tsx
// キーボードを表示しない
inputProps={{
  readOnly: true,
  inputMode: "none",
}}
```

### 2. スクロールの制御

```tsx
// モーダル表示時にスクロールを無効化
document.body.style.overflow = "hidden";
```

### 3. カスタムUI

ネイティブのselect要素ではなく、カスタムモーダルUIを使用することで、モバイルでの表示を制御。

---

## 🚀 他プロジェクトでの活用方法

### 複数サイト構造の移植

1. `app/`配下に各サイトのディレクトリを作成
2. 各サイトに`layout.tsx`を配置
3. ナビゲーションコンポーネントでサイト切り替えを実装
4. 共通コンポーネントは`components/`で共有

### 料金シミュレーターの移植

1. 計算ロジックを汎用化
2. 料金定数を設定ファイルに分離
3. 時間帯判定ロジックをカスタマイズ
4. UIコンポーネントをスタイル調整

### 時間選択UIの移植

1. `DateTimeInput.tsx`をコピー
2. `layout.tsx`にポータル用divを追加
3. `react-datepicker`と`date-fns`をインストール
4. グローバルCSSに`.react-datepicker-popper`のスタイルを追加

---

## 📚 使用ライブラリ

- **react-datepicker**: 日付選択
- **date-fns**: 日付操作
- **lucide-react**: アイコン
- **framer-motion**: アニメーション（画像回転、テキスト切り替えなど）

---

## 🔗 参考資料

- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [react-datepicker](https://reactdatepicker.com/)
