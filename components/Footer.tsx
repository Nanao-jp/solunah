import { Home, Info, Briefcase, Building2, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-slate-900 py-12 border-t border-slate-200/50 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">
              SOLUNA
            </h3>
            <p className="text-slate-600">
              新しい看護の形を、あなたに
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-900">リンク</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link href="/" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                  <Home className="w-4 h-4" />
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                  <Info className="w-4 h-4" />
                  事業紹介
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                  <Briefcase className="w-4 h-4" />
                  サービス
                </Link>
              </li>
              <li>
                <Link href="/company" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                  <Building2 className="w-4 h-4" />
                  会社情報
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              お問い合わせ
            </h4>
            <p className="text-slate-600 mb-2">株式会社SOLUNA</p>
            <p className="text-slate-600">
              保険外看護サービス「YOURNURSE」
            </p>
          </div>
        </div>
        <div className="border-t border-slate-200/50 pt-8 text-center text-slate-600">
          <p>&copy; {new Date().getFullYear()} 株式会社SOLUNA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

