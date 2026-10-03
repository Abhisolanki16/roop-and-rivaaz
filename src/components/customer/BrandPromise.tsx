"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";

interface BrandPromiseProps {
  onEnquire: () => void;
}

export default function BrandPromise({ onEnquire }: BrandPromiseProps) {
  const { homeContent } = useStore();
  const cta = homeContent?.cta;

  return (
    <div>
      {/* Final Call to Action Section */}
      <section className="bg-[#7b1e3a] text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <div className="w-10 h-10 rounded-full border border-[#e1bf75]/40 mx-auto flex items-center justify-center text-[#e1bf75]">
            <Sparkles size={20} />
          </div>

          <p className="text-[10px] font-bold text-[#e1bf75] uppercase tracking-widest">
            {cta?.eyebrow || "ROOP & RIVAAZ • MAKE EVERY OCCASION SPECIAL"}
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white leading-tight">
            {cta?.titlePrefix || "Accessorize Your"}{" "}
            <em className="italic font-normal text-[#e1bf75]">
              {cta?.titleAccent || "Festive You"}
            </em>
          </h2>

          <p className="text-xs sm:text-sm text-[#eadfd7] max-w-md mx-auto leading-relaxed font-light">
            {cta?.description ||
              "Connect directly with us on WhatsApp for earrings, necklaces, bangles, hair accessories, bags & more. Instant styling assistance and seamless manual UPI ordering."}
          </p>

          <div className="pt-4">
            <button
              onClick={onEnquire}
              className="px-8 py-3.5 bg-white text-[#7b1e3a] hover:bg-[#e1bf75] hover:text-[#35141f] text-xs font-bold uppercase tracking-widest rounded-xs inline-flex items-center gap-2 shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {cta?.buttonText || "Enquire on WhatsApp"} <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
