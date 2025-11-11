import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SolunahHeroSection from "@/components/ui/SolunahHeroSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <SolunahHeroSection title="お問い合わせ" />
      <Contact />
      <Footer />
    </main>
  );
}







