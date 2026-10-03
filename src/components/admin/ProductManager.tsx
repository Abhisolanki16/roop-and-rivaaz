"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import ImageUploadPicker from "@/components/common/ImageUploadPicker";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  Search,
  Filter,
  LayoutGrid,
  List,
  Eye,
  Sparkles,
  Image as ImageIcon,
  Tag,
} from "lucide-react";

export default function ProductManager() {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, setSelectedProduct } =
    useStore();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState<"all" | "inStock" | "outOfStock">("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Jhumkas",
    price: 499,
    originalPrice: 799,
    image: "",
    additionalImages: "",
    description: "",
    material: "",
    colour: "",
    occasion: "",
    style: "",
    inStock: true,
    isFeatured: false,
    badge: "",
  });

  const categories = [
    "All",
    "Jhumkas",
    "Earrings",
    "Navratri",
    "Accessories",
    "Bangles",
    "Necklaces",
  ];

  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.length - inStockCount;
  const featuredCount = products.filter((p) => p.isFeatured).length;

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "Jhumkas",
      price: 499,
      originalPrice: 799,
      image:
        "https://images.unsplash.com/photo-1714733831162-0a6e849141be?auto=format&fit=crop&w=1000&q=88",
      additionalImages: "",
      description: "",
      material: "High Grade Brass Alloy & Handcrafted Polish",
      colour: "Antique Gold",
      occasion: "Festive, Weddings & Parties",
      style: "Statement Jhumka",
      inStock: true,
      isFeatured: false,
      badge: "New",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      image: p.image,
      additionalImages: p.additionalImages?.join(", ") || "",
      description: p.description || "",
      material: p.material || "",
      colour: p.colour || "",
      occasion: p.occasion || "",
      style: p.style || "",
      inStock: p.inStock,
      isFeatured: !!p.isFeatured,
      badge: p.badge || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.image.trim()) {
      alert("Product name and primary image URL are required");
      return;
    }

    const additionalImagesArray = formData.additionalImages
      ? formData.additionalImages
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [formData.image];

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice) || undefined,
        image: formData.image,
        additionalImages: additionalImagesArray,
        description: formData.description,
        material: formData.material,
        colour: formData.colour,
        occasion: formData.occasion,
        style: formData.style,
        inStock: formData.inStock,
        isFeatured: formData.isFeatured,
        badge: formData.badge || undefined,
      });
    } else {
      addProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice) || undefined,
        image: formData.image,
        additionalImages: additionalImagesArray,
        description: formData.description,
        material: formData.material,
        colour: formData.colour,
        occasion: formData.occasion,
        style: formData.style,
        inStock: formData.inStock,
        isFeatured: formData.isFeatured,
        badge: formData.badge || undefined,
      });
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "inStock" && p.inStock) ||
      (stockFilter === "outOfStock" && !p.inStock);
    return matchesSearch && matchesCat && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#e8ddcd]">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#35141f]">
            Product Catalog Management
          </h2>
          <p className="text-xs text-[#746863] mt-1">
            Configure, edit, and organize all jewellery pieces displayed on your storefront.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* View Mode Switcher */}
          <div className="hidden sm:flex items-center bg-[#f4ecdf] p-1 rounded-xs border border-[#e8ddcd]">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-xs transition-colors flex items-center gap-1 text-xs font-semibold ${
                viewMode === "table"
                  ? "bg-[#35141f] text-white shadow-xs"
                  : "text-[#746863] hover:text-[#35141f]"
              }`}
              title="Table View"
            >
              <List size={15} />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-xs transition-colors flex items-center gap-1 text-xs font-semibold ${
                viewMode === "cards"
                  ? "bg-[#35141f] text-white shadow-xs"
                  : "text-[#746863] hover:text-[#35141f]"
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid size={15} />
              <span>Cards</span>
            </button>
          </div>

          {/* Add Product Button */}
          <button
            onClick={openAddModal}
            className="btn-primary w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Plus size={16} className="text-white" />
            <span className="text-white font-bold">+ Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xs border border-[#e8ddcd] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#746863]">Total Listed</span>
          <span className="font-serif font-bold text-lg text-[#35141f]">{products.length}</span>
        </div>
        <div className="bg-white p-3 rounded-xs border border-[#e8ddcd] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-emerald-700">In Stock</span>
          <span className="font-serif font-bold text-lg text-emerald-700">{inStockCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xs border border-[#e8ddcd] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-red-600">Out of Stock</span>
          <span className="font-serif font-bold text-lg text-red-600">{outOfStockCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xs border border-[#e8ddcd] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#c5902f]">Featured Pieces</span>
          <span className="font-serif font-bold text-lg text-[#c5902f]">{featuredCount}</span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-xs border border-[#e8ddcd] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="flex items-center gap-2 bg-[#fcfaf5] border border-[#e8ddcd] px-3 py-2 rounded-xs w-full md:w-80">
            <Search size={15} className="text-[#746863] shrink-0" />
            <input
              type="text"
              placeholder="Search by title, category, material..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-[#261d1c] focus:outline-hidden"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-[#746863] hover:text-[#35141f]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Stock Filter Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#746863] font-medium shrink-0">Stock:</span>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="bg-[#fcfaf5] border border-[#e8ddcd] px-3 py-1.5 rounded-xs text-xs text-[#35141f] focus:outline-hidden font-medium"
            >
              <option value="all">All Products</option>
              <option value="inStock">In Stock Only ({inStockCount})</option>
              <option value="outOfStock">Out of Stock ({outOfStockCount})</option>
            </select>
          </div>
        </div>

        {/* Categories Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#f4ecdf] scrollbar-none">
          <Filter size={14} className="text-[#746863] shrink-0" />
          <span className="text-xs text-[#746863] font-medium shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-xs transition-all whitespace-nowrap uppercase tracking-wider font-semibold cursor-pointer shrink-0 ${
                categoryFilter === cat
                  ? "bg-[#7b1e3a] text-white shadow-xs font-bold"
                  : "bg-[#f4ecdf] text-[#35141f] hover:bg-[#e8ddcd] border border-[#e8ddcd]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: TABLE VIEW (Optimized with Fixed Aspect Ratio Thumbnails & Clean Spacing) */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xs border border-[#e8ddcd] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#f4ecdf] text-[#35141f] uppercase tracking-wider font-semibold border-b border-[#e8ddcd]">
                <tr>
                  <th className="py-3.5 px-4 w-20">Photo</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Product Name & Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Availability</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8ddcd]">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#746863]">
                      No products found matching your search and category filters.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#fcfaf5] transition-colors group">
                      {/* Fixed Dimension Thumbnail Box (Prevents wide stretched banner bug!) */}
                      <td className="py-3 px-4">
                        <div className="w-16 h-16 min-w-[64px] max-w-[64px] h-16 rounded-xs overflow-hidden border border-[#e8ddcd] bg-[#f4ecdf] shadow-xs">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                          />
                        </div>
                      </td>

                      {/* Product Name & Description */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <strong className="font-serif font-semibold text-sm text-[#35141f] block leading-tight">
                            {p.name}
                          </strong>
                          <p className="text-[11px] text-[#746863] line-clamp-1 max-w-sm">
                            {p.description || "Handcrafted festive jewellery"}
                          </p>
                          {p.material && (
                            <span className="text-[10px] text-[#b58a3a] block">
                              Material: {p.material}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3 px-4">
                        <span className="inline-block bg-[#f4ecdf] text-[#7b1e3a] px-2.5 py-1 rounded-xs font-bold uppercase text-[10px] tracking-wider border border-[#b58a3a]/25">
                          {p.category}
                        </span>
                      </td>

                      {/* Price Column */}
                      <td className="py-3 px-4">
                        <div>
                          <span className="font-bold text-sm text-[#7b1e3a]">₹{p.price}</span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <div className="text-[10px] text-[#746863] line-through">
                              MRP ₹{p.originalPrice}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Stock Switch Pill & Mark as Sold */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStock(p.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[11px] font-bold transition-all cursor-pointer shadow-xs ${
                              p.inStock
                                ? "bg-red-50 hover:bg-red-100 text-red-700 border border-red-300"
                                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300"
                            }`}
                            title={p.inStock ? "Click to mark this product as Sold / Out of Stock" : "Click to restock"}
                          >
                            {p.inStock ? <Tag size={12} /> : <CheckCircle2 size={12} />}
                            <span>{p.inStock ? "Mark as Sold" : "Restock (In Stock)"}</span>
                          </button>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              p.inStock
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {p.inStock ? "Active" : "Sold"}
                          </span>
                        </div>
                      </td>

                      {/* Badges */}
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.badge && (
                            <span className="bg-[#7b1e3a] text-white text-[9px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
                              {p.badge}
                            </span>
                          )}
                          {p.isFeatured && (
                            <span className="bg-[#c5902f] text-white text-[9px] font-bold px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-0.5">
                              <Star size={10} fill="currentColor" /> Featured
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedProduct(p)}
                            className="p-2 text-[#746863] hover:text-[#35141f] hover:bg-[#f4ecdf] rounded-xs transition-colors cursor-pointer"
                            title="Preview Piece"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 text-[#35141f] hover:text-[#7b1e3a] hover:bg-[#f4ecdf] rounded-xs transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: RESPONSIVE CARDS VIEW (Ideal for Tablet & Mobile Screen Sizes) */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-white rounded-xs border border-[#e8ddcd] text-[#746863]">
              No products found matching your filters.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xs border border-[#e8ddcd] p-4 shadow-xs hover:border-[#b58a3a]/60 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex gap-3">
                  <div className="w-20 h-24 shrink-0 rounded-xs overflow-hidden border border-[#e8ddcd] bg-[#f4ecdf]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#7b1e3a] font-bold uppercase tracking-wider block">
                      {p.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#35141f] truncate">
                      {p.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-sm text-[#7b1e3a]">₹{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-[10px] text-[#746863] line-through">
                          MRP ₹{p.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.badge && (
                        <span className="bg-[#7b1e3a] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-xs">
                          {p.badge}
                        </span>
                      )}
                      {p.isFeatured && (
                        <span className="bg-[#c5902f] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-xs flex items-center gap-0.5">
                          <Star size={9} fill="currentColor" /> Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e8ddcd] flex items-center justify-between">
                  <button
                    onClick={() => toggleStock(p.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[11px] font-bold cursor-pointer transition-all shadow-xs ${
                      p.inStock
                        ? "bg-red-50 hover:bg-red-100 text-red-700 border border-red-300"
                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}
                    title={p.inStock ? "Click to mark as Sold" : "Click to restock"}
                  >
                    {p.inStock ? <Tag size={12} /> : <CheckCircle2 size={12} />}
                    <span>{p.inStock ? "Mark as Sold" : "Restock (In Stock)"}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 text-[#35141f] hover:text-[#7b1e3a] bg-[#f4ecdf] rounded-xs cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 bg-red-50 rounded-xs cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add / Edit Product Modal with Live Photo Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-[#fcfaf5] rounded-xs border-2 border-[#c5902f]/40 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-[#e8ddcd]">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#c5902f]" />
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#35141f]">
                  {editingProduct ? "Edit Product Details" : "Add New Jewellery Piece"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#746863] hover:text-[#35141f] text-base p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Kundan Chandbali"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-medium"
                  >
                    <option value="Jhumkas">Jhumkas</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Navratri">Navratri Specials</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Bangles">Bangles</option>
                    <option value="Necklaces">Necklaces</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-bold text-[#7b1e3a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Original / MRP Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 999"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, originalPrice: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bestseller, Trending"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>
              </div>

              {/* Primary Image with Device Picker & Firebase Storage Upload */}
              <ImageUploadPicker
                label="Primary Product Photo"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="products"
                required
              />

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Additional Gallery Images (Comma-separated URLs)
                </label>
                <input
                  type="text"
                  placeholder="https://..., https://..."
                  value={formData.additionalImages}
                  onChange={(e) => setFormData({ ...formData, additionalImages: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Craftsmanship Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Details about stone setting, metal plating, and styling advice..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">Material</label>
                  <input
                    type="text"
                    placeholder="e.g. Brass Alloy, German Silver, Pearls"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">Occasion</label>
                  <input
                    type="text"
                    placeholder="e.g. Navratri, Sangeet, Festive Celebrations"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#35141f] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="accent-[#7b1e3a] w-4 h-4"
                  />
                  <span>In Stock (Customer can purchase)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-[#35141f] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-[#c5902f] w-4 h-4"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#e8ddcd] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-[#e8ddcd] text-[#746863] text-xs font-semibold rounded-xs hover:bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-7 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs shadow-md cursor-pointer"
                >
                  <span className="text-white font-bold">
                    {editingProduct ? "Save Changes" : "Create Product"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
