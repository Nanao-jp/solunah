# ニュース更新Webアプリのアーキテクチャ設計

## 🤔 設計の選択肢

### 選択肢1: 同じプロジェクト内、別URLでデプロイ（推奨）

**構造**:
```
solunah/ (リポジトリ)
├── app/
│   ├── (public)/          # 公開サイト
│   │   └── ...
│   └── admin/            # 管理画面（同じプロジェクト内）
│       └── ...
└── ...
```

**デプロイ**:
- **公開サイト**: `solunah.com` にデプロイ
- **管理画面**: `admin.solunah.com` または `manage.solunah.com` に別デプロイ

**実装方法**:
- Next.jsのミドルウェアで`/admin`へのアクセスを制限
- 環境変数で管理画面の有効/無効を制御
- Vercelの場合、別プロジェクトとしてデプロイ（同じリポジトリ参照）

**メリット**:
- ✅ コードが一箇所で管理しやすい
- ✅ API routesを共有できる
- ✅ 型定義を共有できる
- ✅ デプロイ先を分離できる（セキュリティ向上）
- ✅ 同じデータソースを使用

**デメリット**:
- ⚠️ デプロイ設定が少し複雑

---

### 選択肢2: 完全に別プロジェクト

**構造**:
```
solunah/ (公開サイト)
└── ...

solunah-admin/ (管理画面、別リポジトリ)
└── ...
```

**デプロイ**:
- **公開サイト**: `solunah.com`
- **管理画面**: `admin.solunah.com` (別リポジトリ)

**メリット**:
- ✅ 完全に分離（セキュリティが高い）
- ✅ 権限管理が明確
- ✅ デプロイが独立

**デメリット**:
- ❌ コードの重複（型定義、APIロジックなど）
- ❌ 管理が2箇所
- ❌ 変更の同期が大変

---

### 選択肢3: 同じプロジェクト、同じURL（非推奨）

**構造**:
```
solunah/
├── app/
│   ├── (public)/
│   └── admin/  # 同じURL内
```

**デプロイ**:
- **公開サイト**: `solunah.com`
- **管理画面**: `solunah.com/admin` (同じURL)

**メリット**:
- ✅ シンプル

**デメリット**:
- ❌ セキュリティリスクが高い
- ❌ 公開サイトと管理画面が同じドメイン
- ❌ セッション管理が複雑

---

## 🎯 推奨: 選択肢1（同じプロジェクト、別URL）

### 理由

1. **セキュリティ**: 管理画面を別URLでデプロイすることで、公開サイトとは分離
2. **保守性**: コードは一箇所で管理、API routesを共有
3. **柔軟性**: 将来的に管理画面だけを別の技術スタックに移行することも可能

---

## 📁 推奨ディレクトリ構造

```
solunah/
├── app/
│   ├── (public)/              # 公開サイト（ルートグループ）
│   │   ├── page.tsx          # solunah.com/
│   │   ├── news/             # solunah.com/news
│   │   ├── your-nurse/       # solunah.com/your-nurse
│   │   └── ...
│   │
│   ├── admin/                # 管理画面
│   │   ├── layout.tsx        # 管理画面用レイアウト
│   │   ├── page.tsx          # admin.solunah.com/
│   │   ├── login/            # admin.solunah.com/login
│   │   └── news/             # admin.solunah.com/news
│   │       ├── page.tsx      # 一覧
│   │       ├── new/          # 新規作成
│   │       └── [id]/         # 編集
│   │
│   └── api/                  # API Routes（共有）
│       └── news/
│           └── route.ts
│
├── middleware.ts             # アクセス制御（新規）
├── lib/
│   └── auth/                 # 認証ロジック
└── ...
```

---

## 🔒 セキュリティ対策

### 1. ミドルウェアでアクセス制御

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin へのアクセスを制限
  if (pathname.startsWith('/admin')) {
    // 認証チェック
    const session = request.cookies.get('session');
    
    if (!session && !pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

### 2. 環境変数で制御

```env
# .env.local
ADMIN_ENABLED=true
ADMIN_URL=https://admin.solunah.com
PUBLIC_URL=https://solunah.com
```

### 3. 本番環境でのみ管理画面を有効化

```typescript
// app/admin/layout.tsx
export default function AdminLayout({ children }) {
  // 開発環境または特定の環境でのみ表示
  if (process.env.NODE_ENV === 'production' && !process.env.ADMIN_ENABLED) {
    return <div>Access Denied</div>;
  }
  
  return <>{children}</>;
}
```

---

## 🚀 デプロイ設定（Vercelの場合）

### 方法1: 別プロジェクトとしてデプロイ（推奨）

1. **公開サイト用プロジェクト**
   - リポジトリ: `solunah`
   - ルート: `/app/(public)/**`
   - URL: `solunah.com`

2. **管理画面用プロジェクト**
   - リポジトリ: `solunah` (同じ)
   - ルート: `/app/admin/**`
   - URL: `admin.solunah.com`
   - 環境変数: `ADMIN_ENABLED=true`

**設定方法**:
- Vercelで2つのプロジェクトを作成
- 同じリポジトリを参照
- それぞれ異なるルートと環境変数を設定

### 方法2: モノレポ + サブディレクトリ

```
solunah/
├── apps/
│   ├── public/          # 公開サイト
│   └── admin/           # 管理画面
└── packages/            # 共有パッケージ
    └── api/
```

**デメリット**: 構造が複雑になる

---

## 📝 実装のステップ

### ステップ1: 構造の準備（影響なし）

1. `app/admin/`ディレクトリを作成
2. `middleware.ts`を作成（アクセス制御）
3. 環境変数の設定

### ステップ2: 認証機能の実装

1. ログイン機能
2. セッション管理
3. 認証ミドルウェア

### ステップ3: 管理画面の実装

1. ニュース一覧
2. 作成・編集・削除
3. プレビュー機能

### ステップ4: デプロイ設定

1. Vercelで2つのプロジェクトを作成
2. ルートと環境変数を設定
3. 動作確認

---

## ✅ チェックリスト

### セキュリティ
- [ ] 管理画面へのアクセス制限
- [ ] 認証機能の実装
- [ ] セッション管理
- [ ] CSRF対策
- [ ] レート制限（必要に応じて）

### デプロイ
- [ ] 公開サイトのデプロイ設定
- [ ] 管理画面のデプロイ設定（別URL）
- [ ] 環境変数の設定
- [ ] ドメイン設定

### 機能
- [ ] ニュース一覧表示
- [ ] ニュース作成
- [ ] ニュース編集
- [ ] ニュース削除
- [ ] プレビュー機能

---

## 🎯 結論

**推奨アプローチ**: 
- ✅ 同じプロジェクト内に`/admin`を作成
- ✅ 別URL（`admin.solunah.com`）でデプロイ
- ✅ ミドルウェアでアクセス制御
- ✅ API routesは共有

これにより、**コードは一箇所で管理しつつ、セキュリティも確保**できます。

---

最終更新: 2024年（現在の日付）

