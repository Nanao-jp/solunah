"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, X, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import { ja } from "date-fns/locale";

interface DateTimeInputProps {
  label: string;
  date: Date | null;
  time: string;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string) => void;
  zIndex?: number;
}

function getDayClassName(date: Date): string {
  const dayOfWeek = date.getDay();
  const isToday = date.toDateString() === new Date().toDateString();
  let className = "";

  if (isToday) {
    className += "!bg-orange-100 !text-orange-600 ";
  }

  if (dayOfWeek === 0) {
    className += "!text-red-500 ";
  } else if (dayOfWeek === 6) {
    className += "!text-blue-500 ";
  }

  return className.trim();
}

export default function DateTimeInput({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  zIndex,
}: DateTimeInputProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [tempHour, setTempHour] = useState(time ? time.split(":")[0] || "00" : "00");
  const [tempMinute, setTempMinute] = useState(time ? time.split(":")[1] || "00" : "00");
  const timeModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (time) {
      const [hour, minute] = time.split(":");
      setTempHour(hour || "00");
      setTempMinute(minute || "00");
    }
  }, [time]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeModalRef.current && !timeModalRef.current.contains(event.target as Node)) {
        setIsTimeModalOpen(false);
      }
    };

    if (isTimeModalOpen) {
      // メインページのスクロールを無効化
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // スクロールを有効化
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isTimeModalOpen]);

  const handleHourChange = (hour: string) => {
    const minute = time ? time.split(":")[1] || "00" : "00";
    onTimeChange(`${hour}:${minute}`);
  };

  const handleMinuteChange = (minute: string) => {
    const hour = time ? time.split(":")[0] || "00" : "00";
    onTimeChange(`${hour}:${minute}`);
  };

  const handleTimeModalOpen = () => {
    setIsTimeModalOpen(true);
  };

  const handleTimeModalClose = () => {
    setIsTimeModalOpen(false);
  };

  const handleTimeConfirm = () => {
    onTimeChange(`${tempHour}:${tempMinute}`);
    setIsTimeModalOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        <Calendar className="w-4 h-4 inline mr-2 text-orange-500" />
        {label}
      </label>
      <div className="space-y-3">
        {isMounted ? (
          <DatePicker
            selected={date}
            onChange={onDateChange}
            dateFormat="yyyy年M月d日"
            placeholderText="日付を選択"
            locale={ja}
            calendarStartDay={1}
            customInput={({ value, onClick }) => (
              <input
                type="text"
                readOnly
                inputMode="none"
                value={value || ""}
                onClick={onClick}
                placeholder="日付を選択"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-700 cursor-pointer"
              />
            )}
            wrapperClassName="w-full relative"
            calendarClassName="!font-sans"
            portalId="datepicker-portal"
            popperClassName="!z-[99999]"
            popperPlacement="bottom-start"
            popperProps={{
              strategy: "fixed",
            }}
            dayClassName={getDayClassName}
          />
        ) : (
          <input
            type="text"
            readOnly
            value={date ? date.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" }) : ""}
            placeholder="日付を選択"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-700"
          />
        )}
        <div className="relative">
          <button
            type="button"
            onClick={handleTimeModalOpen}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-700 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              {time ? `${time.split(":")[0]}時${time.split(":")[1]}分` : "時間を選択"}
            </span>
          </button>

          {isTimeModalOpen && (
            <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div
                ref={timeModalRef}
                className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-slate-900">時間を選択</h3>
                  <button
                    type="button"
                    onClick={handleTimeModalClose}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">時</label>
                    <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
                      {Array.from({ length: 24 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setTempHour(String(i).padStart(2, "0"))}
                          className={`w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors ${
                            tempHour === String(i).padStart(2, "0")
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">分</label>
                    <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
                      {[0, 15, 30, 45].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setTempMinute(String(m).padStart(2, "0"))}
                          className={`w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors ${
                            tempMinute === String(m).padStart(2, "0")
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

                <button
                  type="button"
                  onClick={handleTimeConfirm}
                  className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  決定
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

