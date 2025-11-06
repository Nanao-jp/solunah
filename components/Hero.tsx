import AnimatedBackground from "@/components/ui/AnimatedBackground";
import HeroContent from "@/components/ui/HeroContent";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <HeroContent
        title="株式会社SOLUNA"
        subtitle="新しい看護の形を、あなたに"
        description={
          <>
            保険外看護サービス「YOURNURSE」を通じて、
            <br className="hidden md:block" />
            いつでも、どこでも、あなたの健康をサポートします
          </>
        }
      />
    </section>
  );
}

