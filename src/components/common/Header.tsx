"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { ShoppingBag, Heart, Search, Menu, X, Shield } from "lucide-react";

export default function Header() {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    setIsCartOpen,
    wishlist,
    settings,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navigate = (tab: "home" | "collection" | "checkout" | "admin", scrollTarget?: string) => {
    if (tab === "admin") {
      window.location.href = "/admin";
      return;
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (scrollTarget) {
      setTimeout(() => {
        const el = document.querySelector(scrollTarget);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="header sticky top-0 z-50 bg-[#fbf7ef]/95 backdrop-blur-md border-b border-[#b58a3a]/25">
      {/* Top Announcement Bar */}
      {settings.announcement && (
        <div className="bg-[#35141f] text-[#e1bf75] text-[10px] sm:text-[11px] font-semibold py-1.5 px-4 text-center tracking-widest uppercase border-b border-[#c5902f]/30 flex items-center justify-center gap-2">
          <span>✨</span>
          <span>{settings.announcement}</span>
          <span>✨</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 text-left group transition-transform hover:scale-[1.01]"
          aria-label="Roop & Rivaaz Home"
        >
          <div className="w-10 h-10 border border-[#c5902f] rounded-[50%_50%_4px_50%] -rotate-45 flex items-center justify-center bg-[#fcfaf5] shadow-xs group-hover:border-[#7b1e3a] transition-colors">
            <span className="rotate-45 text-[#7b1e3a] font-serif font-bold text-2xl leading-none">
              R
            </span>
          </div>
          <div>
            <strong className="block text-[#35141f] font-serif font-semibold text-xl tracking-[0.16em] leading-none">
              {settings.storeName}
            </strong>
            <small className="block mt-1 text-[#746863] text-[9px] tracking-[0.22em] font-medium uppercase">
              {settings.subheading || "WOMEN'S ACCESSORIES & LIFESTYLE"}
            </small>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-[#261d1c]">
          <button
            onClick={() => navigate("home")}
            className={`transition-colors py-1 relative hover:text-[#7b1e3a] ${
              activeTab === "home" ? "text-[#7b1e3a] font-semibold" : ""
            }`}
          >
            Home
            {activeTab === "home" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5902f]" />
            )}
          </button>

          <button
            onClick={() => navigate("collection")}
            className={`transition-colors py-1 relative hover:text-[#7b1e3a] ${
              activeTab === "collection" ? "text-[#7b1e3a] font-semibold" : ""
            }`}
          >
            Collection
            {activeTab === "collection" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5902f]" />
            )}
          </button>

          <button
            onClick={() => navigate("home", "#story")}
            className="hover:text-[#7b1e3a] transition-colors py-1"
          >
            Our Story
          </button>

          <button
            onClick={() => navigate("home", "#footer")}
            className="hover:text-[#7b1e3a] transition-colors py-1"
          >
            Contact
          </button>
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-[#f4ecdf] rounded-full px-3 py-1.5 border border-[#c5902f]/40 animate-fadeIn">
                <Search size={15} className="text-[#746863] mr-2" />
                <input
                  type="text"
                  placeholder="Search jhumkas, sets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate("collection");
                    }
                  }}
                  autoFocus
                  className="bg-transparent text-xs text-[#261d1c] focus:outline-hidden w-28 sm:w-44 placeholder:text-[#746863]/60"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery("");
                  }}
                  className="text-[#746863] hover:text-[#261d1c]"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowSearchInput(true);
                  if (activeTab !== "collection") navigate("collection");
                }}
                className="p-2 text-[#35141f] hover:text-[#7b1e3a] rounded-full hover:bg-[#f4ecdf]/70 transition-colors"
                title="Search Products"
                aria-label="Search"
              >
                <Search size={19} />
              </button>
            )}
          </div>

          {/* Wishlist count */}
          <button
            onClick={() => navigate("collection")}
            className="relative p-2 text-[#35141f] hover:text-[#7b1e3a] rounded-full hover:bg-[#f4ecdf]/70 transition-colors"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#7b1e3a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#35141f] hover:text-[#7b1e3a] rounded-full hover:bg-[#f4ecdf]/70 transition-colors flex items-center gap-1.5"
            title="Shopping Bag"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="bg-[#c5902f] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Switcher Button */}
          <button
            onClick={() => navigate("admin")}
            className={`hidden sm:flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-xs border transition-all cursor-pointer ${
              activeTab === "admin"
                ? "bg-[#35141f] text-[#e1bf75] border-[#c5902f] shadow-xs"
                : "bg-white text-[#7b1e3a] border-[#7b1e3a]/50 hover:bg-[#7b1e3a] hover:text-white shadow-xs"
            }`}
            title="Admin Portal (Manage products & orders)"
          >
            <Shield size={13} />
            <span>Admin Portal</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#35141f] hover:text-[#7b1e3a]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcfaf5] border-b border-[#b58a3a]/30 px-6 py-5 shadow-lg flex flex-col gap-4 animate-slideDown">
          <button
            onClick={() => navigate("home")}
            className="text-left text-sm font-semibold tracking-wider text-[#35141f] py-2 border-b border-[#e8ddcd]"
          >
            Home
          </button>
          <button
            onClick={() => navigate("collection")}
            className="text-left text-sm font-semibold tracking-wider text-[#35141f] py-2 border-b border-[#e8ddcd]"
          >
            Collection
          </button>
          <button
            onClick={() => navigate("home", "#story")}
            className="text-left text-sm font-semibold tracking-wider text-[#35141f] py-2 border-b border-[#e8ddcd]"
          >
            Our Story
          </button>
          <button
            onClick={() => navigate("home", "#footer")}
            className="text-left text-sm font-semibold tracking-wider text-[#35141f] py-2 border-b border-[#e8ddcd]"
          >
            Contact & Support
          </button>
          <button
            onClick={() => navigate("admin")}
            className="flex items-center gap-2 text-left text-sm font-bold tracking-wider text-[#7b1e3a] py-2"
          >
            <Shield size={16} /> Admin Portal
          </button>
        </div>
      )}
    </header>
  );
}
