"use client";

import React, { useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/common/CartDrawer";
import Hero from "@/components/customer/Hero";
import CategoryShowcase from "@/components/customer/CategoryShowcase";
import ProductCard from "@/components/customer/ProductCard";
import ProductGrid from "@/components/customer/ProductGrid";
import EditorialSection from "@/components/customer/EditorialSection";
import BrandPromise from "@/components/customer/BrandPromise";
import ProductDetailModal from "@/components/customer/ProductDetailModal";
import WhatsAppInquiryModal from "@/components/customer/WhatsAppInquiryModal";
import CheckoutView from "@/components/checkout/CheckoutView";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Sparkles } from "lucide-react";

export default function App() {
  const {
    activeTab,
    setActiveTab,
    products,
    selectedProduct,
    setSelectedProduct,
    quickInquiryProduct,
    setQuickInquiryProduct,
    settings,
    homeContent,
  } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const featuredPieces = products.filter((p) => p.isFeatured).slice(0, 4);
  const displayPieces = featuredPieces.length > 0 ? featuredPieces : products.slice(0, 4);

  const handleOpenGeneralWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${settings.storeName}! 👋 I have an inquiry regarding your jewellery collection. Could you please assist me?`
    );
    window.open(`https://wa.me/${settings.adminWhatsApp}?text=${text}`, "_blank");
  };

  const { user } = useAuth();

  // If Admin portal is active, enforce authentication
  if (activeTab === "admin") {
    if (!user) {
      return <AdminLogin />;
    }
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf5] text-[#261d1c]">
      <Header />

      <main className="flex-1">
        {/* HOME VIEW */}
        {activeTab === "home" && (
          <div>
            <Hero
              onExplore={() => setActiveTab("collection")}
              onEnquire={handleOpenGeneralWhatsApp}
            />

            <CategoryShowcase
              onSelectCategory={(cat) => {
                setActiveTab("collection");
              }}
            />

            {/* Curated Collection Preview Grid */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                <span className="text-[10px] font-bold text-[#7b1e3a] uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Sparkles size={13} className="text-[#c5902f]" />
                  {homeContent?.featured?.eyebrow || "HANDPICKED SELECTIONS"}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#35141f]">
                  {homeContent?.featured?.title || "Jhumkas for Every Mood"}
                </h2>
                <p className="text-xs sm:text-sm text-[#746863] leading-relaxed">
                  {homeContent?.featured?.subtitle || "From delicate everyday bells to bold festive pairs, find the piece that feels like you."}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {displayPieces.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={() => setActiveTab("collection")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#7b1e3a] hover:text-[#35141f] uppercase tracking-widest border-b-2 border-[#c5902f] pb-1 transition-colors cursor-pointer"
                >
                  {homeContent?.featured?.viewAllButtonText || "View All Pieces"} <ArrowRight size={15} />
                </button>
              </div>
            </section>

            <EditorialSection onExploreNavratri={() => setActiveTab("collection")} />

            <BrandPromise onEnquire={handleOpenGeneralWhatsApp} />
          </div>
        )}

        {/* COLLECTION VIEW */}
        {activeTab === "collection" && (
          <ProductGrid onSelectProduct={(p) => setSelectedProduct(p)} />
        )}

        {/* CHECKOUT VIEW */}
        {activeTab === "checkout" && <CheckoutView />}
      </main>

      <Footer />

      {/* Global Modals & Slide-overs */}
      <CartDrawer />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {quickInquiryProduct && (
        <WhatsAppInquiryModal
          product={quickInquiryProduct}
          onClose={() => setQuickInquiryProduct(null)}
        />
      )}
    </div>
  );
}
