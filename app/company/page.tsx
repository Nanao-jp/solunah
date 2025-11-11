import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Company from "@/components/Company";
import SolunahHeroSection from "@/components/ui/SolunahHeroSection";

export default function CompanyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <SolunahHeroSection title="会社情報" />
      <Company />
      <Footer />
    </main>
  );
}







