# 株式会社SOLUNAH ホームページ

株式会社SOLUNAHの公式ホームページ（HP）です。保険外看護サービス「YOURNURSE」を紹介しています。

## 技術スタック

- **Next.js 16** - Reactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS 4** - スタイリング
- **Framer Motion** - アニメーション
- **pnpm** - パッケージマネージャー

## セットアップ

依存関係をインストール:

```bash
pnpm install
```

## 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## プロジェクト構造

```
solunah/
├── app/
│   ├── layout.tsx      # ルートレイアウト
│   ├── page.tsx        # トップページ
│   └── globals.css     # グローバルスタイル
├── components/
│   ├── Navigation.tsx  # ナビゲーション
│   ├── Hero.tsx        # ヒーローセクション
│   ├── About.tsx       # 事業紹介
│   ├── Services.tsx    # サービス内容
│   ├── Company.tsx     # 会社情報
│   ├── Contact.tsx     # お問い合わせ
│   └── Footer.tsx      # フッター
└── public/             # 静的ファイル
```

## ビルド

```bash
pnpm build
```

## 本番環境での起動

```bash
pnpm start
```
