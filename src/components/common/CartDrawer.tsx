"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    settings,
    setActiveTab,
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveTab("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcfaf5] shadow-2xl flex flex-col border-l border-[#c5902f]/30 animate-slideLeft">
          {/* Header */}
          <div className="p-5 border-b border-[#e8ddcd] flex items-center justify-between bg-[#f4ecdf]/60">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#7b1e3a]" />
              <h2 className="font-serif font-bold text-xl text-[#35141f]">Your Festive Bag</h2>
              <span className="text-xs bg-[#c5902f] text-white px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#746863] hover:text-[#35141f] rounded-full hover:bg-black/5"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#e8ddcd]">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#f4ecdf] flex items-center justify-center text-[#746863] mb-4">
                  <ShoppingBag size={30} />
                </div>
                <h3 className="font-serif font-semibold text-lg text-[#35141f] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#746863] max-w-xs mb-6">
                  Explore our handcrafted jhumkas, chandbalis, and festive accessories.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab("collection");
                  }}
                  className="px-6 py-2.5 bg-[#7b1e3a] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#35141f] transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 items-center">
                  <div className="w-16 h-20 min-w-[64px] max-w-[64px] shrink-0 rounded-xs overflow-hidden border border-[#b58a3a]/30 bg-[#f4ecdf]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#7b1e3a] font-semibold uppercase tracking-wider">
                      {item.product.category}
                    </p>
                    <h4 className="font-serif font-semibold text-sm text-[#35141f] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-bold text-[#7b1e3a] mt-0.5">
                      ₹{item.product.price}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#e8ddcd] bg-white rounded-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#746863] hover:text-[#35141f]"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#35141f]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#746863] hover:text-[#35141f]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#746863] hover:text-[#7b1e3a] text-xs p-1 ml-auto"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#e8ddcd] bg-white space-y-4 shadow-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#746863]">Subtotal</span>
                <span className="font-serif font-bold text-lg text-[#35141f]">
                  ₹{cartSubtotal}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#746863]">
                <span>Shipping</span>
                <span>
                  {cartSubtotal >= settings.freeShippingAbove
                    ? "FREE"
                    : `₹${settings.standardShippingFee}`}
                </span>
              </div>

              <div className="pt-2 border-t border-[#f4ecdf] flex justify-between items-center">
                <span className="font-semibold text-sm text-[#35141f]">Estimated Total</span>
                <span className="font-serif font-bold text-xl text-[#7b1e3a]">
                  ₹
                  {cartSubtotal +
                    (cartSubtotal >= settings.freeShippingAbove
                      ? 0
                      : settings.standardShippingFee)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#746863] bg-[#fcfaf5] p-2.5 rounded-sm border border-[#e8ddcd]">
                <ShieldCheck size={16} className="text-[#c5902f] shrink-0" />
                <span>Manual UPI payment & direct order confirmation on WhatsApp.</span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="btn-primary w-full py-3.5 px-4 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span className="text-white font-bold">Proceed to Checkout</span>
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
