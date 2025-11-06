export interface NewsItem {
  date: string;
  category: string;
  title: string;
  description: string;
}

export const allNewsItems: NewsItem[] = [
  {
    date: "2025年11月1日",
    category: "お知らせ",
    title: "YOURNURSE新サービス開始のお知らせ",
    description: "保険外看護サービス「YOURNURSE」の新サービスを開始いたしました。",
  },
  {
    date: "2025年10月15日",
    category: "お知らせ",
    title: "サービスエリア拡大のお知らせ",
    description: "サービス提供エリアを拡大し、より多くの地域の方々にご利用いただけるようになりました。",
  },
  {
    date: "2025年9月20日",
    category: "お知らせ",
    title: "健康相談サービスの拡充について",
    description: "看護師による健康相談サービスを拡充し、より多くの方々に質の高いアドバイスを提供できるようになりました。",
  },
  {
    date: "2025年8月10日",
    category: "お知らせ",
    title: "株式会社SOLUNA設立のお知らせ",
    description: "この度、保険外看護サービス「YOURNURSE」を提供する株式会社SOLUNAを設立いたしました。",
  },
];

