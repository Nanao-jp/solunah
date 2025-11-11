import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import About from "@/components/About";
import SolunahHeroSection from "@/components/ui/SolunahHeroSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <SolunahHeroSection title="事業紹介" />
      <About />
      <Footer />
    </main>
  );
}







