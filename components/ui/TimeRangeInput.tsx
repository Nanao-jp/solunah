"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, X } from "lucide-react";

interface TimeRangeInputProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  showLabel?: boolean;
}

export default function TimeRangeInput({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  showLabel = true,
}: TimeRangeInputProps) {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [tempStartHour, setTempStartHour] = useState(startTime ? startTime.split(":")[0] || "00" : "00");
  const [tempStartMinute, setTempStartMinute] = useState(startTime ? startTime.split(":")[1] || "00" : "00");
  const [tempEndHour, setTempEndHour] = useState(endTime ? endTime.split(":")[0] || "00" : "00");
  const [tempEndMinute, setTempEndMinute] = useState(endTime ? endTime.split(":")[1] || "00" : "00");
  const timeModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startTime) {
      const [hour, minute] = startTime.split(":");
      setTempStartHour(hour || "00");
      setTempStartMinute(minute || "00");
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      const [hour, minute] = endTime.split(":");
      setTempEndHour(hour || "00");
      setTempEndMinute(minute || "00");
    }
  }, [endTime]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeModalRef.current && !timeModalRef.current.contains(event.target as Node)) {
        setIsTimeModalOpen(false);
      }
    };

    if (isTimeModalOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isTimeModalOpen]);

  const handleTimeConfirm = () => {
    onStartTimeChange(`${tempStartHour}:${tempStartMinute}`);
    onEndTimeChange(`${tempEndHour}:${tempEndMinute}`);
    setIsTimeModalOpen(false);
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour}時${minute}分`;
  };

  const displayText = () => {
    if (startTime && endTime) {
      return `${formatTime(startTime)} ～ ${formatTime(endTime)}`;
    } else if (startTime) {
      return `${formatTime(startTime)} ～ 未設定`;
    } else if (endTime) {
      return `未設定 ～ ${formatTime(endTime)}`;
    }
    return "時間を選択";
  };

  // 時間の妥当性チェック
  const isValidTimeRange = () => {
    if (!startTime || !endTime) return true; // どちらかが未設定の場合はエラーなし
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    return startTotalMinutes < endTotalMinutes;
  };

  const isValid = isValidTimeRange();

  return (
    <div className="relative">
      {showLabel && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <Clock className="w-4 h-4 inline mr-2 text-orange-500" />
          利用時間
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsTimeModalOpen(true)}
        className={`w-full px-4 py-3 rounded-lg border ${
          !isValid 
            ? "border-red-300 bg-red-50/80" 
            : "border-slate-300 bg-white/80"
        } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-700 flex items-center justify-between`}
      >
        <span className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${!isValid ? "text-red-500" : "text-orange-500"}`} />
          {displayText()}
        </span>
      </button>
      {!isValid && (
        <p className="mt-1 text-sm text-red-600 font-light">
          入力が間違っています。開始時間は終了時間より前である必要があります。
        </p>
      )}

      {isTimeModalOpen && (
        <div className="fixed inset-0 z-[99998] flex items-center justify-center p-2 md:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div
            ref={timeModalRef}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-4 md:p-6 my-auto"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-light text-slate-900">利用時間を設定</h3>
              <button
                type="button"
                onClick={() => setIsTimeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* 開始時間 */}
              <div className="pb-4 md:pb-6 border-b border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-3 md:mb-4">開始時間</label>
                <div className="flex gap-2 md:gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-600 mb-2">時</label>
                    <div className="h-[140px] md:h-[176px] overflow-y-auto border border-slate-200 rounded-lg">
                      {Array.from({ length: 24 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setTempStartHour(String(i).padStart(2, "0"))}
                          className={`w-full px-3 md:px-4 py-1.5 md:py-2 text-left hover:bg-orange-50 transition-colors text-sm md:text-base ${
                            tempStartHour === String(i).padStart(2, "0")
                              ? "bg-orange-100 text-orange-600 font-medium"
                              : "text-slate-700"
                          }`}
                        >
                          {String(i).padStart(2, "0")}時
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-600 mb-2">分</label>
                    <div className="h-[140px] md:h-[176px] overflow-y-auto border border-slate-200 rounded-lg">
                      {[0, 15, 30, 45].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setTempStartMinute(String(m).padStart(2, "0"))}
                          className={`w-full px-3 md:px-4 py-1.5 md:py-2 text-left hover:bg-orange-50 transition-colors text-sm md:text-base ${
                            tempStartMinute === String(m).padStart(2, "0")
                              ? "bg-orange-100 text-orange-600 font-medium"
                              : "text-slate-700"
                          }`}
                        >
                          {String(m).padStart(2, "0")}分
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 終了時間 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 md:mb-4">終了時間</label>
                <div className="flex gap-2 md:gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-600 mb-2">時</label>
                    <div className="h-[140px] md:h-[176px] overflow-y-auto border border-slate-200 rounded-lg">
                      {Array.from({ length: 24 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setTempEndHour(String(i).padStart(2, "0"))}
                          className={`w-full px-3 md:px-4 py-1.5 md:py-2 text-left hover:bg-orange-50 transition-colors text-sm md:text-base ${
                            tempEndHour === String(i).padStart(2, "0")
                              ? "bg-orange-100 text-orange-600 font-medium"
                              : "text-slate-700"
                          }`}
                        >
                          {String(i).padStart(2, "0")}時
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-600 mb-2">分</label>
                    <div className="h-[140px] md:h-[176px] overflow-y-auto border border-slate-200 rounded-lg">
                      {[0, 15, 30, 45].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setTempEndMinute(String(m).padStart(2, "0"))}
                          className={`w-full px-3 md:px-4 py-1.5 md:py-2 text-left hover:bg-orange-50 transition-colors text-sm md:text-base ${
                            tempEndMinute === String(m).padStart(2, "0")
                              ? "bg-orange-100 text-orange-600 font-medium"
                              : "text-slate-700"
                          }`}
                        >
                          {String(m).padStart(2, "0")}分
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTimeConfirm}
              className="w-full mt-4 md:mt-6 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm md:text-base"
            >
              決定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

