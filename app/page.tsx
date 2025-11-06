import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";
import NewsSection from "@/components/NewsSection";
import CTASection from "@/components/CTASection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main className="min-h-screen relative z-10">
      <Navigation />
      <Hero />
      
      <FeaturesSection />

      <SectionDivider variant="default" />

      <ServicesSection />

      <SectionDivider variant="default" />

      <NewsSection />

      <SectionDivider variant="default" />

      <CTASection />
      
      <Footer />
    </main>
  );
}
