import { Clock, Heart, Stethoscope, LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Clock,
    title: "24時間サポート",
    description: "夜間も24時間体制で、いつでも寄り添う看護サービス",
  },
  {
    icon: Heart,
    title: "温かいケア",
    description: "明るく温かい看護で、あなたの健康を支えます",
  },
  {
    icon: Stethoscope,
    title: "YOURNURSE",
    description: "保険外看護サービスで、より柔軟なケアを提供",
  },
];

