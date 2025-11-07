"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleHourChange = (hour: string) => {
    const minute = time ? time.split(":")[1] || "00" : "00";
    onTimeChange(`${hour}:${minute}`);
  };

  const handleMinuteChange = (minute: string) => {
    const hour = time ? time.split(":")[0] || "00" : "00";
    onTimeChange(`${hour}:${minute}`);
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
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-700"
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
        <div className="flex gap-2">
          <select
            value={time ? time.split(":")[0] || "00" : "00"}
            onChange={(e) => handleHourChange(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-700"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={String(i).padStart(2, "0")}>
                {String(i).padStart(2, "0")}時
              </option>
            ))}
          </select>
          <select
            value={time ? time.split(":")[1] || "00" : "00"}
            onChange={(e) => handleMinuteChange(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-700"
          >
            {[0, 15, 30, 45].map((m) => (
              <option key={m} value={String(m).padStart(2, "0")}>
                {String(m).padStart(2, "0")}分
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

