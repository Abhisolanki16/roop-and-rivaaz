"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { CustomerDetails, Order } from "@/types";
import {
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  MessageCircle,
  ArrowLeft,
  QrCode,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutView() {
  const {
    cart,
    cartSubtotal,
    settings,
    placeOrder,
    setActiveTab,
  } = useStore();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Gujarat",
    pincode: "",
    notes: "",
  });

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingFee = cartSubtotal >= settings.freeShippingAbove ? 0 : settings.standardShippingFee;
  const totalAmount = cartSubtotal + shippingFee;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(settings.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!customer.fullName.trim()) err.fullName = "Full name is required";
    if (!customer.phone.trim() || customer.phone.replace(/\D/g, "").length < 10)
      err.phone = "Valid 10-digit WhatsApp number is required";
    if (!customer.address.trim()) err.address = "Complete shipping address is required";
    if (!customer.city.trim()) err.city = "City is required";
    if (!customer.pincode.trim() || customer.pincode.length < 6)
      err.pincode = "Valid 6-digit PIN code is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePlaceOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    if (cart.length === 0) return;

    // Record order in system
    const order = placeOrder(customer);
    setCompletedOrder(order);

    // Format rich WhatsApp message
    const itemsList = order.items
      .map((item, idx) => `${idx + 1}. *${item.name}* (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`)
      .join("\n");

    const message = `🛍️ *NEW ORDER - ${settings.storeName.toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━
*Order ID:* #${order.id}
*Customer:* ${customer.fullName}
*WhatsApp Phone:* ${customer.phone}
${customer.email ? `*Email:* ${customer.email}\n` : ""}
*📍 Delivery Address:*
${customer.address}
${customer.city}, ${customer.state} - ${customer.pincode}
${customer.notes ? `*Gift / Order Note:* ${customer.notes}\n` : ""}
*📦 Order Items:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
*Subtotal:* ₹${order.subtotal}
*Shipping:* ${order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee}`}
*TOTAL PAYABLE:* *₹${order.totalAmount}*

━━━━━━━━━━━━━━━━━━━━
*Hello ${settings.storeName}!* 👋
Please share your *UPI Payment QR Code* for *₹${order.totalAmount}*. I will make the payment immediately and send the screenshot here to confirm my order! 🙏`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${settings.adminWhatsApp}?text=${encoded}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  // If order was placed, show success summary screen
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle size={36} />
        </div>

        <div>
          <span className="text-xs font-bold text-[#c5902f] uppercase tracking-widest">
            ORDER INITIATED
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#35141f] mt-1">
            Order #{completedOrder.id} Placed!
          </h1>
          <p className="text-xs sm:text-sm text-[#746863] mt-2 max-w-md mx-auto">
            Your order details have been redirected to our WhatsApp desk. Complete your UPI transfer
            and share the screenshot to initiate instant packing.
          </p>
        </div>

        {/* Payment Summary Box */}
        <div className="bg-[#fcfaf5] border-2 border-[#c5902f]/40 p-6 rounded-xs max-w-lg mx-auto text-left shadow-lg space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#e8ddcd]">
            <span className="text-xs text-[#746863]">Amount to Transfer:</span>
            <span className="font-serif font-bold text-2xl text-[#7b1e3a]">
              ₹{completedOrder.totalAmount}
            </span>
          </div>

          <div className="bg-[#f4ecdf] p-3 rounded-xs border border-[#e8ddcd] flex items-center justify-between">
            <div>
              <small className="text-[10px] text-[#746863] uppercase block">Store UPI ID</small>
              <strong className="font-mono text-sm text-[#35141f]">{settings.upiId}</strong>
            </div>
            <button
              onClick={handleCopyUpi}
              className="px-3 py-1.5 bg-[#c5902f] text-white text-xs font-semibold rounded-xs flex items-center gap-1 hover:bg-[#e1bf75] transition-colors"
            >
              {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
              {copiedUpi ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="text-xs text-[#746863] space-y-1">
            <p><strong>Shipping to:</strong> {completedOrder.customer.fullName}</p>
            <p className="truncate">
              {completedOrder.customer.address}, {completedOrder.customer.city} -{" "}
              {completedOrder.customer.pincode}
            </p>
          </div>

          <a
            href={`https://wa.me/${settings.adminWhatsApp}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-md"
          >
            <MessageCircle size={16} /> Re-open WhatsApp Chat
          </a>
        </div>

        <div className="pt-4">
          <button
            onClick={() => setActiveTab("collection")}
            className="text-xs font-semibold text-[#7b1e3a] hover:underline uppercase tracking-wider inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} /> Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // If bag is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#f4ecdf] flex items-center justify-center text-[#746863] mx-auto">
          <ShoppingBag size={30} />
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#35141f]">Your Bag is Empty</h2>
        <p className="text-xs text-[#746863]">
          Please add jewellery pieces from our collection before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveTab("collection")}
          className="mt-4 px-6 py-2.5 bg-[#7b1e3a] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#35141f] transition-all"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Breadcrumb / Back button */}
      <button
        onClick={() => setActiveTab("collection")}
        className="text-xs text-[#746863] hover:text-[#7b1e3a] flex items-center gap-1.5 mb-6 uppercase tracking-wider font-semibold"
      >
        <ArrowLeft size={14} /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Delivery Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xs border border-[#b58a3a]/30 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-bold text-[#7b1e3a] uppercase tracking-widest">
              STEP 1 OF 2
            </span>
            <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-[#35141f]">
              Delivery Details
            </h2>
            <p className="text-xs text-[#746863] mt-1">
              Please provide accurate delivery coordinates so we can dispatch your parcel.
            </p>
          </div>

          <form onSubmit={handlePlaceOrderWhatsApp} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Radhika Patel"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-[#fcfaf5] border text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] ${
                    errors.fullName ? "border-red-500" : "border-[#e8ddcd]"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  WhatsApp Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-[#fcfaf5] border text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] ${
                    errors.phone ? "border-red-500" : "border-[#e8ddcd]"
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="e.g. radhika@gmail.com"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Street Address, Flat / House No., Landmark *
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Flat 302, Gokul Heights, Opposite City Mall, SG Highway"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                className={`w-full px-3.5 py-2.5 bg-[#fcfaf5] border text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] ${
                  errors.address ? "border-red-500" : "border-[#e8ddcd]"
                }`}
              />
              {errors.address && (
                <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">City *</label>
                <input
                  type="text"
                  placeholder="e.g. Ahmedabad"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-[#fcfaf5] border text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] ${
                    errors.city ? "border-red-500" : "border-[#e8ddcd]"
                  }`}
                />
                {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">State *</label>
                <select
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                >
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Other">Other States</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 380015"
                  maxLength={6}
                  value={customer.pincode}
                  onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-[#fcfaf5] border text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] ${
                    errors.pincode ? "border-red-500" : "border-[#e8ddcd]"
                  }`}
                />
                {errors.pincode && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1">
                Order Notes / Festive Gift Wrapping Request (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Please pack in a gift box with festive ribbon"
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn-whatsapp w-full py-4 px-6 rounded-xs text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle size={18} className="text-white" />
                <span className="text-white font-bold">Confirm & Place Order on WhatsApp</span>
              </button>
              <p className="text-[11px] text-center text-[#746863] mt-2">
                Clicking will open WhatsApp with your pre-filled order details & shipping address.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary & Manual UPI Guide */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order Items Summary */}
          <div className="bg-[#fcfaf5] p-6 rounded-xs border border-[#b58a3a]/30 shadow-xs space-y-4">
            <h3 className="font-serif font-semibold text-lg text-[#35141f] pb-3 border-b border-[#e8ddcd]">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            <div className="divide-y divide-[#e8ddcd] max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="py-3 flex gap-3 items-center text-xs">
                  <div className="w-12 h-14 min-w-[48px] max-w-[48px] shrink-0 rounded-xs overflow-hidden border border-[#e8ddcd] bg-[#f4ecdf]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#35141f] truncate">{item.product.name}</p>
                    <p className="text-[#746863]">
                      Qty: {item.quantity} × ₹{item.product.price}
                    </p>
                  </div>
                  <strong className="text-[#7b1e3a] font-bold">
                    ₹{item.product.price * item.quantity}
                  </strong>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#e8ddcd] space-y-2 text-xs">
              <div className="flex justify-between text-[#746863]">
                <span>Items Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-[#746863]">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#35141f] pt-2 border-t border-[#e8ddcd]">
                <span>Total Payable</span>
                <span className="text-[#7b1e3a] font-serif text-xl">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Manual UPI Transfer Box */}
          <div className="bg-gradient-to-br from-[#35141f] to-[#4a1828] text-white p-6 rounded-xs border border-[#c5902f]/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#e1bf75]">
                <QrCode size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  MANUAL UPI PAYMENT
                </span>
              </div>
              <span className="text-[10px] bg-[#e1bf75]/20 text-[#e1bf75] px-2 py-0.5 rounded-xs border border-[#e1bf75]/30">
                Zero Fees
              </span>
            </div>

            <p className="text-xs text-[#eadfd7] leading-relaxed">
              Transfer total amount of <strong className="text-[#e1bf75]">₹{totalAmount}</strong> via
              Google Pay, PhonePe, Paytm, or BHIM to our store UPI:
            </p>

            {/* UPI ID Pill */}
            <div className="bg-white/10 p-3 rounded-xs border border-white/20 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#e1bf75] block">
                  Official UPI ID
                </span>
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  {settings.upiId}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="px-3 py-1.5 bg-[#c5902f] hover:bg-[#e1bf75] text-[#35141f] text-[11px] font-bold rounded-xs flex items-center gap-1 transition-colors"
              >
                {copiedUpi ? <Check size={13} /> : <Copy size={13} />}
                {copiedUpi ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Payee Name */}
            <p className="text-[11px] text-[#d2c2be]">
              <strong>Payee Name:</strong> {settings.upiPayeeName}
            </p>

            {/* 3 Step Instruction */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-[11px] text-[#eadfd7]">
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#c5902f] text-[#35141f] text-[9px] font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                Copy UPI ID & complete transfer of ₹{totalAmount}.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#c5902f] text-[#35141f] text-[9px] font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                Click the green WhatsApp button below.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#c5902f] text-[#35141f] text-[9px] font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                Attach payment screenshot in chat for verification.
              </p>
            </div>
          </div>

          {/* Assurance */}
          <div className="p-4 bg-[#fcfaf5] rounded-xs border border-[#e8ddcd] flex items-center gap-3 text-xs text-[#746863]">
            <ShieldCheck size={24} className="text-[#c5902f] shrink-0" />
            <p>
              Direct artisan connection. You will chat directly with the store owner to confirm your
              ring size, jhumka style, or delivery schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
