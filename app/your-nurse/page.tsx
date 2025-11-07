import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function YourNursePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            YOUR NURSE（保険外看護）
          </h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-12 border border-slate-200">
            <p className="text-xl text-slate-600">
              準備中です。しばらくお待ちください。
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

