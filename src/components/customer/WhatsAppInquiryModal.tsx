"use client";

import React from "react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { X, MessageCircle, ShieldCheck } from "lucide-react";

interface WhatsAppInquiryModalProps {
  product: Product;
  onClose: () => void;
}

export default function WhatsAppInquiryModal({ product, onClose }: WhatsAppInquiryModalProps) {
  const { settings } = useStore();

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! 👋\n\nI want to inquire about this piece:\n✨ *${product.name}*\n🏷️ Price: ₹${product.price}\n📂 Category: ${product.category}\n\nCould you please share availability and manual UPI payment details?`
    );
    window.open(`https://wa.me/${settings.adminWhatsApp}?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#fcfaf5] rounded-xs shadow-2xl border-2 border-[#c5902f]/40 p-6 sm:p-8 text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#746863] hover:text-[#35141f] rounded-full hover:bg-black/5"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* WhatsApp Icon Circle */}
        <div className="w-14 h-14 rounded-full border border-[#c5902f] mx-auto flex items-center justify-center text-[#25D366] bg-emerald-50 shadow-inner">
          <MessageCircle size={28} />
        </div>

        <div>
          <p className="text-[10px] font-bold text-[#7b1e3a] uppercase tracking-widest">
            DIRECT INQUIRY
          </p>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#35141f] mt-1">
            Interested in this piece?
          </h2>
          <p className="text-xs text-[#746863] mt-1.5">
            We will personally assist you with availability, styling advice, and order confirmation.
          </p>
        </div>

        {/* Product Snapshot Card */}
        <div className="flex items-center gap-4 p-3 bg-[#f4ecdf] rounded-xs border border-[#e8ddcd] text-left">
          <div className="w-16 h-18 min-w-[64px] max-w-[64px] shrink-0 rounded-xs overflow-hidden border border-[#b58a3a]/30 bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] text-[#7b1e3a] font-bold uppercase tracking-wider block">
              {product.category}
            </span>
            <strong className="font-serif font-semibold text-sm text-[#35141f] block truncate">
              {product.name}
            </strong>
            <span className="text-xs font-bold text-[#7b1e3a] block mt-0.5">
              ₹{product.price}
            </span>
          </div>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleSendWhatsApp}
          className="btn-whatsapp w-full py-3.5 px-4 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <MessageCircle size={18} className="text-white" />
          <span className="text-white font-bold">Chat & Buy on WhatsApp</span>
        </button>

        <p className="text-[11px] text-[#746863] flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-[#c5902f]" />
          No online payment gateway needed • Direct UPI transfer
        </p>
      </div>
    </div>
  );
}
