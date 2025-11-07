"use client";

import { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimePickerProps {
  value: string; // HH:mm形式
  onChange: (value: string) => void;
  label?: string;
}

export default function TimePicker({ value, onChange, label }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // valueからhourとminuteを初期化
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":").map(Number);
      setHour(h || 0);
      setMinute(m || 0);
    }
  }, [value]);

  // 外側クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleHourChange = (newHour: number) => {
    const clampedHour = Math.max(0, Math.min(23, newHour));
    setHour(clampedHour);
    onChange(`${String(clampedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
  };

  const handleMinuteChange = (newMinute: number) => {
    const clampedMinute = Math.max(0, Math.min(59, newMinute));
    setMinute(clampedMinute);
    onChange(`${String(hour).padStart(2, "0")}:${String(clampedMinute).padStart(2, "0")}`);
  };

  const formatTime = (h: number, m: number) => {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  // 時計の数字を生成（0時00分が一番上）
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // 時計の角度を計算（0時00分が上=270度、回転ループなし）
  const getHourAngle = (h: number) => {
    // 0時が270度（上）、時計回りに回転、0-23の範囲で計算
    const angle = h * 15 - 90; // 1時間 = 15度、-90度で0時を上に
    return angle < 0 ? angle + 360 : angle; // 負の値の場合は360度加算
  };

  const getMinuteAngle = (m: number) => {
    // 0分が270度（上）、時計回りに回転、0-59の範囲で計算
    const angle = m * 6 - 90; // 1分 = 6度、-90度で0分を上に
    return angle < 0 ? angle + 360 : angle; // 負の値の場合は360度加算
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <Clock className="w-4 h-4 inline mr-2 text-orange-500" />
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-left text-slate-700"
      >
        {value || "00:00"}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 p-6 w-80">
          <div className="flex gap-8 justify-center">
            {/* 時間選択 */}
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-2 border-slate-200">
                {hours.map((h) => {
                  const angle = getHourAngle(h);
                  const radian = (angle * Math.PI) / 180;
                  const radius = 42; // 半径（px）
                  const centerX = 64; // 中心X（128px / 2）
                  const centerY = 64; // 中心Y（128px / 2）
                  const x = centerX + radius * Math.cos(radian);
                  const y = centerY + radius * Math.sin(radian);

                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleHourChange(h)}
                      className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                        hour === h
                          ? "bg-orange-500 text-white scale-110 font-medium z-10"
                          : "bg-white text-slate-700 hover:bg-orange-50 border border-slate-200"
                      }`}
                      style={{
                        left: `${x - 14}px`, // ボタン幅の半分（14px）を引く
                        top: `${y - 14}px`, // ボタン高さの半分（14px）を引く
                      }}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-sm font-medium text-slate-600">時</div>
              </div>
            </div>

            {/* 分選択 */}
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-2 border-slate-200">
                {minutes.filter((m) => m % 5 === 0).map((m) => {
                  const angle = getMinuteAngle(m);
                  const radian = (angle * Math.PI) / 180;
                  const radius = 42; // 半径（px）
                  const centerX = 64; // 中心X（128px / 2）
                  const centerY = 64; // 中心Y（128px / 2）
                  const x = centerX + radius * Math.cos(radian);
                  const y = centerY + radius * Math.sin(radian);

                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleMinuteChange(m)}
                      className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                        minute === m
                          ? "bg-orange-500 text-white scale-110 font-medium z-10"
                          : "bg-white text-slate-700 hover:bg-orange-50 border border-slate-200"
                      }`}
                      style={{
                        left: `${x - 14}px`, // ボタン幅の半分（14px）を引く
                        top: `${y - 14}px`, // ボタン高さの半分（14px）を引く
                      }}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-sm font-medium text-slate-600">分</div>
              </div>
            </div>
          </div>

          {/* 現在の選択時間表示 */}
          <div className="mt-6 text-center">
            <div className="text-2xl font-light text-slate-900">
              {formatTime(hour, minute)}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
            >
              確定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

