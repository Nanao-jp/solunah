"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";

interface DatePickerProps {
  value: string; // YYYY-MM-DD形式
  onChange: (value: string) => void;
  label?: string;
}

export default function DatePicker({ value, onChange, label }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // valueから日付を初期化
  useEffect(() => {
    if (value) {
      const date = new Date(value + "T00:00:00");
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setCurrentMonth(new Date(date));
      }
    } else {
      setSelectedDate(null);
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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // 前月の日付（空白）
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // 今月の日付
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    handleDateSelect(today);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <Calendar className="w-4 h-4 inline mr-2 text-orange-500" />
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-left"
      >
        {value || "日付を選択"}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 p-4 w-80">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-lg font-medium text-slate-900">
              {currentMonth.getFullYear()}年{monthNames[currentMonth.getMonth()]}
            </div>
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* 曜日ヘッダー */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-slate-500 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* カレンダーグリッド */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (date === null) {
                return <div key={`empty-${index}`} className="h-8 w-full" />;
              }

              const today = isToday(date);
              const selected = isSelected(date);

              return (
                <button
                  key={date.getTime()}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  className={`h-8 w-full rounded-lg text-sm transition-all flex items-center justify-center ${
                    selected
                      ? "bg-orange-500 text-white font-medium"
                      : today
                      ? "bg-orange-50 text-orange-600 font-medium border border-orange-200"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* 今日ボタン */}
          <button
            type="button"
            onClick={goToToday}
            className="mt-4 w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
          >
            今日
          </button>
        </div>
      )}
    </div>
  );
}

