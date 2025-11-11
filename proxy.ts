/**
 * Next.js Proxy
 * 管理画面へのアクセス制御（将来的に認証機能を追加予定）
 * 
 * Next.js 16では middleware.ts が非推奨となり、proxy.ts に変更されました
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 管理画面へのアクセス制御
  if (pathname.startsWith("/admin")) {
    // 環境変数で管理画面の有効/無効を制御
    // 環境変数が設定されていない場合はデフォルトで無効
    const isAdminEnabled = process.env.ADMIN_ENABLED === "true";
    const isAdminMode = process.env.NEXT_PUBLIC_SITE_MODE === "admin";

    // 管理画面が無効な場合はアクセス拒否
    // 環境変数が未設定の場合は安全のため無効
    if (!isAdminEnabled && !isAdminMode) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ログインページ以外へのアクセス時に認証チェック（将来的に実装）
    // if (!pathname.startsWith("/admin/login")) {
    //   const session = request.cookies.get("session");
    //   if (!session) {
    //     return NextResponse.redirect(new URL("/admin/login", request.url));
    //   }
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 以下のパスにマッチ:
     * - /admin (管理画面全体)
     * - /api/admin (管理画面用API)
     */
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};

