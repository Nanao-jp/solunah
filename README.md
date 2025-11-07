# 株式会社SOLUNAH ホームページ

株式会社SOLUNAHの公式ホームページです。保険外看護サービス「YOUR NURSE」を紹介しています。

## 🎨 プロジェクトの特徴

このプロジェクトは、モダンなWeb技術を活用した高品質なコーポレートサイトです。特に以下の特徴的な実装が含まれています：

- **3つのサイトを内包する構造**: 1つのNext.jsアプリでメインサイト、YOUR NURSE、保険内介護の3サイトを管理
- **料金シミュレーター**: 複雑な時間帯別料金計算と割引ロジックを実装
- **モバイル最適化時間選択UI**: カスタムモーダルでモバイルでの操作性を向上
- **SVGロゴにテキストオーバーレイ**: PNG画像の上にSVGテキストを重ねる実装
- **インタラクティブなロゴ回転ギミック**: クリックで画像が回転し、右側のハートがクローズアップされる仕組み
- **すりガラス（Glassmorphism）効果**: `backdrop-filter`を使ったモダンなUI効果
- **アニメーション背景**: Canvas APIを使った軽量なボールアニメーション（30fps制限）
- **レスポンシブデザイン**: モバイルからデスクトップまで対応

> 📖 **詳細な技術情報**: 実装の詳細や再利用方法については [TECH.md](./TECH.md) を参照してください。

## 🛠 技術スタック

- **Next.js 16** - Reactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS 4** - ユーティリティファーストのCSSフレームワーク
- **Framer Motion** - 高機能なアニメーションライブラリ
- **pnpm** - 高速なパッケージマネージャー

## 📦 セットアップ

### 依存関係のインストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

### ビルド

```bash
pnpm build
```

### 本番環境での起動

```bash
pnpm start
```

## 📁 プロジェクト構造

このプロジェクトは、1つのNext.jsアプリケーション内に3つの独立したサイトを内包する構造になっています。

```
solunah/
├── app/
│   ├── layout.tsx              # ルートレイアウト（全サイト共通）
│   ├── page.tsx                # メインサイト（SOLUNAH）トップページ
│   ├── globals.css             # グローバルスタイル
│   │
│   ├── about/                  # メインサイト：事業紹介
│   ├── company/                # メインサイト：会社情報
│   ├── contact/                # メインサイト：お問い合わせ
│   ├── news/                   # メインサイト：ニュース
│   ├── services/               # メインサイト：サービス
│   │
│   ├── your-nurse/            # YOUR NURSEサイト
│   │   ├── layout.tsx         # YOUR NURSE専用レイアウト
│   │   ├── page.tsx           # YOUR NURSEトップページ
│   │   ├── about/              # YOUR NURSE：概要
│   │   ├── contact/            # YOUR NURSE：お問い合わせ
│   │   ├── features/           # YOUR NURSE：特徴
│   │   ├── pricing/            # YOUR NURSE：料金（料金シミュレーター含む）
│   │   └── services/            # YOUR NURSE：サービス
│   │
│   └── insurance-nursing/      # 保険内介護サイト
│       └── page.tsx
│
├── components/
│   ├── ui/                     # 再利用可能なUIコンポーネント
│   │   ├── PricingSimulator.tsx      # 料金シミュレーター
│   │   ├── DateTimeInput.tsx          # 日時入力（モバイル最適化）
│   │   ├── RegularContractModal.tsx   # 定期契約モーダル
│   │   ├── LongTermPackTable.tsx      # 長時間パック料金表
│   │   ├── PricingCard.tsx            # 料金カード
│   │   ├── CaseStudyCard.tsx          # 事例カード
│   │   ├── Glassmorphism.tsx          # すりガラス効果
│   │   ├── ParticleBackground.tsx     # ボールアニメーション背景
│   │   ├── AnimatedBackground.tsx     # アニメーション背景
│   │   ├── YourNurseLogoWithText.tsx  # SVGロゴ＋テキストオーバーレイ
│   │   └── InteractiveYourNurseLogoSimple.tsx  # インタラクティブロゴ
│   │
│   ├── Navigation.tsx          # メインサイトナビゲーション
│   ├── YourNurseNavigation.tsx  # YOUR NURSE専用ナビゲーション
│   ├── Hero.tsx                # ヒーローセクション
│   ├── Footer.tsx              # フッター
│   └── ...                     # その他のコンポーネント
│
├── data/                       # データファイル
│   ├── features.ts
│   ├── news.ts
│   └── services.ts
│
└── public/                     # 静的ファイル
    ├── your-nurse-logo.png
    └── your-nurse-logo2.png
```

### サイト構造の特徴

- **メインサイト** (`/`): コーポレートサイト
- **YOUR NURSE** (`/your-nurse`): 保険外看護サービス専用サイト（独自レイアウト）
- **保険内介護** (`/insurance-nursing`): 保険内介護サービスサイト

各サイトは独立したナビゲーションを持ちながら、共通コンポーネントを共有しています。

詳細は [TECH.md](./TECH.md#-プロジェクト構造3つのサイトを内包するアーキテクチャ) を参照してください。

## 🎯 主要な実装の詳細

### 1. SVGロゴにテキストオーバーレイ

**ファイル**: `components/ui/YourNurseLogoWithText.tsx`

PNG画像の上にSVGテキストを重ねる実装方法です。この方法により、テキストをDOM要素として扱えるため、SEOやアクセシビリティに優れ、多言語対応も容易です。

#### 実装のポイント

```tsx
// SVGのviewBoxで画像サイズに合わせる
<svg viewBox={`0 0 ${imageWidth} ${imageHeight}`}>
  {/* PNG画像を埋め込み */}
  <image href="/your-nurse-logo.png" width={imageWidth} height={imageHeight} />
  
  {/* SVGテキストを重ねる */}
  <text x={x} y={y} textAnchor="middle">
    {text}
  </text>
</svg>
```

#### メリット

- **レスポンシブ対応**: `viewBox`と`preserveAspectRatio`で自動スケーリング
- **テキストの柔軟性**: DOM要素なので、CSSやJavaScriptで制御可能
- **SEO対応**: テキストが検索エンジンに認識される
- **アクセシビリティ**: スクリーンリーダーで読み上げ可能

#### 多行テキストの実装

```tsx
<text x={x} y={y}>
  <tspan x={x} dy={0}>{line1}</tspan>
  <tspan x={x} dy={lineHeight}>{line2}</tspan>
</text>
```

#### テキスト装飾（シャドウ）

```tsx
<defs>
  <filter id="text-shadow">
    <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(255,255,255,0.9)" />
    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(249,115,22,0.2)" />
  </filter>
</defs>
<text filter="url(#text-shadow)">テキスト</text>
```

### 2. インタラクティブなロゴ回転ギミック

**ファイル**: `components/ui/InteractiveYourNurseLogoSimple.tsx`

クリックで画像が90度回転し、右側のハートがクローズアップされるインタラクティブな実装です。

#### 実装のポイント

```tsx
// 状態管理
const [currentIndex, setCurrentIndex] = useState(1);
const rotation = currentIndex * 90; // 0度, 90度, 180度, 270度

// 画像を回転させ、左に移動して右側をクローズアップ
<motion.div
  animate={{
    rotate: rotation,
    scale: 2.0,        // 拡大
    x: "-50%",         // 左に移動
  }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 15,
  }}
>
  <Image src="/your-nurse-logo.png" fill className="object-cover" />
</motion.div>
```

#### 正方形コンテナの実装

```tsx
<div className="relative w-full aspect-square">
  {/* 画像を回転・拡大・移動 */}
</div>
```

#### テキストオーバーレイ

```tsx
{/* 画像の上にテキストを表示 */}
<AnimatePresence mode="wait">
  <motion.div
    key={currentIndex}
    className="absolute inset-0 flex items-center justify-center z-10"
  >
    <h2>{heartTexts[currentIndex]}</h2>
  </motion.div>
</AnimatePresence>
```

#### 実装のコツ

- **`aspect-square`**: Tailwind CSSのクラスで正方形を確実に作成
- **`object-cover`**: 画像がコンテナを埋めるように調整
- **`transform: translateX()`**: 画像を左に移動して右側を表示
- **`scale`と`x`の組み合わせ**: 拡大と移動でクローズアップ効果

### 3. すりガラス（Glassmorphism）効果

**ファイル**: `components/ui/Glassmorphism.tsx`

`backdrop-filter`を使ったモダンなすりガラス効果の実装です。

#### 実装のポイント

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

#### 重要なポイント

1. **`backdrop-filter`**: 背景をぼかすCSSプロパティ
2. **`WebkitBackdropFilter`**: Safari対応のためのプレフィックス
3. **半透明の背景色**: `rgba(255, 255, 255, 0.4)`などで透明度を調整
4. **境界線**: `border-white/20`で微細な境界線を追加
5. **z-indexの管理**: 背景の上に配置するため、適切なz-indexを設定

#### 使用例

```tsx
<section className="relative">
  <AnimatedBackground /> {/* 背景アニメーション */}
  <div className="relative z-10">
    <Glassmorphism blur="2xl" opacity={60} hoverOpacity={70} />
    <div className="relative z-10">
      {/* コンテンツ */}
    </div>
  </div>
</section>
```

#### 注意点

- **背景が必要**: `backdrop-filter`は背景をぼかすため、背景要素が必要
- **パフォーマンス**: 大きな要素に適用するとパフォーマンスに影響する可能性
- **ブラウザ対応**: 古いブラウザでは動作しないため、フォールバックを検討

### 4. アニメーション背景

**ファイル**: `components/ui/AnimatedBackground.tsx`

CSSアニメーションを使った動的な背景エフェクトです。

#### 実装のポイント

```tsx
<div className="absolute inset-0 overflow-hidden">
  {/* 大きなぼかし円を配置 */}
  <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/50 to-indigo-600/50 blur-[120px] moon-glow" />
  <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/60 to-yellow-500/60 blur-[140px] sun-glow" />
</div>
```

#### CSSアニメーション

```css
@keyframes float-moon {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
  20% {
    transform: translate(150px, -100px) scale(1.4);
    opacity: 0.6;
  }
  /* ... */
}

.moon-glow {
  animation: float-moon 20s ease-in-out infinite;
}
```

#### 実装のコツ

- **大きなぼかし**: `blur-[120px]`など大きな値で柔らかい光の効果
- **グラデーション**: `bg-gradient-to-br`で自然な色の変化
- **透明度**: `/50`や`/60`で適度な透明度を設定
- **無限アニメーション**: `infinite`で繰り返し
- **緩急のある動き**: `ease-in-out`で自然な動き

### 5. レスポンシブフォントサイズ

`clamp()`関数を使ったレスポンシブなフォントサイズの実装です。

```css
font-size: clamp(36px, 5vw, 48px);
```

- **最小値**: 36px（モバイルでも読みやすい）
- **推奨値**: 5vw（ビューポート幅に応じて変化）
- **最大値**: 48px（デスクトップで大きくなりすぎない）

## 🔧 他プロジェクトでも使える実装パターン

### パターン1: 3サイト構造のアーキテクチャ

1つのNext.jsアプリで複数の独立したサイトを管理するパターン。

**メリット**:
- コードの再利用性が高い
- 統一されたデザインシステム
- SEO最適化が容易
- メンテナンス性が高い

**使用例**:
- 複数のブランドサイト
- 多言語サイト
- サブブランドサイト

詳細は [TECH.md](./TECH.md#-プロジェクト構造3つのサイトを内包するアーキテクチャ) を参照。

### パターン2: 料金シミュレーター

複雑な料金計算ロジックを持つ再利用可能なコンポーネント。

**特徴**:
- 時間帯別料金計算
- 割引ロジック
- オプション料金の追加
- リアルタイム計算

**使用例**:
- レンタルサービス
- 宿泊施設
- レッスン・サービス

詳細は [TECH.md](./TECH.md#-料金シミュレーター-pricingsimulator) を参照。

### パターン3: モバイル最適化時間選択UI

モバイルデバイスに最適化された日時入力コンポーネント。

**特徴**:
- ポータル機能でz-index問題を解決
- モバイルでキーボードを表示しない
- カスタムモーダルUI
- スクロール制御

**使用例**:
- 予約システム
- イベント管理
- フォーム入力

詳細は [TECH.md](./TECH.md#-時間選択ui-datetimeinput) を参照。

### パターン4: SVGテキストオーバーレイ

既存のPNG画像にテキストを追加したい場合に使用できます。

**メリット**:
- 画像を再生成する必要がない
- テキストを動的に変更可能
- SEO・アクセシビリティに優れる

**使用例**:
- ロゴに多言語テキストを追加
- 画像に動的な情報を表示
- アクセシビリティの向上

### パターン5: インタラクティブな画像回転

画像を回転させて異なる部分を表示するギミック。

**メリット**:
- ユーザーエンゲージメントの向上
- 限られたスペースで多くの情報を表示
- 視覚的に魅力的

**使用例**:
- 商品の360度ビュー
- 複数の特徴を順番に表示
- インタラクティブなギャラリー

### パターン6: Glassmorphism UI

モダンなUIデザインの実装。

**メリット**:
- 視覚的に魅力的
- コンテンツの階層を明確に
- モダンな印象

**使用例**:
- カードUI
- モーダルダイアログ
- ナビゲーションメニュー

### パターン7: パフォーマンス最適化アニメーション

Canvas APIを使った軽量なアニメーション。

**特徴**:
- 30fpsに制限してパフォーマンス最適化
- 再マウント時の再生成を防止
- グローバル状態で管理

詳細は [TECH.md](./TECH.md#-再利用可能なuiコンポーネント) を参照。

## 📝 ベストプラクティス

### パフォーマンス

- **画像最適化**: Next.jsの`Image`コンポーネントを使用
- **アニメーション**: `will-change`プロパティでGPU加速を有効化
- **レイジーローディング**: 必要に応じてコンポーネントを遅延読み込み

### アクセシビリティ

- **セマンティックHTML**: 適切なHTMLタグを使用
- **キーボード操作**: インタラクティブ要素はキーボードで操作可能に
- **スクリーンリーダー**: `aria-label`などで適切な説明を追加

### コード品質

- **TypeScript**: 型安全性を確保
- **コンポーネント分割**: 再利用可能なコンポーネントを作成
- **定数の管理**: マジックナンバーは定数として定義

## 📄 ライセンス

このプロジェクトは株式会社SOLUNAHの所有物です。

## 🤝 貢献

このプロジェクトへの貢献は現在受け付けていません。

## 📧 お問い合わせ

株式会社SOLUNAH
- ウェブサイト: [https://solunah.com](https://solunah.com)
- お問い合わせ: [お問い合わせページ](/contact)
