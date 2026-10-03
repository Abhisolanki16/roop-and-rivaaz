export type CategoryType = 
  | "All Pieces"
  | "Jhumkas"
  | "Earrings"
  | "Navratri"
  | "Accessories"
  | "Bangles"
  | "Necklaces";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  position?: string;
  description?: string;
  material?: string;
  colour?: string;
  occasion?: string;
  style?: string;
  inStock: boolean;
  isFeatured?: boolean;
  badge?: string;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export type OrderStatus = 
  | "Pending Payment"
  | "Payment Verified"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerDetails;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  subtotal: number;
  shippingFee: number;
  status: OrderStatus;
  paymentMethod: "Manual UPI";
  paymentReference?: string;
}

export interface StoreSettings {
  storeName: string;
  subheading?: string;
  tagline: string;
  announcement: string;
  adminWhatsApp: string;
  adminPhone: string;
  adminEmail: string;
  upiId: string;
  upiPayeeName: string;
  freeShippingAbove: number;
  standardShippingFee: number;
}

export interface HeroContent {
  badge: string;
  headlinePrefix: string;
  headlineAccent: string;
  subtitle: string;
  categoryTags: string[];
  primaryButtonText: string;
  secondaryButtonText: string;
  trustBadgeText: string;
  brandPillars: string;
  heroImage: string;
  floatingBadgeTitle: string;
  floatingBadgeSubtitle: string;
}

export interface ShowcaseEditCard {
  label: string;
  category: string;
  count: string;
  image: string;
  accentBorder?: string;
}

export interface CategoryShowcaseContent {
  eyebrow: string;
  title: string;
  description: string;
  edits: ShowcaseEditCard[];
}

export interface FeaturedSectionContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewAllButtonText: string;
}

export interface EditorialSectionContent {
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  largeImage: string;
  smallImage: string;
}

export interface CtaSectionContent {
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  buttonText: string;
}

export interface HomepageContent {
  hero: HeroContent;
  showcase: CategoryShowcaseContent;
  featured: FeaturedSectionContent;
  editorial: EditorialSectionContent;
  cta: CtaSectionContent;
}
