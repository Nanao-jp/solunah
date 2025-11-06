import { Home, MessageCircle, Users, Clock, LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const allServices: Service[] = [
  {
    title: "訪問看護",
    description: "ご自宅での看護ケアを提供します。専門的な看護技術と温かい心でサポートします。",
    icon: Home,
  },
  {
    title: "健康相談",
    description: "看護師による健康相談サービス。日々の健康管理から専門的なアドバイスまで。",
    icon: MessageCircle,
  },
  {
    title: "在宅ケア",
    description: "日常生活のサポートから医療的なケアまで、包括的な在宅ケアサービスを提供します。",
    icon: Users,
  },
  {
    title: "24時間サポート",
    description: "静かに寄り添い、温かく明るく、24時間いつでもサポートいたします。",
    icon: Clock,
  },
];

