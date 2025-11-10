"use client";

import { useState, useEffect, forwardRef } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { ja } from "date-fns/locale";

interface DateInputProps {
  label: string;
  date: Date | null;
  onDateChange: (date: Date | null) => void;
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

// customInput用のコンポーネント（forwardRefでラップ）
const CustomDateInput = forwardRef<
  HTMLInputElement,
  { value?: string; onClick?: () => void; className?: string }
>(({ value, onClick, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      readOnly
      inputMode="none"
      value={value || ""}
      onClick={onClick}
      placeholder="日付を選択"
      className={`w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-700 cursor-pointer ${className || ""}`}
      {...props}
    />
  );
});
CustomDateInput.displayName = "CustomDateInput";

export default function DateInput({
  label,
  date,
  onDateChange,
}: DateInputProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        <Calendar className="w-4 h-4 inline mr-2 text-orange-500" />
        {label}
      </label>
      {isMounted ? (
        <DatePicker
          selected={date}
          onChange={onDateChange}
          dateFormat="yyyy年M月d日"
          placeholderText="日付を選択"
          locale={ja}
          calendarStartDay={1}
          customInput={<CustomDateInput />}
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
    </div>
  );
}

