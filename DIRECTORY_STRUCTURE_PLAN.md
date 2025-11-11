# ディレクトリ構造計画

## 📋 現状の構造

```
solunah/
├── app/
│   ├── page.tsx                    # SOLUNAH トップ
│   ├── about/                      # SOLUNAH 会社概要
│   ├── services/                   # SOLUNAH サービス
│   ├── company/                    # SOLUNAH 会社情報
│   ├── contact/                    # SOLUNAH お問い合わせ
│   ├── news/                       # SOLUNAH お知らせ
│   ├── your-nurse/                 # YOUR NURSE サイト
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── contact/
│   │   └── about/
│   ├── insurance-nursing/          # 保険内サービス（準備中）
│   └── layout.tsx                  # ルートレイアウト
├── components/                     # コンポーネント
├── data/                          # データ（現在はハードコード）
│   └── news.ts
└── ...
```

## 🎯 将来の拡張に対応した構造（提案）

### 基本方針
1. **現在の構造を維持** - 3つのサイトは`app/`配下で独立
2. **管理画面を追加** - `/admin`で管理機能を提供
3. **API routesを追加** - `/api`でデータ操作を提供
4. **データ層を整理** - 将来的にDB連携しやすい構造に

### 提案する新しい構造

```
solunah/
├── app/
│   ├── (public)/                   # 公開サイト（ルートグループ）
│   │   ├── page.tsx                # SOLUNAH トップ
│   │   ├── about/
│   │   ├── services/
│   │   ├── company/
│   │   ├── contact/
│   │   ├── news/                   # SOLUNAH お知らせ
│   │   ├── your-nurse/             # YOUR NURSE サイト
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── ...
│   │   └── insurance-nursing/       # 保険内サービス
│   │
│   ├── admin/                      # 管理画面（新規）
│   │   ├── layout.tsx              # 管理画面用レイアウト
│   │   ├── page.tsx                # 管理画面トップ
│   │   ├── login/                  # ログイン
│   │   ├── news/                   # ニュース管理
│   │   │   ├── page.tsx            # ニュース一覧
│   │   │   ├── new/                # 新規作成
│   │   │   └── [id]/               # 編集
│   │   │       └── page.tsx
│   │   └── dashboard/              # ダッシュボード
│   │
│   ├── api/                        # API Routes（新規）
│   │   ├── auth/                   # 認証API
│   │   │   └── route.ts
│   │   ├── news/                   # ニュースAPI
│   │   │   ├── route.ts            # GET, POST（一覧、作成）
│   │   │   └── [id]/
│   │   │       └── route.ts        # GET, PUT, DELETE（個別操作）
│   │   └── ...
│   │
│   └── layout.tsx                  # ルートレイアウト
│
├── components/
│   ├── admin/                      # 管理画面用コンポーネント（新規）
│   │   ├── AdminLayout.tsx
│   │   ├── NewsEditor.tsx
│   │   ├── NewsList.tsx
│   │   └── ...
│   ├── ui/                        # UIコンポーネント
│   └── ...                        # 既存コンポーネント
│
├── lib/                           # ライブラリ・ユーティリティ（新規）
│   ├── db/                        # データベース関連
│   │   ├── client.ts              # DB接続
│   │   └── schema.ts              # スキーマ定義
│   ├── auth/                      # 認証関連
│   │   └── ...
│   └── utils/                     # ユーティリティ
│       └── ...
│
├── types/                         # TypeScript型定義（新規）
│   ├── news.ts
│   ├── admin.ts
│   └── ...
│
├── data/                          # データ（段階的に移行）
│   └── news.ts                    # 一時的に残す（DB移行まで）
│
└── ...
```

## 🔄 移行計画

### フェーズ1: 構造の準備（影響なし）
1. **ルートグループの導入**（オプション）
   - `app/(public)/`を作成して公開サイトをグループ化
   - または現状維持（影響なし）

2. **API routesの準備**
   - `app/api/news/route.ts`を作成
   - 現在は`data/news.ts`を読み込むだけ
   - 将来的にDB連携に変更可能

3. **管理画面の骨組み作成**
   - `app/admin/`ディレクトリ作成
   - 基本的なレイアウトのみ
   - 認証機能は後で追加

### フェーズ2: データ層の整理
1. **型定義の整理**
   - `types/news.ts`に型定義を移動
   - `data/news.ts`は型定義をインポート

2. **API routesの実装**
   - CRUD操作の実装
   - 現在はファイルベース、将来的にDB連携

### フェーズ3: 管理画面の実装
1. **認証機能**
   - ログイン機能の実装
   - セッション管理

2. **ニュース管理機能**
   - 一覧表示
   - 作成・編集・削除
   - プレビュー機能

## 📝 詳細な構造説明

### 1. ルートグループ `(public)`

Next.jsのルートグループ機能を使用。URLには影響しないが、レイアウトやロジックを整理できる。

**メリット**:
- 公開サイトと管理画面を明確に分離
- レイアウトの共有が容易
- 将来的な拡張が容易

**注意**: ルートグループを使わなくても問題ない。現状維持も可能。

### 2. 管理画面 `/admin`

**機能**:
- ニュースの作成・編集・削除
- ダッシュボード（統計情報など）
- 設定管理（将来的に）

**認証**:
- ログイン必須
- セッション管理
- 権限管理（将来的に）

### 3. API Routes `/api`

**エンドポイント例**:
- `GET /api/news` - ニュース一覧取得
- `POST /api/news` - ニュース作成
- `GET /api/news/[id]` - 個別ニュース取得
- `PUT /api/news/[id]` - ニュース更新
- `DELETE /api/news/[id]` - ニュース削除

**現在**: `data/news.ts`を読み込む
**将来**: データベース（PostgreSQL、MongoDB等）に接続

### 4. データ層の整理

**現在**:
```typescript
// data/news.ts
export const allNewsItems: NewsItem[] = [...]
```

**将来**:
```typescript
// lib/db/schema.ts
export const newsSchema = z.object({...})

// lib/db/client.ts
export async function getNews() {
  // DBから取得
}
```

## ✅ 推奨される実装順序

### ステップ1: 影響のない準備（すぐに実施可能）
- [ ] `app/api/news/route.ts`を作成（現在は`data/news.ts`を読み込むだけ）
- [ ] `types/news.ts`を作成して型定義を移動
- [ ] `app/admin/`ディレクトリを作成（空のページのみ）

### ステップ2: API routesの実装
- [ ] CRUD操作の実装
- [ ] エラーハンドリング
- [ ] バリデーション

### ステップ3: 管理画面の実装
- [ ] 認証機能
- [ ] ニュース管理UI
- [ ] プレビュー機能

### ステップ4: データベース連携（将来）
- [ ] DBスキーマの定義
- [ ] ORMの導入（Prisma、Drizzle等）
- [ ] マイグレーション

## 🚨 注意事項

1. **ルートグループはオプション**
   - 使わなくても問題ない
   - 現状維持も可能

2. **段階的な移行**
   - 一度にすべてを変更しない
   - 既存機能を壊さないように注意

3. **データの移行**
   - `data/news.ts`は一時的に残す
   - DB移行時に段階的に移行

4. **認証の実装**
   - NextAuth.js、Clerk、独自実装など選択肢あり
   - 要件に応じて選択

## 🎯 現在の構造で問題ない点

- ✅ 3つのサイトが独立している
- ✅ レイアウトが分離されている
- ✅ コンポーネントが整理されている

## 🔧 改善すべき点

- ⚠️ ニュースデータがハードコードされている
- ⚠️ 管理画面がない
- ⚠️ API routesがない

## 📅 実装タイムライン（目安）

- **ステップ1**: 1-2日（影響なし）
- **ステップ2**: 1週間
- **ステップ3**: 2-3週間
- **ステップ4**: 将来（DB選定後）

---

最終更新: 2024年（現在の日付）

