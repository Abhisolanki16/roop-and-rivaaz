"use client";

import React from "react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { Heart, ShoppingBag, MessageCircle, ArrowRight, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickInquiryProduct,
    cart,
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isInCart = cart.some((item) => item.product.id === product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article className="group relative bg-[#fffdf9] border border-[#b58a3a]/25 rounded-sm overflow-hidden hover:border-[#b58a3a]/60 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Image Frame */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#f4ecdf] cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          style={{ objectPosition: product.position || "center" }}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {!product.inStock && (
            <span className="bg-[#35141f] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs shadow-md border border-[#e1bf75]/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> SOLD OUT
            </span>
          )}
          {product.badge && product.inStock && (
            <span className="bg-[#7b1e3a] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent && discountPercent > 0 && product.inStock && (
            <span className="bg-[#c5902f] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-colors z-10 ${
            isFavorited
              ? "bg-[#7b1e3a] text-white"
              : "bg-white/80 text-[#35141f] hover:bg-white hover:text-[#7b1e3a]"
          }`}
          title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist"
        >
          <Heart size={15} fill={isFavorited ? "currentColor" : "none"} />
        </button>

        {/* Quick Action Overlay (Touch & Hover Friendly) */}
        <div className="absolute inset-x-2.5 bottom-2.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300 flex gap-2 z-10">
          {product.inStock ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="btn-primary flex-1 py-2 px-1.5 sm:px-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 sm:gap-1.5 shadow-md cursor-pointer leading-tight text-center"
              >
                {isInCart ? <Check size={13} className="text-white shrink-0" /> : <ShoppingBag size={13} className="text-white shrink-0" />}
                <span className="text-white font-bold">{isInCart ? "In Bag" : "Add to Bag"}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickInquiryProduct(product);
                }}
                className="btn-whatsapp p-2 rounded-xs shadow-md cursor-pointer shrink-0"
                title="Enquire on WhatsApp"
                aria-label="WhatsApp Inquiry"
              >
                <MessageCircle size={16} className="text-white" />
              </button>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickInquiryProduct(product);
              }}
              className="w-full py-2 px-3 bg-[#35141f] hover:bg-[#4a1828] text-[#e1bf75] text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 shadow-md border border-[#e1bf75]/40 cursor-pointer transition-colors"
            >
              <MessageCircle size={14} className="text-[#e1bf75]" />
              <span>Sold Out • Request Restock</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-[#7b1e3a] font-semibold uppercase tracking-widest mb-1">
          {product.category}
        </p>

        <h3
          onClick={() => onSelect(product)}
          className="font-serif font-semibold text-base text-[#261d1c] hover:text-[#7b1e3a] transition-colors cursor-pointer line-clamp-1 mb-2"
        >
          {product.name}
        </h3>

        <div className="mt-auto pt-3 border-t border-[#e8ddcd] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm text-[#7b1e3a]">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#746863] line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onSelect(product)}
            className="text-[11px] font-semibold text-[#c5902f] hover:text-[#7b1e3a] flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
          >
            View <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
