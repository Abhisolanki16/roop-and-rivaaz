"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import ProductManager from "./ProductManager";
import OrderManager from "./OrderManager";
import SettingsManager from "./SettingsManager";
import HomeContentManager from "./HomeContentManager";
import {
  Package,
  ShoppingCart,
  Settings,
  Store,
  Shield,
  Sparkles,
  TrendingUp,
  Sliders,
  LogOut,
  Cloud,
  CloudOff,
  User,
} from "lucide-react";

export default function AdminDashboard() {
  const { products, orders, settings, setActiveTab, isFirebaseActive } = useStore();
  const { user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<"products" | "orders" | "settings" | "homeContent">("products");

  const pendingOrders = orders.filter((o) => o.status === "Pending Payment").length;
  const inStockCount = products.filter((p) => p.inStock).length;

  return (
    <div className="min-h-screen bg-[#fcfaf5] pb-20">
      {/* Admin Top Navigation */}
      <div className="bg-[#35141f] text-white border-b border-[#c5902f]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#e1bf75] rounded-[50%_50%_4px_50%] -rotate-45 flex items-center justify-center bg-[#7b1e3a]/40 shadow-xs">
              <span className="rotate-45 text-white font-serif font-bold text-lg leading-none">
                R
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <strong className="font-serif text-lg tracking-wider text-white">
                  {settings.storeName}
                </strong>
                <span className="bg-[#c5902f] text-[#35141f] text-[9px] font-bold px-1.5 py-0.2 rounded-xs uppercase tracking-widest">
                  ADMIN
                </span>
                {isFirebaseActive ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-semibold">
                    <Cloud size={10} /> Cloud Sync Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-semibold">
                    <CloudOff size={10} /> Local Storage Cache
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#e1bf75] tracking-widest uppercase">
                {user?.email ? `Logged in: ${user.email}` : "Product & Order Control"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setActiveTab("home");
                window.location.href = "/";
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#e1bf75] text-xs font-semibold uppercase tracking-wider rounded-xs border border-[#e1bf75]/30 transition-colors cursor-pointer"
            >
              <Store size={14} /> View Storefront
            </button>

            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-200 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-xs border border-red-500/40 transition-colors cursor-pointer"
              title="Sign Out of Admin"
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xs border border-[#e8ddcd] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#746863] uppercase tracking-wider font-semibold">
                Total Products
              </span>
              <p className="font-serif font-bold text-2xl text-[#35141f] mt-1">
                {products.length}
              </p>
              <span className="text-[11px] text-emerald-700 font-medium">
                {inStockCount} In Stock
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#f4ecdf] flex items-center justify-center text-[#7b1e3a]">
              <Package size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xs border border-[#e8ddcd] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#746863] uppercase tracking-wider font-semibold">
                WhatsApp Orders
              </span>
              <p className="font-serif font-bold text-2xl text-[#35141f] mt-1">
                {orders.length}
              </p>
              <span className="text-[11px] text-[#c5902f] font-medium">
                {pendingOrders} Pending Verification
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
              <ShoppingCart size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xs border border-[#e8ddcd] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#746863] uppercase tracking-wider font-semibold">
                WhatsApp Number
              </span>
              <p className="font-mono text-sm font-bold text-[#35141f] mt-1">
                +{settings.adminWhatsApp}
              </p>
              <span className="text-[11px] text-emerald-700 font-medium">Active for Orders</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#25D366]">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xs border border-[#e8ddcd] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#746863] uppercase tracking-wider font-semibold">
                Store UPI ID
              </span>
              <p className="font-mono text-xs font-bold text-[#7b1e3a] mt-1 truncate max-w-[140px]">
                {settings.upiId}
              </p>
              <span className="text-[11px] text-[#746863] font-medium">Manual Transfer</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#e8ddcd] bg-white px-4 rounded-xs shadow-xs">
          <button
            onClick={() => setCurrentTab("products")}
            className={`py-4 px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              currentTab === "products"
                ? "border-[#7b1e3a] text-[#7b1e3a]"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <Package size={16} /> Products ({products.length})
          </button>

          <button
            onClick={() => setCurrentTab("orders")}
            className={`py-4 px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              currentTab === "orders"
                ? "border-[#7b1e3a] text-[#7b1e3a]"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <ShoppingCart size={16} /> Orders & Inquiries ({orders.length})
            {pendingOrders > 0 && (
              <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                {pendingOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab("homeContent")}
            className={`py-4 px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              currentTab === "homeContent"
                ? "border-[#7b1e3a] text-[#7b1e3a]"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <Sparkles size={16} /> Home Content &amp; Banners
          </button>

          <button
            onClick={() => setCurrentTab("settings")}
            className={`py-4 px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              currentTab === "settings"
                ? "border-[#7b1e3a] text-[#7b1e3a]"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <Settings size={16} /> Store & UPI Settings
          </button>
        </div>

        {/* Tab Content */}
        {currentTab === "products" && <ProductManager />}
        {currentTab === "orders" && <OrderManager />}
        {currentTab === "homeContent" && <HomeContentManager />}
        {currentTab === "settings" && <SettingsManager />}
      </div>
    </div>
  );
}
