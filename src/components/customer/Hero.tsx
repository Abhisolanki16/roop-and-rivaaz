"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { initialPhotos } from "@/data/initialProducts";

interface HeroProps {
  onExplore: () => void;
  onEnquire: () => void;
}

export default function Hero({ onExplore, onEnquire }: HeroProps) {
  const { products, setSelectedProduct, homeContent } = useStore();
  const featuredProduct = products[0];
  const heroData = homeContent?.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#35141f] via-[#2c1019] to-[#3a1522] text-white py-16 lg:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#c5902f]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#7b1e3a]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Headline */}
        <div className="lg:col-span-6 space-y-5 z-10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#fcfaf5]/10 border border-[#e1bf75]/30 text-[#e1bf75] text-[10px] font-semibold tracking-widest uppercase">
            <Sparkles size={13} />
            <span>{heroData?.badge || "NAVRATRI SPECIALS • TRADITIONAL LOOKS ❖ MODERN VIBES"}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.05]">
            {heroData?.headlinePrefix || "Accessorize Your"} <br />
            <em className="text-[#e1bf75] italic font-normal">
              {heroData?.headlineAccent || "Festive You."}
            </em>
          </h1>

          <p className="text-sm sm:text-base text-[#d2c2be] max-w-lg leading-relaxed font-light">
            {heroData?.subtitle || "Elegant earrings, necklaces, bangles, hair accessories, bags & more — for every celebration."}
          </p>

          {/* Actual Categories Bar */}
          <div className="flex flex-wrap items-center gap-2 py-1 text-[11px] text-[#e1bf75] font-semibold tracking-wider uppercase">
            {(heroData?.categoryTags && heroData.categoryTags.length > 0
              ? heroData.categoryTags
              : ["EARRINGS", "NECKLACES", "BANGLES", "HAIR ACCESSORIES", "BAGS & MORE"]
            ).map((cat, idx, arr) => (
              <React.Fragment key={idx}>
                <span>{cat}</span>
                {idx < arr.length - 1 && <span className="text-[#c5902f]/50">|</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExplore}
              className="px-8 py-3.5 bg-[#c5902f] hover:bg-[#e1bf75] text-[#35141f] text-xs font-bold uppercase tracking-widest rounded-xs flex items-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {heroData?.primaryButtonText || "Explore Collection"} <ArrowRight size={15} />
            </button>
            <button
              onClick={onEnquire}
              className="px-6 py-3.5 border border-[#e1bf75]/60 hover:bg-[#e1bf75]/10 text-white text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
            >
              {heroData?.secondaryButtonText || "Enquire on WhatsApp"}
            </button>
          </div>

          {/* Social Proof & Brand Pillars */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#d2c2be]">
            <div className="flex items-center gap-2">
              <div className="flex text-[#e1bf75]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span>{heroData?.trustBadgeText || "Curated With Love"}</span>
            </div>
            <span className="text-[10px] text-[#e1bf75] font-bold tracking-widest uppercase">
              {heroData?.brandPillars || "STYLISH • VERSATILE • CELEBRATION READY"}
            </span>
          </div>
        </div>

        {/* Right Column: Visual Frame */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Main Picture Frame */}
            <div className="relative aspect-4/5 rounded-xs overflow-hidden border-2 border-[#e1bf75]/40 shadow-2xl bg-[#261d1c]">
              <img
                src={heroData?.heroImage || initialPhotos.hero}
                alt={heroData?.headlineAccent || "Heritage Indian statement jewellery"}
                className="w-full h-full object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-4 border border-white/30 pointer-events-none" />
            </div>

            {/* Featured Product Floater Note Card */}
            {featuredProduct && (
              <div
                onClick={() => setSelectedProduct(featuredProduct)}
                className="absolute -bottom-6 -left-4 sm:left-6 bg-[#fcfaf5] text-[#35141f] p-4 sm:p-5 rounded-xs shadow-2xl border border-[#c5902f]/40 max-w-xs cursor-pointer hover:border-[#7b1e3a] transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between text-[9px] font-bold text-[#7b1e3a] uppercase tracking-wider mb-1">
                  <span>Jhumka of the week</span>
                  <span className="text-[#c5902f] font-serif font-bold text-xs">
                    ₹{featuredProduct.price}
                  </span>
                </div>
                <strong className="font-serif font-semibold text-base block text-[#35141f] mb-1">
                  {featuredProduct.name}
                </strong>
                <p className="text-[11px] text-[#746863] line-clamp-1 mb-2">
                  {featuredProduct.description}
                </p>
                <span className="text-[10px] font-bold text-[#c5902f] uppercase tracking-wider flex items-center gap-1">
                  View piece <ArrowRight size={12} />
                </span>
              </div>
            )}

            {/* Navratri Specials Floating Pill Badge (Matching Card Design) */}
            <div className="absolute -top-3 sm:-top-5 right-2 sm:right-4 bg-[#35141f]/95 border border-[#e1bf75] text-[#e1bf75] px-4 py-1.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase">
              <Sparkles size={12} className="text-[#e1bf75]" />
              <span>{heroData?.floatingBadgeTitle || "NAVRATRI SPECIALS"}</span>
              <span className="text-white/60 font-normal">❖</span>
              <span className="font-serif italic capitalize text-xs text-white font-normal">
                {heroData?.floatingBadgeSubtitle || "Traditional Looks Modern Vibes"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
