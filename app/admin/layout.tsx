/**
 * 管理画面用レイアウト
 * 将来的に認証機能を追加予定
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 環境変数で管理画面の有効/無効を制御
  // 環境変数が設定されていない場合はデフォルトで無効
  const isAdminEnabled = process.env.ADMIN_ENABLED === "true";
  const isAdminMode = process.env.NEXT_PUBLIC_SITE_MODE === "admin";

  // 管理画面モードでない場合はアクセス拒否
  // 環境変数が未設定の場合は安全のため無効
  if (!isAdminEnabled && !isAdminMode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-slate-900 mb-4">
            アクセスが拒否されました
          </h1>
          <p className="text-slate-600">
            管理画面は現在利用できません。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-light text-slate-900">管理画面</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

