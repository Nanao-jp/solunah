/**
 * ニュース管理ページ
 * 将来的にニュースの一覧表示・作成・編集・削除機能を実装予定
 */

export default function AdminNewsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-light text-slate-900">ニュース管理</h1>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          新規作成
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-slate-600">
          ニュース管理機能は準備中です。
        </p>
      </div>
    </div>
  );
}

