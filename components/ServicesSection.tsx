"use client";

import SunCard from "@/components/ui/SunCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { allServices } from "@/data/services";

const mainServices = allServices.slice(0, 2);

export default function ServicesSection() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="主要サービス" />

        <div className="space-y-24">
          {mainServices.map((service, index) => {
            const IconComponent = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-stretch gap-12 group`}
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* テキスト部分 */}
                <div className="flex-1 w-full flex">
                  <SunCard className="p-8 md:p-10 hover:shadow-xl transition-all duration-300 flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-orange-500" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-light mb-4 text-slate-900 tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg flex-grow font-light">
                      {service.description}
                    </p>
                  </SunCard>
                </div>

                {/* 画像部分 */}
                <div className="flex-1 w-full flex">
                  <ImagePlaceholder 
                    icon={IconComponent} 
                    className="shadow-xl group-hover:shadow-2xl transition-all duration-300 flex-1" 
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button href="/services" variant="secondary">
            サービス一覧を見る
          </Button>
        </div>
      </div>
    </section>
  );
}

