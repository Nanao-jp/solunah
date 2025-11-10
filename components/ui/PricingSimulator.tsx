"use client";

import { useState, useMemo } from "react";
import { Calculator, Clock, Camera, Percent } from "lucide-react";
import DateTimeInput from "./DateTimeInput";
import RegularContractModal from "./RegularContractModal";
import CollaborationModal from "./CollaborationModal";
import "react-datepicker/dist/react-datepicker.css";

interface CalculationResult {
  totalHours: number;
  normalHours: number;
  nightHours: number;
  newYearHours: number;
  basePrice: number;
  longTermDiscount: number;
  longTermDiscountRate: number;
  photographerPrice: number;
  totalPrice: number;
  breakdown: {
    normal: { hours: number; price: number };
    night: { hours: number; price: number };
    newYear: { hours: number; price: number };
  };
  // コラボ時間分とコラボ以外の時間分に分けた計算結果
  collaborationHours: {
    normal: number;
    night: number;
    newYear: number;
    total: number;
    price: number;
  };
  nonCollaborationHours: {
    normal: number;
    night: number;
    newYear: number;
    total: number;
    price: number;
  };
  collaborationDiscount: number;
  nonCollaborationLongTermDiscount: number;
  nonCollaborationLongTermDiscountRate: number;
}

const NORMAL_RATE = 8800; // 通常料金（5時～22時）
const NIGHT_RATE = 11000; // 夜間料金（22時～翌5時）
const NEW_YEAR_RATE = 11880; // 年末年始料金（12/30～1/3）

const PHOTOGRAPHER_PLANS = {
  none: { name: "なし", price: 0 },
  mini: { name: "ミニプラン", price: 15000, duration: 1.0 }, // 60分 = 1時間
  standard: { name: "スタンダード", price: 18000, duration: 1.5 }, // 90分 = 1.5時間
};

type CollaborationType = "with-face" | "without-face" | "no-collab";

const EXTENSION_PRICE = 3000; // 延長30分毎の料金
const BASE_RATE_FOR_COLLAB = 8800; // コラボ割引の基準となる基本料金

// コラボタイプに応じた割引率を取得
function getCollaborationDiscountRate(collaborationType: CollaborationType): number {
  switch (collaborationType) {
    case "with-face":
      return 0.25; // 25%
    case "without-face":
      return 0.10; // 10%
    case "no-collab":
      return 0; // 0%
  }
}

function isNewYearPeriod(date: Date): boolean {
  const month = date.getMonth() + 1; // 0-11 -> 1-12
  const day = date.getDate();
  return (month === 12 && day >= 30) || (month === 1 && day <= 3);
}

function calculateHours(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  collaborationHours: number = 0
): CalculationResult {
  if (!startDate || !startTime || !endDate || !endTime) {
    return {
      totalHours: 0,
      normalHours: 0,
      nightHours: 0,
      newYearHours: 0,
      basePrice: 0,
      longTermDiscount: 0,
      longTermDiscountRate: 0,
      photographerPrice: 0,
      totalPrice: 0,
      breakdown: {
        normal: { hours: 0, price: 0 },
        night: { hours: 0, price: 0 },
        newYear: { hours: 0, price: 0 },
      },
      collaborationHours: {
        normal: 0,
        night: 0,
        newYear: 0,
        total: 0,
        price: 0,
      },
      nonCollaborationHours: {
        normal: 0,
        night: 0,
        newYear: 0,
        total: 0,
        price: 0,
      },
      collaborationDiscount: 0,
      nonCollaborationLongTermDiscount: 0,
      nonCollaborationLongTermDiscountRate: 0,
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
      longTermDiscountRate: 0,
      photographerPrice: 0,
      totalPrice: 0,
      breakdown: {
        normal: { hours: 0, price: 0 },
        night: { hours: 0, price: 0 },
        newYear: { hours: 0, price: 0 },
      },
      collaborationHours: {
        normal: 0,
        night: 0,
        newYear: 0,
        total: 0,
        price: 0,
      },
      nonCollaborationHours: {
        normal: 0,
        night: 0,
        newYear: 0,
        total: 0,
        price: 0,
      },
      collaborationDiscount: 0,
      nonCollaborationLongTermDiscount: 0,
      nonCollaborationLongTermDiscountRate: 0,
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
  
  // コラボ時間分とコラボ以外の時間分に分ける
  // コラボ時間は通常時間から優先的に割り当て（夜間・年末年始は後回し）
  let collabNormalHours = 0;
  let collabNightHours = 0;
  let collabNewYearHours = 0;
  let remainingCollabHours = collaborationHours;
  
  // 通常時間からコラボ時間を割り当て
  if (remainingCollabHours > 0 && normalHours > 0) {
    collabNormalHours = Math.min(remainingCollabHours, normalHours);
    remainingCollabHours -= collabNormalHours;
  }
  // 夜間時間からコラボ時間を割り当て
  if (remainingCollabHours > 0 && nightHours > 0) {
    collabNightHours = Math.min(remainingCollabHours, nightHours);
    remainingCollabHours -= collabNightHours;
  }
  // 年末年始時間からコラボ時間を割り当て
  if (remainingCollabHours > 0 && newYearHours > 0) {
    collabNewYearHours = Math.min(remainingCollabHours, newYearHours);
    remainingCollabHours -= collabNewYearHours;
  }
  
  // コラボ以外の時間
  const nonCollabNormalHours = normalHours - collabNormalHours;
  const nonCollabNightHours = nightHours - collabNightHours;
  const nonCollabNewYearHours = newYearHours - collabNewYearHours;
  
  // コラボ時間分の料金
  const collabNormalPrice = Math.floor(collabNormalHours * NORMAL_RATE);
  const collabNightPrice = Math.floor(collabNightHours * NIGHT_RATE);
  const collabNewYearPrice = Math.floor(collabNewYearHours * NEW_YEAR_RATE);
  const collabTotalPrice = collabNormalPrice + collabNightPrice + collabNewYearPrice;
  const collabTotalHours = collabNormalHours + collabNightHours + collabNewYearHours;
  
  // コラボ以外の時間分の料金
  const nonCollabNormalPrice = Math.floor(nonCollabNormalHours * NORMAL_RATE);
  const nonCollabNightPrice = Math.floor(nonCollabNightHours * NIGHT_RATE);
  const nonCollabNewYearPrice = Math.floor(nonCollabNewYearHours * NEW_YEAR_RATE);
  const nonCollabTotalPrice = nonCollabNormalPrice + nonCollabNightPrice + nonCollabNewYearPrice;
  const nonCollabTotalHours = nonCollabNormalHours + nonCollabNightHours + nonCollabNewYearHours;
  
  // 総合時間で長時間パックの割引率を判定
  let longTermDiscountRate = 0;
  const totalHoursInt = Math.floor(normalHours + nightHours + newYearHours);
  
  if (totalHoursInt >= 12) {
    longTermDiscountRate = 0.15;
  } else if (totalHoursInt >= 9) {
    longTermDiscountRate = 0.10;
  } else if (totalHoursInt > 3) {
    longTermDiscountRate = 0.05;
  }
  
  // コラボ以外の時間分の料金に、総合時間で判定した長時間パック割引率を適用
  let nonCollabLongTermDiscount = 0;
  let nonCollabLongTermDiscountRate = 0;
  
  if (longTermDiscountRate > 0 && nonCollabTotalPrice > 0) {
    nonCollabLongTermDiscountRate = longTermDiscountRate;
    nonCollabLongTermDiscount = Math.floor(nonCollabTotalPrice * longTermDiscountRate);
  }
  
  // 旧ロジック（後方互換性のため残す）
  let longTermDiscount = 0;
  if (longTermDiscountRate > 0) {
    longTermDiscount = Math.floor(basePrice * longTermDiscountRate);
  }
  
  return {
    totalHours: totalHoursCalculated,
    normalHours: Math.floor(normalHours * 100) / 100,
    nightHours: Math.floor(nightHours * 100) / 100,
    newYearHours: Math.floor(newYearHours * 100) / 100,
    basePrice,
    longTermDiscount,
    longTermDiscountRate,
    photographerPrice: 0,
    totalPrice: Math.floor(basePrice - longTermDiscount),
    breakdown: {
      normal: { hours: Math.floor(normalHours * 100) / 100, price: normalPrice },
      night: { hours: Math.floor(nightHours * 100) / 100, price: nightPrice },
      newYear: { hours: Math.floor(newYearHours * 100) / 100, price: newYearPrice },
    },
    collaborationHours: {
      normal: Math.floor(collabNormalHours * 100) / 100,
      night: Math.floor(collabNightHours * 100) / 100,
      newYear: Math.floor(collabNewYearHours * 100) / 100,
      total: Math.floor(collabTotalHours * 100) / 100,
      price: collabTotalPrice,
    },
    nonCollaborationHours: {
      normal: Math.floor(nonCollabNormalHours * 100) / 100,
      night: Math.floor(nonCollabNightHours * 100) / 100,
      newYear: Math.floor(nonCollabNewYearHours * 100) / 100,
      total: Math.floor(nonCollabTotalHours * 100) / 100,
      price: nonCollabTotalPrice,
    },
    collaborationDiscount: 0, // 後で計算
    nonCollaborationLongTermDiscount: nonCollabLongTermDiscount,
    nonCollaborationLongTermDiscountRate: nonCollabLongTermDiscountRate,
  };
}

export default function PricingSimulator() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState("");
  const [isRegularContract, setIsRegularContract] = useState(false);
  const [photographerPlan, setPhotographerPlan] = useState<keyof typeof PHOTOGRAPHER_PLANS>("none");
  const [collaborationType, setCollaborationType] = useState<CollaborationType>("no-collab");
  const [extensionCount, setExtensionCount] = useState<number>(0);
  const [isRegularModalOpen, setIsRegularModalOpen] = useState(false);
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false);

  const result = useMemo(() => {
    const startDateStr = startDate ? startDate.toISOString().split("T")[0] : "";
    const endDateStr = endDate ? endDate.toISOString().split("T")[0] : "";
    
    // カメラマンオプションの料金計算
    const plan = PHOTOGRAPHER_PLANS[photographerPlan];
    const planPrice = plan.price;
    const extensionPrice = extensionCount > 0 ? extensionCount * EXTENSION_PRICE : 0;
    
    // コラボ時間を取得（写真提供コラボが選択されている場合のみ）
    const planDuration = "duration" in plan ? plan.duration : 0;
    const collaborationHours = (photographerPlan !== "none" && collaborationType !== "no-collab") 
      ? planDuration 
      : 0;
    
    const calc = calculateHours(startDateStr, startTime, endDateStr, endTime, collaborationHours);
    
    // コラボ割引の計算（写真提供コラボが選択されている場合のみ）
    let collaborationDiscount = 0;
    if (photographerPlan !== "none" && collaborationType !== "no-collab") {
      const discountRate = getCollaborationDiscountRate(collaborationType);
      const planDuration = "duration" in plan ? plan.duration : 0;
      collaborationDiscount = Math.floor(
        BASE_RATE_FOR_COLLAB * discountRate * planDuration
      );
      
      // 12時間以上で顔出し無しコラボの場合、写真提供割引を適用しない
      const totalHoursInt = Math.floor(calc.totalHours);
      if (totalHoursInt >= 12 && collaborationType === "without-face") {
        collaborationDiscount = 0;
      }
    }
    
    // カメラマンオプション料金は固定（割引なし）
    const photographerPrice = planPrice + extensionPrice;
    
    // コラボ時間分には写真提供割引、コラボ以外の時間分には長時間パック割引を適用
    const totalDiscount = collaborationDiscount + calc.nonCollaborationLongTermDiscount;
    
    // 基本料金から適用した割引を差し引く
    const discountedBasePrice = Math.max(0, calc.basePrice - totalDiscount);
    
    // 合計金額は整数で計算（小数点なし）
    const totalPrice = Math.floor(discountedBasePrice + photographerPrice);

    return {
      ...calc,
      photographerPrice,
      collaborationDiscount,
      totalDiscount,
      totalPrice,
    };
  }, [startDate, startTime, endDate, endTime, photographerPlan, extensionCount, collaborationType]);

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
            onClick={() => setIsRegularModalOpen(true)}
            className="text-orange-500 hover:text-orange-600 text-sm font-light underline transition-colors"
          >
            詳しくはこちら
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Camera className="w-4 h-4 inline mr-2 text-orange-500" />
            カメラマンオプション
          </label>
          <select
            value={photographerPlan}
            onChange={(e) => {
              const newPlan = e.target.value as keyof typeof PHOTOGRAPHER_PLANS;
              setPhotographerPlan(newPlan);
              // プランが「なし」に戻された場合は延長回数とコラボタイプをリセット
              if (newPlan === "none") {
                setExtensionCount(0);
                setCollaborationType("no-collab");
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
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  コラボタイプ
                </label>
                <button
                  type="button"
                  onClick={() => setIsCollaborationModalOpen(true)}
                  className="text-orange-500 hover:text-orange-600 text-xs font-light underline transition-colors"
                >
                  コラボについては説明はこちら
                </button>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="collaborationType"
                    value="with-face"
                    checked={collaborationType === "with-face"}
                    onChange={(e) => setCollaborationType(e.target.value as CollaborationType)}
                    className="w-5 h-5 border-slate-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-slate-700 font-light">顔出し有りコラボ</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="collaborationType"
                    value="without-face"
                    checked={collaborationType === "without-face"}
                    onChange={(e) => setCollaborationType(e.target.value as CollaborationType)}
                    className="w-5 h-5 border-slate-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-slate-700 font-light">顔出し無しコラボ</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="collaborationType"
                    value="no-collab"
                    checked={collaborationType === "no-collab"}
                    onChange={(e) => setCollaborationType(e.target.value as CollaborationType)}
                    className="w-5 h-5 border-slate-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-slate-700 font-light">コラボ無し</span>
                </label>
              </div>
            </div>

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

              {(result.collaborationDiscount > 0 || result.nonCollaborationLongTermDiscount > 0) && (
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  {result.collaborationDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-orange-600 font-light flex items-center gap-1">
                        <Percent className="w-4 h-4" />
                        基本料金割引（写真提供割引）
                      </span>
                      <span className="text-orange-600 font-medium">-¥{result.collaborationDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  {result.nonCollaborationLongTermDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-orange-600 font-light flex items-center gap-1">
                        <Percent className="w-4 h-4" />
                        長時間パック割引（-{Math.round(result.nonCollaborationLongTermDiscountRate * 100)}%）
                      </span>
                      <span className="text-orange-600 font-medium">-¥{result.nonCollaborationLongTermDiscount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}

              {photographerPlan !== "none" && (
                <div className="pt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-light">カメラマンオプション</span>
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

      <RegularContractModal isOpen={isRegularModalOpen} onClose={() => setIsRegularModalOpen(false)} />
      <CollaborationModal isOpen={isCollaborationModalOpen} onClose={() => setIsCollaborationModalOpen(false)} />
    </div>
  );
}

