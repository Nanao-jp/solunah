"use client";

import { useState } from "react";

interface LongTermPackRow {
  hours: number;
  original: number;
  pack: number | null;
  discount: number | null;
}

const LONG_TERM_PACK_DATA: LongTermPackRow[] = [
  { hours: 1, original: 8800, pack: null, discount: null },
  { hours: 2, original: 17600, pack: null, discount: null },
  { hours: 3, original: 26400, pack: 25000, discount: 1400 },
  { hours: 4, original: 35200, pack: 33800, discount: 1400 },
  { hours: 5, original: 44000, pack: 41000, discount: 3000 },
  { hours: 6, original: 52800, pack: 49800, discount: 3000 },
  { hours: 7, original: 61600, pack: 57000, discount: 4600 },
  { hours: 8, original: 70400, pack: 65800, discount: 4600 },
  { hours: 9, original: 79200, pack: 74600, discount: 4600 },
  { hours: 10, original: 88000, pack: 81000, discount: 7000 },
  { hours: 11, original: 96800, pack: 89800, discount: 7000 },
  { hours: 12, original: 105600, pack: 89760, discount: 15840 },
];

export default function LongTermPackTable() {
  const [mobileTab, setMobileTab] = useState<"original" | "pack">("original");

  return (
    <div className="relative">
      {/* モバイル用タブ */}
      <div className="md:hidden mb-6">
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setMobileTab("original")}
            className={`flex-1 py-3 text-sm font-light transition-colors ${
              mobileTab === "original"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            本来の料金
          </button>
          <button
            onClick={() => setMobileTab("pack")}
            className={`flex-1 py-3 text-sm font-light transition-colors ${
              mobileTab === "pack"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            長時間パック
          </button>
        </div>
      </div>

      {/* デスクトップ用テーブル */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-4 px-6 font-light text-slate-900 whitespace-nowrap">時間</th>
              <th className="py-4 px-6 font-light text-slate-900 whitespace-nowrap">本来の料金</th>
              <th className="py-4 px-6 font-light text-slate-900 whitespace-nowrap">長時間パック</th>
              <th className="py-4 px-6 font-light text-slate-900 whitespace-nowrap">値引き分</th>
            </tr>
          </thead>
          <tbody>
            {LONG_TERM_PACK_DATA.map((row, index) => (
              <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-light text-slate-900 whitespace-nowrap">{row.hours}時間</td>
                <td className="py-4 px-6 font-light text-slate-600 whitespace-nowrap">¥{row.original.toLocaleString()}</td>
                <td className="py-4 px-6 font-light text-slate-900 whitespace-nowrap">
                  {row.pack ? `¥${row.pack.toLocaleString()}` : "-"}
                </td>
                <td className="py-4 px-6 font-light text-orange-600 whitespace-nowrap">
                  {row.discount ? `¥${row.discount.toLocaleString()}` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* モバイル用テーブル */}
      <div className="md:hidden">
        {mobileTab === "original" ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 font-light text-slate-900">時間</th>
                <th className="py-3 px-4 font-light text-slate-900 text-right">本来の料金</th>
              </tr>
            </thead>
            <tbody>
              {LONG_TERM_PACK_DATA.map((row, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-3 px-4 font-light text-slate-900">{row.hours}時間</td>
                  <td className="py-3 px-4 font-light text-slate-600 text-right">¥{row.original.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 font-light text-slate-900">時間</th>
                <th className="py-3 px-4 font-light text-slate-900 text-right">長時間パック</th>
                <th className="py-3 px-4 font-light text-slate-900 text-right">値引き分</th>
              </tr>
            </thead>
            <tbody>
              {LONG_TERM_PACK_DATA.map((row, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-3 px-4 font-light text-slate-900">{row.hours}時間</td>
                  <td className="py-3 px-4 font-light text-slate-900 text-right">
                    {row.pack ? `¥${row.pack.toLocaleString()}` : "-"}
                  </td>
                  <td className="py-3 px-4 font-light text-orange-600 text-right">
                    {row.discount ? `¥${row.discount.toLocaleString()}` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <p className="mt-6 text-sm text-slate-600 font-light">
        ※いつでも12時間/回以上で15%off
      </p>
    </div>
  );
}

