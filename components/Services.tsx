"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { allServices } from "@/data/services";
import { fadeInUpStyle, getDelayByIndex } from "@/utils/animations";

export default function Services() {
  const services = allServices;

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="サービス内容" />

        <div className="space-y-24">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-stretch gap-12"
                style={fadeInUpStyle(getDelayByIndex(index, 0.1), 0.6)}
              >
                {/* テキスト部分 */}
                <div className="flex-1 w-full">
                  <div className="h-full flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-orange-500" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light mb-4 text-slate-900 tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* 画像部分 */}
                <div className="flex-1 w-full">
                  <ImagePlaceholder icon={IconComponent} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

