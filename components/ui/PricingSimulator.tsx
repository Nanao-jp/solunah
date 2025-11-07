"use client";

import { useState, useMemo } from "react";
import { Calculator, Clock, Camera, Percent } from "lucide-react";
import DateTimeInput from "./DateTimeInput";
import RegularContractModal from "./RegularContractModal";
import "react-datepicker/dist/react-datepicker.css";

interface CalculationResult {
  totalHours: number;
  normalHours: number;
  nightHours: number;
  newYearHours: number;
  basePrice: number;
  longTermDiscount: number;
  photographerPrice: number;
  totalPrice: number;
  breakdown: {
    normal: { hours: number; price: number };
    night: { hours: number; price: number };
    newYear: { hours: number; price: number };
  };
}

const NORMAL_RATE = 8800; // 通常料金（5時～22時）
const NIGHT_RATE = 11000; // 夜間料金（22時～翌5時）
const NEW_YEAR_RATE = 11880; // 年末年始料金（12/30～1/3）

const PHOTOGRAPHER_PLANS = {
  none: { name: "なし", price: 0 },
  mini: { name: "ミニプラン", price: 15000 },
  standard: { name: "スタンダード", price: 18000 },
};

const EXTENSION_PRICE = 3000; // 延長30分毎の料金

function isNewYearPeriod(date: Date): boolean {
  const month = date.getMonth() + 1; // 0-11 -> 1-12
  const day = date.getDate();
  return (month === 12 && day >= 30) || (month === 1 && day <= 3);
}

function calculateHours(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): CalculationResult {
  if (!startDate || !startTime || !endDate || !endTime) {
    return {
      totalHours: 0,
      normalHours: 0,
      nightHours: 0,
      newYearHours: 0,
      basePrice: 0,
      longTermDiscount: 0,
      photographerPrice: 0,
      totalPrice: 0,
      breakdown: {
        normal: { hours: 0, price: 0 },
        night: { hours: 0, price: 0 },
        newYear: { hours: 0, price: 0 },
      },
    };
  }

  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  if (end <= start) {
    return {
      totalHours: 0,
      normalHours: 0,
      nightHours: 0,
      newYearHours: 0,
      basePrice: 0,
      longTermDiscount: 0,
      photographerPrice: 0,
      totalPrice: 0,
      breakdown: {
        normal: { hours: 0, price: 0 },
        night: { hours: 0, price: 0 },
        newYear: { hours: 0, price: 0 },
      },
    };
  }

  let normalHours = 0;
  let nightHours = 0;
  let newYearHours = 0;

  // 1時間ごとに時間帯を判定
  const current = new Date(start);
  const stepMs = 60 * 60 * 1000; // 1時間

  while (current < end) {
    const nextHour = new Date(current.getTime() + stepMs);
    const checkTime = Math.min(nextHour.getTime(), end.getTime());
    const hours = (checkTime - current.getTime()) / (1000 * 60 * 60);

    const hour = current.getHours();
    const isNewYear = isNewYearPeriod(current);

    if (isNewYear) {
      newYearHours += hours;
    } else if (hour >= 5 && hour < 22) {
      normalHours += hours;
    } else {
      nightHours += hours;
    }

    current.setTime(checkTime);
  }

  // 料金計算（年末年始は優先、金額は整数で計算）
  const normalPrice = Math.floor(normalHours * NORMAL_RATE);
  const nightPrice = Math.floor(nightHours * NIGHT_RATE);
  const newYearPrice = Math.floor(newYearHours * NEW_YEAR_RATE);
  const basePrice = normalPrice + nightPrice + newYearPrice;

  // 合計時間を計算（表示用に小数点2桁まで保持）
  const totalHoursCalculated = Math.floor((normalHours + nightHours + newYearHours) * 100) / 100;
  
  // 長時間パックの適用（判定は整数の合計時間で行う）
  let longTermDiscount = 0;

  if (Math.floor(normalHours + nightHours + newYearHours) >= 12) {
    // 12時間/回以上で15%off（いつでも適用）
    longTermDiscount = Math.floor(basePrice * 0.15);
  }
  
  return {
    totalHours: totalHoursCalculated,
    normalHours: Math.floor(normalHours * 100) / 100, // 表示用に小数点2桁
    nightHours: Math.floor(nightHours * 100) / 100,
    newYearHours: Math.floor(newYearHours * 100) / 100,
    basePrice,
    longTermDiscount,
    photographerPrice: 0,
    totalPrice: Math.floor(basePrice - longTermDiscount),
    breakdown: {
      normal: { hours: Math.floor(normalHours * 100) / 100, price: normalPrice },
      night: { hours: Math.floor(nightHours * 100) / 100, price: nightPrice },
      newYear: { hours: Math.floor(newYearHours * 100) / 100, price: newYearPrice },
    },
  };
}

export default function PricingSimulator() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState("");
  const [isRegularContract, setIsRegularContract] = useState(false);
  const [photographerPlan, setPhotographerPlan] = useState<keyof typeof PHOTOGRAPHER_PLANS>("none");
  const [extensionCount, setExtensionCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const result = useMemo(() => {
    const startDateStr = startDate ? startDate.toISOString().split("T")[0] : "";
    const endDateStr = endDate ? endDate.toISOString().split("T")[0] : "";
    const calc = calculateHours(startDateStr, startTime, endDateStr, endTime);
    
    // カメラマンコラボの料金計算
    // プラン料金 + 延長回数 × 3000円
    const planPrice = PHOTOGRAPHER_PLANS[photographerPlan].price;
    const extensionPrice = extensionCount > 0 ? extensionCount * EXTENSION_PRICE : 0;
    const photographerPrice = planPrice + extensionPrice;
    
    // 合計金額は整数で計算（小数点なし）
    const totalPrice = Math.floor(calc.totalPrice + photographerPrice);

    return {
      ...calc,
      photographerPrice,
      totalPrice,
    };
  }, [startDate, startTime, endDate, endTime, photographerPlan, extensionCount]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <DateTimeInput
          label="利用開始日時"
          date={startDate}
          time={startTime}
          onDateChange={setStartDate}
          onTimeChange={setStartTime}
        />
        <DateTimeInput
          label="利用終了日時"
          date={endDate}
          time={endTime}
          onDateChange={setEndDate}
          onTimeChange={setEndTime}
        />
      </div>

      {/* オプション */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="regularContract"
            checked={isRegularContract}
            onChange={(e) => setIsRegularContract(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
          />
          <label htmlFor="regularContract" className="text-slate-700 font-light cursor-pointer">
            定期契約
          </label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-orange-500 hover:text-orange-600 text-sm font-light underline transition-colors"
          >
            詳しくはこちら
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Camera className="w-4 h-4 inline mr-2 text-orange-500" />
            カメラマンコラボ
          </label>
          <select
            value={photographerPlan}
            onChange={(e) => {
              const newPlan = e.target.value as keyof typeof PHOTOGRAPHER_PLANS;
              setPhotographerPlan(newPlan);
              // プランが「なし」に戻された場合は延長回数をリセット
              if (newPlan === "none") {
                setExtensionCount(0);
              }
            }}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            {Object.entries(PHOTOGRAPHER_PLANS).map(([key, plan]) => (
              <option key={key} value={key}>
                {plan.name} {plan.price > 0 && `(¥${plan.price.toLocaleString()})`}
              </option>
            ))}
          </select>
        </div>

        {photographerPlan !== "none" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              延長回数（30分単位）
            </label>
            <input
              type="number"
              min="0"
              value={extensionCount}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setExtensionCount(Math.max(0, value));
              }}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-700"
              placeholder="延長回数を入力"
            />
            <p className="mt-1 text-xs text-slate-500 font-light">
              1回 = 30分延長（¥{EXTENSION_PRICE.toLocaleString()}）
            </p>
          </div>
        )}
      </div>

      {/* 計算結果 */}
      {result.totalHours > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-light text-slate-900 tracking-wide">計算結果</h3>
          </div>

          <div className="space-y-4">
            {/* 利用時間 */}
            <div className="pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-lg font-medium text-slate-900">利用時間</span>
              </div>
              <div className="pl-7 space-y-1 text-sm text-slate-600 font-light">
                <p>合計: {result.totalHours.toFixed(2)}時間</p>
                {result.normalHours > 0 && (
                  <p>・通常時間（5時～22時）: {result.normalHours.toFixed(2)}時間</p>
                )}
                {result.nightHours > 0 && (
                  <p>・夜間時間（22時～翌5時）: {result.nightHours.toFixed(2)}時間</p>
                )}
                {result.newYearHours > 0 && (
                  <p>・年末年始（12/30～1/3）: {result.newYearHours.toFixed(2)}時間</p>
                )}
              </div>
            </div>

            {/* 料金内訳 */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 font-light">基本料金</span>
                <span className="text-slate-900 font-medium">¥{result.basePrice.toLocaleString()}</span>
              </div>
              {result.breakdown.normal.hours > 0 && (
                <div className="flex justify-between pl-4 text-slate-500 text-xs">
                  <span>通常時間（¥{NORMAL_RATE.toLocaleString()}/時間）</span>
                  <span>¥{result.breakdown.normal.price.toLocaleString()}</span>
                </div>
              )}
              {result.breakdown.night.hours > 0 && (
                <div className="flex justify-between pl-4 text-slate-500 text-xs">
                  <span>夜間時間（¥{NIGHT_RATE.toLocaleString()}/時間）</span>
                  <span>¥{result.breakdown.night.price.toLocaleString()}</span>
                </div>
              )}
              {result.breakdown.newYear.hours > 0 && (
                <div className="flex justify-between pl-4 text-slate-500 text-xs">
                  <span>年末年始（¥{NEW_YEAR_RATE.toLocaleString()}/時間）</span>
                  <span>¥{result.breakdown.newYear.price.toLocaleString()}</span>
                </div>
              )}

              {result.longTermDiscount > 0 && (
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-orange-600 font-light flex items-center gap-1">
                    <Percent className="w-4 h-4" />
                    長時間パック割引
                  </span>
                  <span className="text-orange-600 font-medium">-¥{result.longTermDiscount.toLocaleString()}</span>
                </div>
              )}

              {result.photographerPrice > 0 && (
                <div className="pt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-light">カメラマンコラボ</span>
                    <span className="text-slate-900 font-medium">¥{result.photographerPrice.toLocaleString()}</span>
                  </div>
                  {PHOTOGRAPHER_PLANS[photographerPlan].price > 0 && (
                    <div className="flex justify-between pl-4 text-slate-500 text-xs mt-1">
                      <span>{PHOTOGRAPHER_PLANS[photographerPlan].name}</span>
                      <span>¥{PHOTOGRAPHER_PLANS[photographerPlan].price.toLocaleString()}</span>
                    </div>
                  )}
                  {extensionCount > 0 && (
                    <div className="flex justify-between pl-4 text-slate-500 text-xs mt-1">
                      <span>延長30分 × {extensionCount}回</span>
                      <span>¥{(extensionCount * EXTENSION_PRICE).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}

              {isRegularContract && (
                <div className="pt-2 text-xs text-slate-500 italic">
                  ※定期契約の割引は別途ご相談ください
                </div>
              )}

              <div className="flex justify-between pt-4 border-t-2 border-orange-200 mt-4">
                <span className="text-lg font-medium text-slate-900">合計金額</span>
                <span className="text-2xl font-light text-orange-600">¥{result.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <RegularContractModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

