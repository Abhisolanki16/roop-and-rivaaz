"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import ProductCard from "./ProductCard";
import { Search, Sparkles, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
}

export default function ProductGrid({ onSelectProduct, initialCategory }: ProductGridProps) {
  const { products, searchQuery, setSearchQuery } = useStore();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All Pieces");
  const [sortBy, setSortBy] = useState<"featured" | "lowToHigh" | "highToLow" | "newest">("featured");
  const [priceRange, setPriceRange] = useState<"all" | "under500" | "500to800" | "above800">("all");

  const isFiltered =
    selectedCategory !== "All Pieces" ||
    priceRange !== "all" ||
    sortBy !== "featured" ||
    searchQuery.trim().length > 0;

  const categories = [
    "All Pieces",
    "Earrings",
    "Jhumkas",
    "Necklaces",
    "Bangles",
    "Hair Accessories",
    "Bags & More",
    "Navratri Specials",
  ];

  const filteredProducts = products.filter((p) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.material && p.material.toLowerCase().includes(q));
      if (!matches) return false;
    }

    // Category match
    if (selectedCategory !== "All Pieces") {
      if (selectedCategory === "Navratri Specials") {
        if (p.category !== "Navratri" && p.category !== "Navratri Specials" && !p.name.toLowerCase().includes("navratri")) {
          return false;
        }
      } else if (selectedCategory === "Bags & More") {
        if (p.category !== "Accessories" && p.category !== "Bags & More") {
          return false;
        }
      } else if (selectedCategory === "Earrings") {
        if (p.category !== "Earrings" && p.category !== "Jhumkas") {
          return false;
        }
      } else if (p.category !== selectedCategory) {
        return false;
      }
    }

    // Price range match
    if (priceRange === "under500" && p.price >= 500) return false;
    if (priceRange === "500to800" && (p.price < 500 || p.price > 800)) return false;
    if (priceRange === "above800" && p.price <= 800) return false;

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "lowToHigh") return a.price - b.price;
    if (sortBy === "highToLow") return b.price - a.price;
    if (sortBy === "newest") return (b.createdAt || "").localeCompare(a.createdAt || "");
    // Default featured
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Catalog Hero Banner */}
      <div className="text-center space-y-3 py-10 bg-[#f4ecdf]/70 rounded-xs border border-[#b58a3a]/25 px-4">
        <span className="text-[10px] font-bold text-[#7b1e3a] uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-[#c5902f]" />
          STYLISH • VERSATILE • CELEBRATION READY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#35141f]">
          Accessorize Your <em className="text-[#7b1e3a] italic font-normal">Celebrations</em>
        </h1>
        <p className="text-xs sm:text-sm text-[#746863] max-w-xl mx-auto leading-relaxed">
          Discover our latest collection of earrings, necklaces, bangles, hair accessories, bags &amp; more.
        </p>
      </div>

      {/* Control Bar: Categories & Sorting */}
      <div className="space-y-4">
        {/* Categories Tab Strip */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 border-b border-[#e8ddcd] scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs py-2 px-3.5 sm:px-4 rounded-xs whitespace-nowrap transition-all uppercase tracking-wider font-semibold cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#7b1e3a] text-white font-bold shadow-xs border border-[#c5902f]/50"
                  : "bg-white text-[#35141f] hover:text-[#7b1e3a] hover:bg-[#fcfaf5] border border-[#e8ddcd]"
              }`}
            >
              <span className={selectedCategory === cat ? "text-white font-bold" : ""}>
                {cat}
              </span>
            </button>
          ))}
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xs border border-[#e8ddcd] space-y-3">
          {/* Main Controls Row: Search + Price + Sort + Count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex items-center bg-[#fcfaf5] border border-[#e8ddcd] px-3 py-2 rounded-xs focus-within:border-[#7b1e3a] transition-colors w-full md:w-72 shrink-0">
              <Search size={14} className="text-[#746863] shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Search in collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-[#261d1c] focus:outline-hidden w-full placeholder:text-[#998b82]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[#746863] hover:text-[#7b1e3a] p-0.5 ml-1 cursor-pointer shrink-0"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter & Sort Dropdowns: perfectly balanced 2-column grid on mobile, inline flex on tablet/desktop */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full md:w-auto">
              {/* Price Filter Box (label and select are strictly locked together) */}
              <div
                className={`flex items-center bg-[#fcfaf5] border rounded-xs px-2.5 py-1.5 transition-colors ${
                  priceRange !== "all"
                    ? "border-[#7b1e3a] bg-[#7b1e3a]/5"
                    : "border-[#e8ddcd] hover:border-[#b58a3a]"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#746863] shrink-0 mr-1.5 select-none">
                  <SlidersHorizontal size={13} className={priceRange !== "all" ? "text-[#7b1e3a]" : "text-[#746863]"} />
                  <span className="text-xs font-semibold text-[#35141f]">Price:</span>
                </div>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as any)}
                  className="bg-transparent text-xs text-[#35141f] font-medium focus:outline-hidden w-full cursor-pointer truncate"
                >
                  <option value="all">All Prices</option>
                  <option value="under500">Under ₹500</option>
                  <option value="500to800">₹500 - ₹800</option>
                  <option value="above800">₹800+</option>
                </select>
              </div>

              {/* Sort Filter Box (label and select are strictly locked together) */}
              <div
                className={`flex items-center bg-[#fcfaf5] border rounded-xs px-2.5 py-1.5 transition-colors ${
                  sortBy !== "featured"
                    ? "border-[#7b1e3a] bg-[#7b1e3a]/5"
                    : "border-[#e8ddcd] hover:border-[#b58a3a]"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#746863] shrink-0 mr-1.5 select-none">
                  <ArrowUpDown size={13} className={sortBy !== "featured" ? "text-[#7b1e3a]" : "text-[#746863]"} />
                  <span className="text-xs font-semibold text-[#35141f]">Sort:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-[#35141f] font-medium focus:outline-hidden w-full cursor-pointer truncate"
                >
                  <option value="featured">Featured</option>
                  <option value="lowToHigh">Price: Low - High</option>
                  <option value="highToLow">Price: High - Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Desktop / Tablet Piece Counter & Reset */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {isFiltered && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All Pieces");
                    setPriceRange("all");
                    setSortBy("featured");
                    setSearchQuery("");
                  }}
                  className="text-[11px] font-bold text-[#7b1e3a] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Reset filters</span>
                  <X size={12} />
                </button>
              )}
              <span className="text-[#746863] font-semibold tracking-wider text-[11px] uppercase">
                {sortedProducts.length} {sortedProducts.length === 1 ? "Piece" : "Pieces"}
              </span>
            </div>
          </div>

          {/* Mobile Status Row (Piece counter + Reset button) */}
          <div className="flex md:hidden items-center justify-between pt-2 border-t border-[#f0e6d6] text-xs text-[#746863]">
            <span className="font-semibold tracking-wider text-[11px] uppercase">
              {sortedProducts.length} {sortedProducts.length === 1 ? "Piece" : "Pieces"}
            </span>

            {isFiltered && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Pieces");
                  setPriceRange("all");
                  setSortBy("featured");
                  setSearchQuery("");
                }}
                className="text-[11px] font-bold text-[#7b1e3a] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Reset filters</span>
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-xs border border-[#e8ddcd] p-8 space-y-3">
          <p className="font-serif text-2xl text-[#35141f]">No matching pieces found</p>
          <p className="text-xs text-[#746863]">
            Try clearing your search term or switching to "All Pieces".
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All Pieces");
              setPriceRange("all");
              setSearchQuery("");
            }}
            className="px-6 py-2 bg-[#7b1e3a] text-white text-xs font-semibold rounded-xs uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  );
}
