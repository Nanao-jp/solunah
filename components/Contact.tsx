"use client";

import { useState } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import InfoCard from "@/components/ui/InfoCard";
import Button from "@/components/ui/Button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理（実際の実装ではAPIに送信）
    alert("お問い合わせありがとうございます。後日ご連絡いたします。");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="お問い合わせ" />

        <InfoCard className="p-10 md:p-12">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <User className="w-4 h-4 text-orange-600" />
                お名前
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-500 focus:bg-slate-100 outline-none transition-all duration-200 text-slate-900 placeholder:text-slate-500 hover:border-slate-400/60"
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <Mail className="w-4 h-4 text-orange-600" />
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-500 focus:bg-slate-100 outline-none transition-all duration-200 text-slate-900 placeholder:text-slate-500 hover:border-slate-400/60"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <MessageSquare className="w-4 h-4 text-orange-600" />
                お問い合わせ内容
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-500 focus:bg-slate-100 outline-none transition-all duration-200 resize-none text-slate-900 placeholder:text-slate-500 hover:border-slate-400/60"
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              showArrow={false}
            >
              <Send className="w-5 h-5" />
              送信する
            </Button>
          </form>
        </InfoCard>
      </div>
    </section>
  );
}

