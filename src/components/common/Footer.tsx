"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { Phone, MessageCircle, Shield } from "lucide-react";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

export default function Footer() {
  const { settings, setActiveTab } = useStore();

  const navigate = (tab: "home" | "collection" | "checkout" | "admin", selector?: string) => {
    if (tab === "admin") {
      window.location.href = "/admin";
      return;
    }
    setActiveTab(tab);
    if (selector) {
      setTimeout(() => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="bg-[#35141f] text-white pt-16 pb-8 border-t border-[#c5902f]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#e1bf75]/20">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#e1bf75] rounded-[50%_50%_4px_50%] -rotate-45 flex items-center justify-center">
                <span className="rotate-45 text-white font-serif font-bold text-xl leading-none">
                  R
                </span>
              </div>
              <div>
                <strong className="block text-white font-serif font-semibold text-xl tracking-[0.16em] leading-none">
                  {settings.storeName}
                </strong>
                <small className="block mt-1 text-[#e1bf75] text-[8px] tracking-[0.22em] font-medium uppercase">
                  {settings.subheading || "WOMEN'S ACCESSORIES & LIFESTYLE"}
                </small>
              </div>
            </div>

            <p className="text-[#cbbab5] text-xs leading-relaxed max-w-sm">
              Elegant earrings, necklaces, bangles, hair accessories, bags &amp; more — for every celebration.
            </p>

            <div className="pt-1 text-[10px] text-[#e1bf75] font-semibold tracking-wider uppercase">
              STYLISH • VERSATILE • CELEBRATION READY
            </div>

            <div className="pt-2 text-xs text-[#e1bf75] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct WhatsApp Assistance &amp; Manual UPI Acceptance
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-[#e1bf75] text-[11px] font-semibold uppercase tracking-widest">
              Explore
            </p>
            <ul className="space-y-2 text-xs text-[#d9ccc8]">
              <li>
                <button
                  onClick={() => navigate("home")}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("collection")}
                  className="hover:text-white transition-colors"
                >
                  Full Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("home", "#story")}
                  className="hover:text-white transition-colors"
                >
                  The Navratri Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("admin")}
                  className="hover:text-[#e1bf75] transition-colors flex items-center gap-1.5"
                >
                  <Shield size={12} /> Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="space-y-3">
            <p className="text-[#e1bf75] text-[11px] font-semibold uppercase tracking-widest">
              Connect With Us
            </p>
            <ul className="space-y-2.5 text-xs text-[#d9ccc8]">
              <li>
                <a
                  href={`https://wa.me/${settings.adminWhatsApp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle size={15} /> WhatsApp Orders
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-pink-400 transition-colors"
                >
                  <InstagramIcon size={15} /> @roopandrivaaz.jewels
                </a>
              </li>
              <li>
                <a
                  href={`tel:${settings.adminPhone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={15} /> {settings.adminPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#9f8c87] gap-3">
          <span>© {new Date().getFullYear()} {settings.storeName}. All rights reserved. • <em>Make Every Occasion Special.</em></span>
          <span>Where Beauty Meets Tradition</span>
        </div>
      </div>
    </footer>
  );
}
