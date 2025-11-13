"use client";

import { useState } from "react";
import PremiumCaseCard from "@/components/ui/PremiumCaseCard";
import CaseModal from "@/components/ui/CaseModal";
import YourNurseHeroSection from "@/components/ui/YourNurseHeroSection";
import { 
  Calendar, 
  MapPin, 
  Plane, 
  Building2, 
  Users, 
  Stethoscope, 
  Home, 
  DoorOpen, 
  Heart 
} from "lucide-react";

const cases = [
  {
    icon: Calendar,
    title: "冠婚葬祭",
    message: "大切な人生の節目に、看護師が寄り添います。安心してご参加いただけるよう、健康状態を確認しながらサポートいたします。",
  },
  {
    icon: MapPin,
    title: "外出",
    message: "いつもと違う風景を見に、外に出てみませんか？看護師が付き添うことで安心して外出できるようサポートします。",
  },
  {
    icon: Plane,
    title: "旅行",
    message: "家族旅行や思い出の場所への旅行にも看護師が同行。移動中も滞在中も、安心して過ごしていただけます。",
  },
  {
    icon: Building2,
    title: "転院付き添い",
    message: "転院時の移動や手続きを看護師がサポート。医療機関間の連携もスムーズに行い、安心して転院していただけます。",
  },
  {
    icon: Users,
    title: "家族行事",
    message: "お誕生日会や記念日など、家族の大切な行事に看護師が同行。健康管理をしながら、一緒に喜びを分かち合います。",
  },
  {
    icon: Stethoscope,
    title: "受診同行",
    message: "病院への受診時に看護師が同行し、医師とのコミュニケーションをサポート。診察内容の理解も深まります。",
  },
  {
    icon: Home,
    title: "在宅看護(保険内と併用可能)",
    message: "保険内の在宅看護と併用して、より柔軟で充実した看護ケアを提供。ご自宅で安心して過ごしていただけます。",
  },
  {
    icon: DoorOpen,
    title: "一時退院",
    message: "病院からの一時退院時にも看護師がサポート。ご自宅での過ごし方や健康管理のポイントをお伝えします。",
  },
  {
    icon: Heart,
    title: "日頃の健康チェック",
    message: "定期的な健康チェックで、日々の体調管理をサポート。小さな変化にも気づき、早期に対応いたします。",
  },
];

export default function YourNurseFeaturesPage() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCase(index);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  return (
    <>
      <YourNurseHeroSection 
        title="事例紹介"
        description={
          <>
            どのようなことが出来るのか一例を載せています。
            <br />
            こんなことも出来る？等はお気軽にお問い合わせ下さい。
          </>
        }
      />

      {/* 事例紹介セクション */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {cases.map((caseItem, index) => (
              <PremiumCaseCard
                key={index}
                icon={caseItem.icon}
                title={caseItem.title}
                index={index}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* モーダル */}
      {selectedCase !== null && (
        <CaseModal
          isOpen={selectedCase !== null}
          onClose={handleCloseModal}
          icon={cases[selectedCase].icon}
          title={cases[selectedCase].title}
          message={cases[selectedCase].message}
        />
      )}
    </>
  );
}

