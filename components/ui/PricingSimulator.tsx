"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Calculator, Clock, Camera, Percent, Calendar, Mail } from "lucide-react";
import DateInput from "./DateInput";
import TimeRangeInput from "./TimeRangeInput";
import RegularContractModal from "./RegularContractModal";
import CollaborationModal from "./CollaborationModal";
import {
  NORMAL_RATE,
  NIGHT_RATE,
  NEW_YEAR_RATE,
  PHOTOGRAPHER_PLANS,
  EXTENSION_PRICE,
  BASE_RATE_FOR_COLLAB,
  getCollaborationDiscountRate,
  type CollaborationType,
} from "@/constants/pricing";
import { isNewYearPeriod } from "@/constants/time";
import "react-datepicker/dist/react-datepicker.css";

/**
 * 1日の時間スロット
 * 複数日に跨る利用に対応するためのデータ構造
 */
interface DayTimeSlot {
  date: string; // YYYY-MM-DD形式
  startTime: string; // HH:mm形式
  endTime: string; // HH:mm形式
}

/**
 * 料金計算結果
 * 
 * 注意: この型定義は計算ロジックと密接に関連しているため、
 * フィールドの追加・削除・変更は慎重に行うこと
 */
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

/**
 * 単一日の料金計算関数
 * 
 * 機能:
 * - 開始日時から終了日時までの時間を計算
 * - 通常時間（5時～22時）、夜間時間（22時～翌5時）、年末年始時間（12/30～1/3）に分類
 * - コラボ時間とコラボ以外の時間を分けて計算
 * - 長時間パック割引を適用
 * 
 * @param startDate 開始日（YYYY-MM-DD形式）
 * @param startTime 開始時刻（HH:mm形式）
 * @param endDate 終了日（YYYY-MM-DD形式）
 * @param endTime 終了時刻（HH:mm形式）
 * @param collaborationHours コラボ時間（時間単位、デフォルト: 0）
 * @returns 計算結果
 * 
 * 注意: この関数の計算ロジックは変更しないこと
 */
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

  // 料金計算（各時間帯の料金を計算し、合計を算出）
  // 注意: 金額は整数で計算（Math.floorを使用）
  const normalPrice = Math.floor(normalHours * NORMAL_RATE);
  const nightPrice = Math.floor(nightHours * NIGHT_RATE);
  const newYearPrice = Math.floor(newYearHours * NEW_YEAR_RATE);
  const basePrice = normalPrice + nightPrice + newYearPrice;

  // 合計時間を計算（表示用に小数点2桁まで保持）
  const totalHoursCalculated = Math.floor((normalHours + nightHours + newYearHours) * 100) / 100;
  
  // コラボ時間分とコラボ以外の時間分に分ける
  // 
  // コラボ時間の割り当てルール:
  // 1. 通常時間から優先的に割り当て（最も割引率が高いため）
  // 2. 通常時間が不足する場合は夜間時間から割り当て
  // 3. さらに不足する場合は年末年始時間から割り当て
  // 
  // 注意: この割り当てロジックは変更しないこと
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
  
  // コラボ以外の時間を計算
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
  
  // 長時間パック割引率の判定
  // 
  // 割引率のルール:
  // - 12時間以上: 15%割引
  // - 9時間以上: 10%割引
  // - 3時間以上: 5%割引
  // 
  // 注意: 総合時間（通常+夜間+年末年始）で判定
  // 注意: この割引率の計算ロジックは変更しないこと
  let longTermDiscountRate = 0;
  const totalHoursInt = Math.floor(normalHours + nightHours + newYearHours);
  
  if (totalHoursInt >= 12) {
    longTermDiscountRate = 0.15; // 15%割引
  } else if (totalHoursInt >= 9) {
    longTermDiscountRate = 0.10; // 10%割引
  } else if (totalHoursInt >= 3) {
    longTermDiscountRate = 0.05; // 5%割引
  }
  
  // コラボ以外の時間分の料金に、総合時間で判定した長時間パック割引率を適用
  // 
  // 注意: コラボ時間には長時間パック割引を適用しない
  // 注意: コラボ以外の時間分の料金にのみ割引を適用
  let nonCollabLongTermDiscount = 0;
  let nonCollabLongTermDiscountRate = 0;
  
  if (longTermDiscountRate > 0 && nonCollabTotalPrice > 0) {
    nonCollabLongTermDiscountRate = longTermDiscountRate;
    nonCollabLongTermDiscount = Math.floor(nonCollabTotalPrice * longTermDiscountRate);
  }
  
  // 旧ロジック（後方互換性のため残す）
  // 注意: このロジックは削除しないこと
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

/**
 * 日付範囲から各日の時間スロットを生成する関数
 * 
 * 機能:
 * - 開始日から終了日までの各日付に対して時間スロットを作成
 * - 各スロットは初期状態で開始時刻・終了時刻が空
 * 
 * @param startDate 開始日
 * @param endDate 終了日
 * @returns 各日の時間スロット配列
 */
function generateDayTimeSlots(startDate: Date | null, endDate: Date | null): DayTimeSlot[] {
  if (!startDate || !endDate) return [];
  
  const slots: DayTimeSlot[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  // 終了日まで1日ずつ追加
  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    slots.push({
      date: dateStr,
      startTime: "",
      endTime: "",
    });
    current.setDate(current.getDate() + 1);
  }
  
  return slots;
}

/**
 * 料金シミュレーターのプロップス
 */
interface PricingSimulatorProps {
  /**
   * 問い合わせリクエスト時のコールバック関数
   * 計算結果をメッセージ形式で受け取る
   */
  onInquiryRequest?: (message: string) => void;
}

/**
 * 料金シミュレーターコンポーネント
 * 
 * 機能:
 * - 日付・時間の入力
 * - 複数日に跨る利用に対応
 * - カメラマンオプションの選択
 * - コラボタイプの選択
 * - 料金の自動計算
 * - 問い合わせメッセージの生成
 * 
 * 注意: 計算ロジックは変更しないこと
 */
export default function PricingSimulator({ onInquiryRequest }: PricingSimulatorProps = {}) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState("");
  const [dayTimeSlots, setDayTimeSlots] = useState<DayTimeSlot[]>([]);

  // 日付範囲が変更されたら、各日の時間スロットを生成
  useEffect(() => {
    if (startDate && endDate) {
      const slots = generateDayTimeSlots(startDate, endDate);
      setDayTimeSlots(slots);
    } else {
      setDayTimeSlots([]);
    }
  }, [startDate, endDate]);

  const handleStartDateChange = useCallback((date: Date | null) => {
    setStartDate(date);
    // 開始日が設定されたら、終了日も同じ日付に設定
    if (date) {
      setEndDate(date);
    }
  }, []);

  // 各日の時間を更新する関数
  const updateDayTimeSlot = useCallback((index: number, field: "startTime" | "endTime", value: string) => {
    setDayTimeSlots((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);
  const [isRegularContract, setIsRegularContract] = useState(false);
  const [photographerPlan, setPhotographerPlan] = useState<keyof typeof PHOTOGRAPHER_PLANS>("none");
  const [collaborationType, setCollaborationType] = useState<CollaborationType>("no-collab");
  const [extensionCount, setExtensionCount] = useState<number>(0);
  const [photographerDays, setPhotographerDays] = useState<number[]>([]); // カメラマンを使う日のインデックス
  const [isRegularModalOpen, setIsRegularModalOpen] = useState(false);
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false);

  // 日付範囲が変更されたら、カメラマンの日選択もリセット
  useEffect(() => {
    setPhotographerDays([]);
  }, [startDate, endDate]);

  /**
   * 複数日の時間を合計する関数
   * 
   * 機能:
   * - 各日の時間スロットを個別に計算
   * - 全日の時間を合計
   * - コラボ時間とコラボ以外の時間を分けて計算
   * - 長時間パック割引を適用
   * 
   * @param slots 各日の時間スロット配列
   * @param collaborationHours コラボ時間（時間単位）
   * @returns 計算結果
   * 
   * 注意: この関数の計算ロジックは変更しないこと
   */
  const calculateMultipleDays = (slots: DayTimeSlot[], collaborationHours: number): CalculationResult => {
    let totalNormalHours = 0;
    let totalNightHours = 0;
    let totalNewYearHours = 0;
    let totalBasePrice = 0;
    let totalCollabNormalHours = 0;
    let totalCollabNightHours = 0;
    let totalCollabNewYearHours = 0;
    let totalNonCollabNormalHours = 0;
    let totalNonCollabNightHours = 0;
    let totalNonCollabNewYearHours = 0;

    // 各日の時間を計算
    slots.forEach((slot) => {
      if (slot.startTime && slot.endTime) {
        const dayCalc = calculateHours(slot.date, slot.startTime, slot.date, slot.endTime, 0);
        totalNormalHours += dayCalc.normalHours;
        totalNightHours += dayCalc.nightHours;
        totalNewYearHours += dayCalc.newYearHours;
        totalBasePrice += dayCalc.basePrice;
      }
    });

    // コラボ時間の割り当て（全期間で合計）
    let remainingCollabHours = collaborationHours;
    
    // 通常時間からコラボ時間を割り当て
    if (remainingCollabHours > 0 && totalNormalHours > 0) {
      totalCollabNormalHours = Math.min(remainingCollabHours, totalNormalHours);
      remainingCollabHours -= totalCollabNormalHours;
    }
    // 夜間時間からコラボ時間を割り当て
    if (remainingCollabHours > 0 && totalNightHours > 0) {
      totalCollabNightHours = Math.min(remainingCollabHours, totalNightHours);
      remainingCollabHours -= totalCollabNightHours;
    }
    // 年末年始時間からコラボ時間を割り当て
    if (remainingCollabHours > 0 && totalNewYearHours > 0) {
      totalCollabNewYearHours = Math.min(remainingCollabHours, totalNewYearHours);
      remainingCollabHours -= totalCollabNewYearHours;
    }

    // コラボ以外の時間
    totalNonCollabNormalHours = totalNormalHours - totalCollabNormalHours;
    totalNonCollabNightHours = totalNightHours - totalCollabNightHours;
    totalNonCollabNewYearHours = totalNewYearHours - totalCollabNewYearHours;

    // コラボ時間分の料金
    const collabNormalPrice = Math.floor(totalCollabNormalHours * NORMAL_RATE);
    const collabNightPrice = Math.floor(totalCollabNightHours * NIGHT_RATE);
    const collabNewYearPrice = Math.floor(totalCollabNewYearHours * NEW_YEAR_RATE);
    const collabTotalPrice = collabNormalPrice + collabNightPrice + collabNewYearPrice;
    const collabTotalHours = totalCollabNormalHours + totalCollabNightHours + totalCollabNewYearHours;

    // コラボ以外の時間分の料金
    const nonCollabNormalPrice = Math.floor(totalNonCollabNormalHours * NORMAL_RATE);
    const nonCollabNightPrice = Math.floor(totalNonCollabNightHours * NIGHT_RATE);
    const nonCollabNewYearPrice = Math.floor(totalNonCollabNewYearHours * NEW_YEAR_RATE);
    const nonCollabTotalPrice = nonCollabNormalPrice + nonCollabNightPrice + nonCollabNewYearPrice;
    const nonCollabTotalHours = totalNonCollabNormalHours + totalNonCollabNightHours + totalNonCollabNewYearHours;

    // 総合時間で長時間パックの割引率を判定
    let longTermDiscountRate = 0;
    const totalHoursInt = Math.floor(totalNormalHours + totalNightHours + totalNewYearHours);
    
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
      longTermDiscount = Math.floor(totalBasePrice * longTermDiscountRate);
    }

    return {
      totalHours: Math.floor((totalNormalHours + totalNightHours + totalNewYearHours) * 100) / 100,
      normalHours: Math.floor(totalNormalHours * 100) / 100,
      nightHours: Math.floor(totalNightHours * 100) / 100,
      newYearHours: Math.floor(totalNewYearHours * 100) / 100,
      basePrice: totalBasePrice,
      longTermDiscount,
      longTermDiscountRate,
      photographerPrice: 0,
      totalPrice: Math.floor(totalBasePrice - longTermDiscount),
      breakdown: {
        normal: { hours: Math.floor(totalNormalHours * 100) / 100, price: Math.floor(totalNormalHours * NORMAL_RATE) },
        night: { hours: Math.floor(totalNightHours * 100) / 100, price: Math.floor(totalNightHours * NIGHT_RATE) },
        newYear: { hours: Math.floor(totalNewYearHours * 100) / 100, price: Math.floor(totalNewYearHours * NEW_YEAR_RATE) },
      },
      collaborationHours: {
        normal: Math.floor(totalCollabNormalHours * 100) / 100,
        night: Math.floor(totalCollabNightHours * 100) / 100,
        newYear: Math.floor(totalCollabNewYearHours * 100) / 100,
        total: Math.floor(collabTotalHours * 100) / 100,
        price: collabTotalPrice,
      },
      nonCollaborationHours: {
        normal: Math.floor(totalNonCollabNormalHours * 100) / 100,
        night: Math.floor(totalNonCollabNightHours * 100) / 100,
        newYear: Math.floor(totalNonCollabNewYearHours * 100) / 100,
        total: Math.floor(nonCollabTotalHours * 100) / 100,
        price: nonCollabTotalPrice,
      },
      collaborationDiscount: 0, // 後で計算
      nonCollaborationLongTermDiscount: nonCollabLongTermDiscount,
      nonCollaborationLongTermDiscountRate: nonCollabLongTermDiscountRate,
    };
  };

  const result = useMemo(() => {
    // カメラマンオプションの料金計算
    const plan = PHOTOGRAPHER_PLANS[photographerPlan];
    const planPrice = plan.price;
    const extensionPrice = extensionCount > 0 ? extensionCount * EXTENSION_PRICE : 0;
    
    // コラボ時間を取得（写真提供コラボが選択されている場合のみ）
    const planDuration = "duration" in plan ? plan.duration : 0;
    const collaborationHours = (photographerPlan !== "none" && collaborationType !== "no-collab") 
      ? planDuration 
      : 0;
    
    // 複数日の時間スロットがある場合は複数日計算、ない場合は従来の計算
    let calc: CalculationResult;
    if (dayTimeSlots.length > 0 && dayTimeSlots.some(slot => slot.startTime && slot.endTime)) {
      calc = calculateMultipleDays(dayTimeSlots, collaborationHours);
    } else {
      // 従来の単一日計算（後方互換性のため）
      const startDateStr = startDate ? startDate.toISOString().split("T")[0] : "";
      const endDateStr = endDate ? endDate.toISOString().split("T")[0] : "";
      calc = calculateHours(startDateStr, startTime, endDateStr, endTime, collaborationHours);
    }
    
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
    // 複数日選択されている場合は、選択された日数分を掛け算
    const photographerDaysCount = dayTimeSlots.length > 1 && photographerDays.length > 0 
      ? photographerDays.length 
      : 1;
    const photographerPrice = (planPrice + extensionPrice) * photographerDaysCount;
    
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
  }, [startDate, startTime, endDate, endTime, dayTimeSlots, photographerPlan, extensionCount, collaborationType, photographerDays]);

  // 計算結果を問い合わせメッセージに変換する関数
  const formatInquiryMessage = useMemo((): string => {
    if (result.totalHours === 0) return "";

    const lines: string[] = [];

    // 利用期間
    if (dayTimeSlots.length > 0) {
      lines.push("【利用期間】");
      dayTimeSlots.forEach((slot, index) => {
        if (slot.startTime && slot.endTime) {
          const date = new Date(slot.date);
          const dateLabel = date.toLocaleDateString("ja-JP", { 
            year: "numeric",
            month: "long", 
            day: "numeric",
            weekday: "short"
          });
          const dayNumber = dayTimeSlots.length > 1 ? `${index + 1}日目: ` : "";
          lines.push(`${dayNumber}${dateLabel} ${slot.startTime} ～ ${slot.endTime}`);
        }
      });
    } else if (startDate && endDate && startTime && endTime) {
      lines.push("【利用期間】");
      const startDateLabel = startDate.toLocaleDateString("ja-JP", { 
        year: "numeric",
        month: "long", 
        day: "numeric",
        weekday: "short"
      });
      const endDateLabel = endDate.toLocaleDateString("ja-JP", { 
        year: "numeric",
        month: "long", 
        day: "numeric",
        weekday: "short"
      });
      if (startDate.toDateString() === endDate.toDateString()) {
        lines.push(`${startDateLabel} ${startTime} ～ ${endTime}`);
      } else {
        lines.push(`${startDateLabel} ${startTime} ～ ${endDateLabel} ${endTime}`);
      }
    }
    lines.push("");

    // 利用時間
    lines.push("【利用時間】");
    lines.push(`合計: ${result.totalHours.toFixed(2)}時間`);
    if (result.normalHours > 0) {
      lines.push(`・通常時間（5時～22時）: ${result.normalHours.toFixed(2)}時間`);
    }
    if (result.nightHours > 0) {
      lines.push(`・夜間時間（22時～翌5時）: ${result.nightHours.toFixed(2)}時間`);
    }
    if (result.newYearHours > 0) {
      lines.push(`・年末年始（12/30～1/3）: ${result.newYearHours.toFixed(2)}時間`);
    }
    lines.push("");

    // 料金内訳
    lines.push("【料金内訳】");
    lines.push(`基本料金: ¥${result.basePrice.toLocaleString()}`);
    
    if (result.breakdown.normal.hours > 0) {
      lines.push(`  通常時間: ¥${result.breakdown.normal.price.toLocaleString()}`);
    }
    if (result.breakdown.night.hours > 0) {
      lines.push(`  夜間時間: ¥${result.breakdown.night.price.toLocaleString()}`);
    }
    if (result.breakdown.newYear.hours > 0) {
      lines.push(`  年末年始: ¥${result.breakdown.newYear.price.toLocaleString()}`);
    }

    // 割引
    if (result.collaborationDiscount > 0) {
      lines.push(`写真提供割引: -¥${result.collaborationDiscount.toLocaleString()}`);
    }
    if (result.nonCollaborationLongTermDiscount > 0) {
      lines.push(`長時間パック割引（-${Math.round(result.nonCollaborationLongTermDiscountRate * 100)}%）: -¥${result.nonCollaborationLongTermDiscount.toLocaleString()}`);
    }

    // カメラマンオプション
    if (result.photographerPrice > 0) {
      lines.push(`カメラマンオプション: ¥${result.photographerPrice.toLocaleString()}`);
      const plan = PHOTOGRAPHER_PLANS[photographerPlan];
      if (plan.price > 0) {
        lines.push(`  ${plan.name}: ¥${plan.price.toLocaleString()}`);
      }
      if (extensionCount > 0) {
        lines.push(`  延長30分 × ${extensionCount}回: ¥${(extensionCount * EXTENSION_PRICE).toLocaleString()}`);
      }
      if (collaborationType !== "no-collab") {
        const collabTypeLabel = collaborationType === "with-face" ? "顔出し有りコラボ" : "顔出し無しコラボ";
        lines.push(`  コラボタイプ: ${collabTypeLabel}`);
      }
      if (dayTimeSlots.length > 1 && photographerDays.length > 0) {
        const selectedDays = photographerDays.map(d => `${d + 1}日目`).join("、");
        lines.push(`  使用日: ${selectedDays}`);
      }
    }

    // 定期契約
    if (isRegularContract) {
      lines.push("定期契約: 適用（詳細は別途ご相談）");
    }

    lines.push("");
    lines.push(`【合計金額】`);
    lines.push(`¥${result.totalPrice.toLocaleString()}`);

    return lines.join("\n");
  }, [result, dayTimeSlots, startDate, endDate, startTime, endTime, photographerPlan, extensionCount, collaborationType, photographerDays, isRegularContract]);

  const handleInquiryClick = useCallback(() => {
    const message = formatInquiryMessage;
    if (onInquiryRequest) {
      onInquiryRequest(message);
    }
  }, [formatInquiryMessage, onInquiryRequest]);

  return (
    <div className="space-y-6">
      {/* 日付入力 */}
      <div className="grid md:grid-cols-2 gap-6">
        <DateInput
          label="利用開始日"
          date={startDate}
          onDateChange={handleStartDateChange}
        />
        <DateInput
          label="利用終了日"
          date={endDate}
          onDateChange={setEndDate}
        />
      </div>

      {/* 時間入力 */}
      {dayTimeSlots.length > 0 ? (
        // 複数日の時間入力
        <div className="space-y-4">
          {dayTimeSlots.length > 1 && (
            <label className="block text-sm font-medium text-slate-700">
              <Clock className="w-4 h-4 inline mr-2 text-orange-500" />
              各日の利用時間
            </label>
          )}
          <div className="space-y-4">
            {dayTimeSlots.map((slot, index) => {
              const date = new Date(slot.date);
              const dateLabel = date.toLocaleDateString("ja-JP", { 
                month: "long", 
                day: "numeric",
                weekday: "short"
              });
              const dayNumber = index + 1;
              const isSingleDay = dayTimeSlots.length === 1;
              
              return (
                <div key={slot.date} className={isSingleDay ? "" : "p-4 border border-slate-200 rounded-lg bg-slate-50/50"}>
                  {!isSingleDay && (
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {dateLabel}
                      </span>
                    </div>
                  )}
                  <TimeRangeInput
                    startTime={slot.startTime}
                    endTime={slot.endTime}
                    onStartTimeChange={(time) => updateDayTimeSlot(index, "startTime", time)}
                    onEndTimeChange={(time) => updateDayTimeSlot(index, "endTime", time)}
                    showLabel={isSingleDay}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // 単一日の時間入力（従来の方式）
        <TimeRangeInput
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
      )}

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
                setPhotographerDays([]);
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

        {/* 複数日の場合、カメラマンを使う日を選択 */}
        {photographerPlan !== "none" && dayTimeSlots.length > 1 && (
          <div className="pl-2 border-l-2 border-orange-200">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              カメラマンを使用する日
            </label>
            <div className="space-y-2">
              {dayTimeSlots.map((slot, index) => {
                const date = new Date(slot.date);
                const dateLabel = date.toLocaleDateString("ja-JP", { 
                  month: "long", 
                  day: "numeric",
                  weekday: "short"
                });
                const dayNumber = index + 1;
                const isChecked = photographerDays.includes(index);
                
                return (
                  <label key={slot.date} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPhotographerDays([...photographerDays, index]);
                        } else {
                          setPhotographerDays(photographerDays.filter(d => d !== index));
                        }
                      }}
                      className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-slate-700 font-light">
                      {dateLabel}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

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

      {/* この内容で問い合わせるボタン */}
      {result.totalHours > 0 && onInquiryRequest && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={handleInquiryClick}
            className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 font-medium"
          >
            <Mail className="w-5 h-5" />
            この内容で問い合わせる
          </button>
        </div>
      )}

      <RegularContractModal isOpen={isRegularModalOpen} onClose={() => setIsRegularModalOpen(false)} />
      <CollaborationModal isOpen={isCollaborationModalOpen} onClose={() => setIsCollaborationModalOpen(false)} />
    </div>
  );
}

