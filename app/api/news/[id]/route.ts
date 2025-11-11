/**
 * ニュース個別操作API Routes
 * GET: 個別ニュース取得
 * PUT: ニュース更新（将来的に実装）
 * DELETE: ニュース削除（将来的に実装）
 */

import { NextResponse } from "next/server";
import { allNewsItems } from "@/data/news";

// GET: 個別ニュース取得
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id) || id < 0 || id >= allNewsItems.length) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }

    const news = allNewsItems[id];

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

// PUT: ニュース更新（将来的に実装）
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 認証チェック（将来的に実装）
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { id } = await params;
    const body = await request.json();

    // データベースで更新（将来的に実装）
    // const news = await updateNews(id, body);

    return NextResponse.json(
      { message: "News update is not implemented yet" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

// DELETE: ニュース削除（将来的に実装）
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 認証チェック（将来的に実装）
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { id } = await params;

    // データベースで削除（将来的に実装）
    // await deleteNews(id);

    return NextResponse.json(
      { message: "News deletion is not implemented yet" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}

