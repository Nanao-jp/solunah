import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import SolunahHeroSection from "@/components/ui/SolunahHeroSection";

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <SolunahHeroSection title="サービス内容" />
      <Services />
      <Footer />
    </main>
  );
}







