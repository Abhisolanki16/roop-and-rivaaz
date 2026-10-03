"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { OrderStatus } from "@/types";
import {
  MessageCircle,
  Package,
  Calendar,
  MapPin,
  Clock,
  Trash2,
  Search,
  Filter,
} from "lucide-react";

export default function OrderManager() {
  const { orders, updateOrderStatus, deleteOrder, settings } = useStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses: OrderStatus[] = [
    "Pending Payment",
    "Payment Verified",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Pending Payment":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Payment Verified":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Processing":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.phone.includes(search) ||
      o.customer.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleChatWithCustomer = (phone: string, customerName: string, orderId: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
    const text = encodeURIComponent(
      `Hello ${customerName}! 👋 This is ${settings.storeName} regarding your recent Order #${orderId}. How may we assist you with dispatch details?`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#e8ddcd]">
        <h2 className="font-serif font-bold text-2xl text-[#35141f]">
          Customer Orders & Inquiries
        </h2>
        <p className="text-xs text-[#746863]">
          Track orders placed through WhatsApp redirection with manual UPI payment confirmation.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xs border border-[#e8ddcd]">
        <div className="flex items-center gap-2 bg-[#fcfaf5] border border-[#e8ddcd] px-3 py-1.5 rounded-xs w-full sm:w-72">
          <Search size={15} className="text-[#746863]" />
          <input
            type="text"
            placeholder="Search by Order ID, name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-[#261d1c] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter size={14} className="text-[#746863] shrink-0" />
          <span className="text-xs text-[#746863] font-medium shrink-0">Filter Status:</span>
          {["All", ...statuses].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`text-xs px-2.5 py-1 rounded-xs transition-colors shrink-0 ${
                statusFilter === st
                  ? "bg-[#35141f] text-white font-semibold"
                  : "bg-[#f4ecdf] text-[#35141f] hover:bg-[#e8ddcd]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xs border border-[#e8ddcd] text-[#746863]">
            <Package size={36} className="mx-auto text-[#b58a3a]/40 mb-2" />
            <h3 className="font-serif font-bold text-base text-[#35141f]">No Orders Yet</h3>
            <p className="text-xs mt-1">
              Customer orders placed via WhatsApp checkout will appear here in real-time.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xs border border-[#e8ddcd] p-5 shadow-xs space-y-4 hover:border-[#b58a3a]/50 transition-colors"
            >
              {/* Order Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#e8ddcd]">
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-base text-[#35141f]">
                    #{order.id}
                  </span>
                  <span className="text-xs text-[#746863] flex items-center gap-1">
                    <Calendar size={13} />
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      if (confirm(`Delete order #${order.id}?`)) {
                        deleteOrder(order.id);
                      }
                    }}
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Delete Record"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Order Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Customer Details */}
                <div className="md:col-span-4 space-y-2 text-xs">
                  <p className="font-semibold text-sm text-[#35141f]">
                    {order.customer.fullName}
                  </p>
                  <p className="text-[#7b1e3a] font-mono font-bold">
                    📞 {order.customer.phone}
                  </p>
                  <div className="flex items-start gap-1.5 text-[#746863]">
                    <MapPin size={14} className="shrink-0 mt-0.5 text-[#c5902f]" />
                    <span>
                      {order.customer.address}, {order.customer.city}, {order.customer.state} -{" "}
                      {order.customer.pincode}
                    </span>
                  </div>
                  {order.customer.notes && (
                    <p className="bg-[#fcfaf5] p-2 rounded-xs border border-[#e8ddcd] text-[#746863] italic">
                      Note: "{order.customer.notes}"
                    </p>
                  )}

                  <button
                    onClick={() =>
                      handleChatWithCustomer(
                        order.customer.phone,
                        order.customer.fullName,
                        order.id
                      )
                    }
                    className="btn-whatsapp mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-xs cursor-pointer shadow-xs"
                  >
                    <MessageCircle size={14} className="text-white" />
                    <span className="text-white font-bold">WhatsApp Customer</span>
                  </button>
                </div>

                {/* Items preview */}
                <div className="md:col-span-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#746863] tracking-wider block">
                    Ordered Pieces ({order.items.length})
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs py-1 border-b border-[#f4ecdf] last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-9 min-w-[32px] max-w-[32px] shrink-0 rounded-xs overflow-hidden border border-[#e8ddcd] bg-[#f4ecdf]">
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-[#35141f] truncate max-w-[180px]">
                            {item.name} <small className="text-[#746863]">× {item.quantity}</small>
                          </span>
                        </div>
                        <span className="font-bold text-[#7b1e3a]">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Payment Info */}
                <div className="md:col-span-3 bg-[#fcfaf5] p-3 rounded-xs border border-[#e8ddcd] text-xs space-y-2">
                  <div className="flex justify-between text-[#746863]">
                    <span>Subtotal:</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#746863]">
                    <span>Shipping:</span>
                    <span>{order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#35141f] pt-1 border-t border-[#e8ddcd]">
                    <span>Total:</span>
                    <span className="text-[#7b1e3a] font-serif text-base">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#746863] pt-1">
                    <span>Payment Mode:</span>{" "}
                    <strong className="text-[#35141f]">{order.paymentMethod}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
