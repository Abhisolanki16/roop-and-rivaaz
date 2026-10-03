"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { initialPhotos } from "@/data/initialProducts";

interface EditorialSectionProps {
  onExploreNavratri: () => void;
}

export default function EditorialSection({ onExploreNavratri }: EditorialSectionProps) {
  const { homeContent } = useStore();
  const editorial = homeContent?.editorial;

  return (
    <section id="story" className="bg-[#35141f] text-white py-20 lg:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Layered Visuals */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 w-4/5 rounded-xs overflow-hidden border border-[#e1bf75]/30 shadow-2xl">
              <img
                src={editorial?.largeImage || initialPhotos.editorial}
                alt={editorial?.titleAccent || "Navratri festive jewellery styling"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-4 border border-[#e1bf75]/40 pointer-events-none" />
            </div>

            {/* Overlapping Detail Image */}
            <div className="absolute -bottom-8 -right-2 sm:right-6 w-3/5 aspect-square rounded-xs overflow-hidden border-8 border-[#35141f] shadow-2xl">
              <img
                src={editorial?.smallImage || initialPhotos.bangles}
                alt="Traditional mirrorwork bangles"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 pt-8 lg:pt-0 lg:pl-6">
            <div className="flex items-center gap-2 text-[#e1bf75] text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>{editorial?.eyebrow || "THE NAVRATRI EDIT"}</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05]">
              {editorial?.titlePrefix || "Nine nights."} <br />
              <em className="text-[#e1bf75] italic font-normal">
                {editorial?.titleAccent || "Endless colour."}
              </em>
            </h2>

            <div className="w-14 h-[2px] bg-[#c5902f]" />

            <div className="space-y-4 text-xs sm:text-sm text-[#d8cbc6] leading-relaxed font-light max-w-lg">
              <p>
                {editorial?.paragraph1 ||
                  "Dance-ready oxidised earrings, colourful bangles, and statement accessories chosen to complete your Garba and Dandiya looks with grace and confidence."}
              </p>
              <p>
                {editorial?.paragraph2 ||
                  "Lightweight, expressive, and easy to pair—festive pieces meticulously crafted for long nights of movement, music, and celebration."}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreNavratri}
                className="inline-flex items-center gap-2 text-[#e1bf75] hover:text-white text-xs font-semibold uppercase tracking-wider border-b border-[#c5902f] pb-1 transition-colors cursor-pointer"
              >
                {editorial?.buttonText || "Explore Navratri Specials"} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
