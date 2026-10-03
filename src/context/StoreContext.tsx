"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem, Order, CustomerDetails, OrderStatus, StoreSettings, HomepageContent } from "@/types";
import { initialProducts } from "@/data/initialProducts";
import { initialSettings } from "@/data/initialSettings";
import { initialHomepageContent } from "@/data/initialHomepageContent";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  subscribeToProducts,
  subscribeToOrders,
  subscribeToSettings,
  subscribeToHomeContent,
  saveProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  saveOrderToFirestore,
  updateOrderStatusInFirestore,
  deleteOrderFromFirestore,
  saveSettingsToFirestore,
  saveHomeContentToFirestore,
  seedInitialDataToFirestore,
} from "@/lib/firestoreSync";

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  orders: Order[];
  placeOrder: (customer: CustomerDetails, paymentRef?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;

  homeContent: HomepageContent;
  updateHomeContent: (updates: Partial<HomepageContent>) => void;
  resetHomeContent: () => void;

  activeTab: "home" | "collection" | "checkout" | "admin";
  setActiveTab: (tab: "home" | "collection" | "checkout" | "admin") => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  quickInquiryProduct: Product | null;
  setQuickInquiryProduct: (product: Product | null) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  isFirebaseActive: boolean;
  syncToFirebase: () => Promise<{ success: boolean; count: number }>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_PRODUCTS_KEY = "roop_rivaaz_products_v1";
const LOCAL_CART_KEY = "roop_rivaaz_cart_v1";
const LOCAL_WISHLIST_KEY = "roop_rivaaz_wishlist_v1";
const LOCAL_ORDERS_KEY = "roop_rivaaz_orders_v1";
const LOCAL_SETTINGS_KEY = "roop_rivaaz_settings_v2";
const LOCAL_HOME_CONTENT_KEY = "roop_rivaaz_home_content_v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(initialSettings);
  const [homeContent, setHomeContent] = useState<HomepageContent>(initialHomepageContent);

  const [activeTab, setActiveTab] = useState<"home" | "collection" | "checkout" | "admin">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickInquiryProduct, setQuickInquiryProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load saved state from localStorage on client-mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(LOCAL_PRODUCTS_KEY) || localStorage.getItem("aavira_products_v1");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }

      const savedCart = localStorage.getItem(LOCAL_CART_KEY) || localStorage.getItem("aavira_cart_v1");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedWishlist = localStorage.getItem(LOCAL_WISHLIST_KEY) || localStorage.getItem("aavira_wishlist_v1");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedOrders = localStorage.getItem(LOCAL_ORDERS_KEY) || localStorage.getItem("aavira_orders_v1");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      const savedSettings = localStorage.getItem(LOCAL_SETTINGS_KEY) || localStorage.getItem("aavira_settings_v1");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        // Seamlessly update to Roop & Rivaaz branding if previously default Aavira
        if (!parsed.storeName || parsed.storeName.toUpperCase().includes("AAVIRA") || !parsed.subheading) {
          parsed.storeName = initialSettings.storeName;
          parsed.subheading = initialSettings.subheading;
          parsed.tagline = initialSettings.tagline;
          parsed.announcement = initialSettings.announcement;
          parsed.upiId = initialSettings.upiId;
          parsed.upiPayeeName = initialSettings.upiPayeeName;
          parsed.adminEmail = initialSettings.adminEmail;
        }
        setSettings(parsed);
        localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(parsed));
      } else {
        setSettings(initialSettings);
        localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(initialSettings));
      }

      const savedHomeContent = localStorage.getItem(LOCAL_HOME_CONTENT_KEY);
      if (savedHomeContent) {
        try {
          const parsed = JSON.parse(savedHomeContent);
          setHomeContent({
            hero: { ...initialHomepageContent.hero, ...(parsed.hero || {}) },
            showcase: {
              ...initialHomepageContent.showcase,
              ...(parsed.showcase || {}),
              edits: parsed.showcase?.edits || initialHomepageContent.showcase.edits,
            },
            featured: { ...initialHomepageContent.featured, ...(parsed.featured || {}) },
            editorial: { ...initialHomepageContent.editorial, ...(parsed.editorial || {}) },
            cta: { ...initialHomepageContent.cta, ...(parsed.cta || {}) },
          });
        } catch {
          setHomeContent(initialHomepageContent);
        }
      }
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  // 2. Real-time Firebase Firestore Sync
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const unsubProducts = subscribeToProducts((liveProducts) => {
      if (liveProducts && liveProducts.length > 0) {
        setProducts(liveProducts);
        localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(liveProducts));
      }
    });

    const unsubOrders = subscribeToOrders((liveOrders) => {
      setOrders(liveOrders);
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(liveOrders));
    });

    const unsubSettings = subscribeToSettings((liveSettings) => {
      if (liveSettings) {
        setSettings(liveSettings);
        localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(liveSettings));
      }
    });

    const unsubHomeContent = subscribeToHomeContent((liveContent) => {
      if (liveContent) {
        setHomeContent(liveContent);
        localStorage.setItem(LOCAL_HOME_CONTENT_KEY, JSON.stringify(liveContent));
      }
    });

    return () => {
      unsubProducts();
      unsubOrders();
      unsubSettings();
      unsubHomeContent();
    };
  }, []);

  // Sync products changes
  const addProduct = (newProd: Omit<Product, "id" | "createdAt">): Product => {
    const created: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [created, ...products];
    setProducts(updated);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
    saveProductToFirestore(created);
    return created;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(updated);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
    updateProductInFirestore(id, updates);
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct({ ...selectedProduct, ...updates });
    }
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
    deleteProductFromFirestore(id);
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
  };

  const toggleStock = (id: string) => {
    const prod = products.find((p) => p.id === id);
    if (prod) {
      updateProduct(id, { inStock: !prod.inStock });
    }
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { product, quantity }];
      }
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updated));
      return updated;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(LOCAL_CART_KEY);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders operations
  const placeOrder = (customer: CustomerDetails, paymentRef?: string): Order => {
    const subtotal = cartSubtotal;
    const shippingFee = subtotal >= settings.freeShippingAbove ? 0 : settings.standardShippingFee;
    const totalAmount = subtotal + shippingFee;

    const newOrder: Order = {
      id: `AV-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customer,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      subtotal,
      shippingFee,
      totalAmount,
      status: "Pending Payment",
      paymentMethod: "Manual UPI",
      paymentReference: paymentRef,
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
    saveOrderToFirestore(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
    updateOrderStatusInFirestore(orderId, status);
  };

  const deleteOrder = (orderId: string) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
    deleteOrderFromFirestore(orderId);
  };

  // Settings
  const updateSettings = (updates: Partial<StoreSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(updated));
    saveSettingsToFirestore(updated);
  };

  // Homepage Content CMS
  const updateHomeContent = (updates: Partial<HomepageContent>) => {
    const updated: HomepageContent = {
      hero: updates.hero ? { ...homeContent.hero, ...updates.hero } : homeContent.hero,
      showcase: updates.showcase ? { ...homeContent.showcase, ...updates.showcase } : homeContent.showcase,
      featured: updates.featured ? { ...homeContent.featured, ...updates.featured } : homeContent.featured,
      editorial: updates.editorial ? { ...homeContent.editorial, ...updates.editorial } : homeContent.editorial,
      cta: updates.cta ? { ...homeContent.cta, ...updates.cta } : homeContent.cta,
    };
    setHomeContent(updated);
    localStorage.setItem(LOCAL_HOME_CONTENT_KEY, JSON.stringify(updated));
    saveHomeContentToFirestore(updated);
  };

  const resetHomeContent = () => {
    setHomeContent(initialHomepageContent);
    localStorage.setItem(LOCAL_HOME_CONTENT_KEY, JSON.stringify(initialHomepageContent));
    saveHomeContentToFirestore(initialHomepageContent);
  };

  const syncToFirebase = async () => {
    return await seedInitialDataToFirestore(products, settings, homeContent);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        settings,
        updateSettings,
        homeContent,
        updateHomeContent,
        resetHomeContent,
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        quickInquiryProduct,
        setQuickInquiryProduct,
        searchQuery,
        setSearchQuery,
        isFirebaseActive: isFirebaseConfigured(),
        syncToFirebase,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
