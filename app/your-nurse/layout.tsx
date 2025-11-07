import YourNurseNavigation from "@/components/YourNurseNavigation";
import Footer from "@/components/Footer";

export default function YourNurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <YourNurseNavigation />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}

