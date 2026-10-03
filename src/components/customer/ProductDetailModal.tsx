"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { X, Heart, ShoppingBag, MessageCircle, ShieldCheck, ArrowRight, Check } from "lucide-react";
import ProductCard from "./ProductCard";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    cart,
    settings,
    setSelectedProduct,
  } = useStore();

  const galleryImages = product.additionalImages?.length
    ? product.additionalImages
    : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isFavorited = isInWishlist(product.id);
  const isInCart = cart.some((item) => item.product.id === product.id);

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleDirectWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hi ${settings.storeName}! I am interested in purchasing:\n\n*${product.name}*\nPrice: ₹${product.price}\nCategory: ${product.category}\nLink: ${window.location.origin}/collection\n\nPlease let me know if it's available and share UPI payment details!`
    );
    window.open(`https://wa.me/${settings.adminWhatsApp}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#fcfaf5] rounded-xs shadow-2xl border border-[#c5902f]/40 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Close Bar */}
        <div className="p-4 bg-[#f4ecdf]/70 border-b border-[#e8ddcd] flex items-center justify-between">
          <div className="text-[10px] tracking-widest uppercase font-semibold text-[#746863]">
            <span>COLLECTION</span> /{" "}
            <span className="text-[#7b1e3a]">{product.category}</span> /{" "}
            <span className="text-[#35141f]">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#746863] hover:text-[#35141f] rounded-full hover:bg-black/5"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-4/5 w-full rounded-xs overflow-hidden border border-[#e8ddcd] bg-[#f4ecdf] shadow-inner relative">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#7b1e3a] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-18 h-20 shrink-0 rounded-xs overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-[#c5902f] shadow-md scale-95"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-[10px] text-[#7b1e3a] font-bold uppercase tracking-widest mb-1.5">
                  {product.category}
                </p>
                <h1 className="font-serif font-semibold text-3xl sm:text-4xl text-[#35141f] leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-bold text-2xl text-[#7b1e3a]">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#746863] line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                    Inclusive of all taxes
                  </span>
                </div>
              </div>

              <div className="w-12 h-[2px] bg-[#c5902f]" />

              <p className="text-xs sm:text-sm text-[#746863] leading-relaxed">
                {product.description ||
                  "A striking handcrafted statement piece with intricate detailing, selected to bring an expressive finish to festive and traditional looks."}
              </p>

              {/* Specifications Matrix */}
              <div className="border-y border-[#e8ddcd] py-4 text-xs space-y-2.5">
                <div className="grid grid-cols-3">
                  <span className="text-[#746863] font-medium">Material:</span>
                  <span className="col-span-2 text-[#261d1c] font-semibold">
                    {product.material || "High Grade Imitation Alloy & Handcrafted Enamel"}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-[#746863] font-medium">Colour:</span>
                  <span className="col-span-2 text-[#261d1c]">
                    {product.colour || "Antique Gold & Pearl"}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-[#746863] font-medium">Occasion:</span>
                  <span className="col-span-2 text-[#261d1c]">
                    {product.occasion || "Festive, Garba, Weddings & Parties"}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-[#746863] font-medium">Availability:</span>
                  <span className="col-span-2 font-semibold">
                    {product.inStock ? (
                      <span className="text-emerald-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        In Stock (Ships in 24 Hours)
                      </span>
                    ) : (
                      <span className="text-red-700 flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        Sold Out (Message to Pre-order)
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {product.inStock ? (
                  <>
                    <div className="flex gap-3">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn-primary flex-1 py-3.5 px-6 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        {isInCart ? <Check size={16} className="text-white" /> : <ShoppingBag size={16} className="text-white" />}
                        <span>{isInCart ? "Item in Bag (Add Another)" : "Add to Festive Bag"}</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-3.5 border rounded-xs transition-colors cursor-pointer ${
                          isFavorited
                            ? "bg-[#7b1e3a] text-white border-[#7b1e3a]"
                            : "border-[#e8ddcd] bg-white text-[#35141f] hover:border-[#7b1e3a]"
                        }`}
                        title="Wishlist"
                      >
                        <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <button
                      onClick={handleDirectWhatsAppOrder}
                      className="btn-whatsapp w-full py-3.5 px-6 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <MessageCircle size={18} className="text-white" />
                      <span>Direct Purchase on WhatsApp</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleDirectWhatsAppOrder}
                    className="btn-whatsapp w-full py-4 px-6 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle size={18} className="text-white" />
                    <span>Inquire / Request Restock on WhatsApp</span>
                  </button>
                )}
              </div>

              {/* Delivery Assurance */}
              <div className="flex items-center gap-2 text-[11px] text-[#746863] bg-[#f4ecdf]/50 p-3 rounded-xs border border-[#e8ddcd]">
                <ShieldCheck size={18} className="text-[#c5902f] shrink-0" />
                <span>
                  No complicated payment gateway needed. Secure manual UPI transfer with direct
                  WhatsApp verification.
                </span>
              </div>
            </div>
          </div>

          {/* Related Products Recommendation */}
          {relatedProducts.length > 0 && (
            <div className="pt-10 border-t border-[#e8ddcd]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[9px] font-bold text-[#7b1e3a] uppercase tracking-widest">
                    CURATED MATCHES
                  </p>
                  <h3 className="font-serif font-semibold text-2xl text-[#35141f]">
                    You May Also Like
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard
                    key={rel.id}
                    product={rel}
                    onSelect={(p) => {
                      setSelectedProduct(p);
                      setActiveImageIndex(0);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
