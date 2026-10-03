"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { initialPhotos } from "@/data/initialProducts";

interface CategoryShowcaseProps {
  onSelectCategory: (category: string) => void;
}

export default function CategoryShowcase({ onSelectCategory }: CategoryShowcaseProps) {
  const { homeContent } = useStore();
  const showcase = homeContent?.showcase;

  const defaultEdits = [
    {
      label: "Women’s Jhumkas",
      category: "Jhumkas",
      count: "18 designs",
      image: initialPhotos.jhumkas,
      accentBorder: "border-b-4 border-[#c5902f]",
    },
    {
      label: "Navratri Specials",
      category: "Navratri",
      count: "12 designs",
      image: initialPhotos.navratri,
      accentBorder: "border-b-4 border-[#a62e62]",
    },
    {
      label: "Festive Add-ons",
      category: "Accessories",
      count: "10 designs",
      image: initialPhotos.bangles,
      accentBorder: "border-b-4 border-[#d36b2d]",
    },
  ];

  const edits = showcase?.edits && showcase.edits.length > 0 ? showcase.edits : defaultEdits;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Intro */}
        <div className="lg:col-span-3 space-y-3">
          <p className="text-[11px] font-bold text-[#7b1e3a] uppercase tracking-widest">
            {showcase?.eyebrow || "SHOP THE EDITS"}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#35141f] leading-tight">
            {showcase?.title || "Made to move with you"}
          </h2>
          <p className="text-xs sm:text-sm text-[#746863] leading-relaxed">
            {showcase?.description || "Classic bells, vibrant Garba dance details, and finishing touches for every festive ensemble."}
          </p>
        </div>

        {/* Category Cards */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {edits.map((item, idx) => (
            <div
              key={item.label}
              onClick={() => onSelectCategory(item.category)}
              className={`group relative h-96 rounded-xs overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 ${
                item.accentBorder || (idx === 0 ? "border-b-4 border-[#c5902f]" : idx === 1 ? "border-b-4 border-[#a62e62]" : "border-b-4 border-[#d36b2d]")
              } ${idx === 1 ? "sm:-translate-y-4" : ""}`}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#261d1c]/90 via-[#261d1c]/30 to-transparent" />

              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                <div>
                  <span className="block text-[9px] text-[#e1bf75] font-bold tracking-widest uppercase mb-1">
                    {item.count}
                  </span>
                  <h3 className="font-serif font-semibold text-2xl leading-none">
                    {item.label}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#c5902f] group-hover:text-[#35141f] transition-colors">
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
