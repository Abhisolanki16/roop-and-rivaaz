# Aavira Jewels & Festive — Premium Jewellery Website

A high-performance luxury Indian jewellery boutique built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Architecture & Features

This website is split into two seamless portals:

### 1. 🛍️ Customer Storefront (`/`)
- **Luxury Aesthetic**: Royal Burgundy (`#7b1e3a`), Deep Wine (`#35141f`), Warm Gold (`#c5902f`), with Cormorant Garamond serif headings.
- **Announcement Bar**: Dynamic marquee displaying pan-India delivery, active offers, and WhatsApp dispatch notes.
- **Hero & Featured Showcase**: "Jhumka of the week" floater card, festive stamps, and editorial storytelling for Navratri & weddings.
- **Curated Collections / Catalog**:
  - Filter by category (*All Pieces*, *Jhumkas*, *Earrings*, *Navratri Specials*, *Accessories*, *Bangles*, *Necklaces*).
  - Live search across product names, materials, and styles.
  - Sorting (Featured, Price: Low to High, Price: High to Low, Newest).
  - Price range filters (Under ₹500, ₹500–₹800, ₹800+).
- **Interactive Product Modal**:
  - Multi-angle high-resolution image gallery.
  - Detailed craftsmanship specifications (Material, Colour, Occasion, Availability).
  - Direct "Purchase on WhatsApp" button or "Add to Bag".
- **Cart & Wishlist**:
  - Interactive slide-over cart drawer with free shipping progress bar.
  - Wishlist counter with instant heart toggles.
- **WhatsApp Checkout with Manual UPI**:
  - Customer enters their delivery address (Name, WhatsApp Phone, Address, City, State, PIN code, and gift notes).
  - Displays the store's **UPI ID** with a 1-click **Copy UPI ID** button.
  - Instructions to pay via Google Pay, PhonePe, Paytm, or BHIM.
  - Clicking **"Confirm & Place Order on WhatsApp"** formats a comprehensive WhatsApp order message with Order ID, customer address, item details, and total, directly redirecting to the admin's WhatsApp chat.

---

### 2. 🛡️ Admin Portal (`/admin` or via the top-right Admin button)
- **KPI Overview**: Real-time stats on Total Products, In-Stock items, WhatsApp Orders, and Pending Payment verifications.
- **Product Configuration**:
  - Add New Jewellery Pieces (Title, Category, Price, MRP / Compare Price, Image URLs, Description, Specs: Material, Occasion, Stock toggle, Featured piece toggle, Badge tags).
  - Edit existing products in real time.
  - One-click stock status toggle (`In Stock` / `Out of Stock`).
  - Delete products with confirmation.
- **Orders & Inquiries Tracker**:
  - View all orders submitted through WhatsApp checkout.
  - View customer contact, delivery address, ordered items, and order value.
  - Update order status: `Pending Payment`, `Payment Verified`, `Processing`, `Shipped`, `Delivered`, `Cancelled`.
  - **"WhatsApp Customer"** button to open a direct chat with the buyer.
- **Store & UPI Configuration**:
  - Configure **Admin WhatsApp Phone Number** (where all customer orders and inquiry links are routed).
  - Configure **Store UPI ID** & **Payee Legal Name** (displayed to customers during checkout).
  - Edit Announcement bar text and shipping charges.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```
