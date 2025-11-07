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

### 割引ロジックの実装

```tsx
// 条件に応じた割引適用
let discount = 0;

if (totalHours >= discountThreshold) {
  discount = Math.floor(basePrice * discountRate);
}

const totalPrice = Math.floor(basePrice - discount);
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
