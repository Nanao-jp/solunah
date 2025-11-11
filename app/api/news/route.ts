/**
 * ニュースAPI Routes
 * GET: ニュース一覧取得
 * POST: ニュース作成（将来的に実装）
 * 
 * 現在は data/news.ts から読み込む
 * 将来的にデータベースに接続予定
 */

import { NextResponse } from "next/server";
import { allNewsItems } from "@/data/news";
import type { NewsItem } from "@/types/news";

// GET: ニュース一覧取得
export async function GET() {
  try {
    // 現在は data/news.ts から読み込む
    // 将来的にデータベースから取得するように変更
    const news = allNewsItems;

    return NextResponse.json(news, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

// POST: ニュース作成（将来的に実装）
export async function POST(request: Request) {
  try {
    // 認証チェック（将来的に実装）
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body: NewsItem = await request.json();

    // バリデーション（将来的に実装）
    // const validated = validateNewsItem(body);

    // データベースに保存（将来的に実装）
    // const news = await createNews(validated);

    return NextResponse.json(
      { message: "News creation is not implemented yet" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}

