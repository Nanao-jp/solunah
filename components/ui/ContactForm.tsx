"use client";

import { useState, useEffect } from "react";
import { Send, Calculator } from "lucide-react";

interface ContactFormProps {
  showPhone?: boolean;
  onSubmit?: (data: ContactFormData) => void;
  initialMessage?: string;
  initialPricingResult?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  pricingResult?: string;
}

export default function ContactForm({ showPhone = false, onSubmit, initialMessage, initialPricingResult }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    pricingResult: "",
  });

  // initialMessageが変更されたらメッセージ欄に反映
  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        message: initialMessage,
      }));
    }
  }, [initialMessage]);

  // initialPricingResultが変更されたら料金シミュレーター結果欄に反映
  useEffect(() => {
    if (initialPricingResult) {
      setFormData((prev) => ({
        ...prev,
        pricingResult: initialPricingResult,
      }));
    }
  }, [initialPricingResult]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // デフォルトの送信処理
      console.log("Form submitted:", formData);
      alert("お問い合わせありがとうございます。後日ご連絡いたします。");
      setFormData({ name: "", email: "", phone: "", message: "", pricingResult: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
          お名前 <span className="text-orange-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          メールアドレス <span className="text-orange-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          placeholder="example@email.com"
        />
      </div>

      {showPhone && (
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            電話番号
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="090-1234-5678"
          />
        </div>
      )}

      <div>
        <label htmlFor="pricingResult" className="block text-sm font-medium text-slate-700 mb-2">
          <Calculator className="w-4 h-4 inline mr-2 text-orange-500" />
          料金シミュレーター結果
        </label>
        <textarea
          id="pricingResult"
          name="pricingResult"
          rows={8}
          value={formData.pricingResult || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none font-mono text-sm"
          placeholder="料金シミュレーターで「この内容で問い合わせる」をクリックすると自動入力されます"
        />
        <p className="mt-1 text-xs text-slate-500 font-light">
          料金シミュレーターで計算した結果が自動入力されます
        </p>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          お問い合わせ内容 <span className="text-orange-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 bg-orange-500 text-white hover:bg-orange-600"
        >
          <Send className="w-5 h-5" />
          送信する
        </button>
      </div>
    </form>
  );
}

