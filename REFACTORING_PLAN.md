# リファクタリング計画

## 現在の状態

### ✅ 完了済み
- ライトテーマへの変更
- TOPページのセクションコンポーネント化（FeaturesSection, ServicesSection, NewsSection, CTASection）
- フォントデザインの統一（font-light, tracking-wide）
- セクション区切りの統一
- ボーダーの統一（オレンジ系）
- ボタンの統一

### 📋 確認が必要な項目

#### 1. フォントスタイルの統一状況
- ✅ Navigation: 統一済み
- ✅ Hero: 統一済み
- ✅ SectionTitle: 統一済み
- ✅ FeaturesSection: 統一済み
- ✅ ServicesSection: 統一済み
- ✅ NewsSection: 統一済み
- ✅ CTASection: 統一済み
- ✅ About: 統一済み
- ✅ Services: 統一済み
- ✅ Company: 統一済み
- ✅ News: 統一済み
- ✅ Footer: 統一済み
- ⚠️ Contact: ラベルのフォントスタイル（font-mediumは維持でOK）

#### 2. コンポーネント構造
```
app/
├── page.tsx (TOP) - ✅ コンポーネント化済み
├── about/page.tsx - Aboutコンポーネント使用
├── services/page.tsx - Servicesコンポーネント使用
├── news/page.tsx - Newsコンポーネント使用
├── company/page.tsx - Companyコンポーネント使用
└── contact/page.tsx - Contactコンポーネント使用

components/
├── FeaturesSection.tsx - TOP用
├── ServicesSection.tsx - TOP用
├── NewsSection.tsx - TOP用（最大3件）
├── CTASection.tsx - TOP用
├── About.tsx - Aboutページ用
├── Services.tsx - Servicesページ用
├── News.tsx - Newsページ用（全件表示）
├── Company.tsx - Companyページ用
└── Contact.tsx - Contactページ用
```

#### 3. データの重複
- NewsSectionとNewsコンポーネントでニュースデータが重複
- FeaturesSectionとAboutコンポーネントで特徴データが重複
- ServicesSectionとServicesコンポーネントでサービスデータが重複

## リファクタリング提案

### 優先度: 高

1. **データの一元管理**
   - `data/`ディレクトリを作成
   - `data/news.ts` - ニュースデータ
   - `data/features.ts` - 特徴データ
   - `data/services.ts` - サービスデータ
   - 各コンポーネントでインポートして使用

2. **共通コンポーネントの抽出**
   - `components/ui/NewsItem.tsx` - ニュースアイテム表示用
   - `components/ui/FeatureCard.tsx` - 特徴カード用
   - `components/ui/ServiceCard.tsx` - サービスカード用

### 優先度: 中

3. **スタイルの統一確認**
   - すべてのコンポーネントで`font-light`と`tracking-wide`が適用されているか確認
   - カラー（text-slate-600など）の統一確認

4. **型定義の追加**
   - `types/`ディレクトリを作成
   - News, Feature, Serviceなどの型定義

### 優先度: 低

5. **パフォーマンス最適化**
   - 画像の最適化
   - コード分割の検討

6. **アクセシビリティ**
   - ARIA属性の追加
   - キーボードナビゲーションの改善

## 次のステップ

1. データの一元管理を実装
2. 共通コンポーネントの抽出
3. 型定義の追加
4. 最終的なスタイル統一の確認

