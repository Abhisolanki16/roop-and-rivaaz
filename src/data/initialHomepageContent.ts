import { HomepageContent } from "@/types";
import { initialPhotos } from "./initialProducts";

export const initialHomepageContent: HomepageContent = {
  hero: {
    badge: "NAVRATRI SPECIALS • TRADITIONAL LOOKS ❖ MODERN VIBES",
    headlinePrefix: "Accessorize Your",
    headlineAccent: "Festive You.",
    subtitle: "Elegant earrings, necklaces, bangles, hair accessories, bags & more — for every celebration.",
    categoryTags: ["EARRINGS", "NECKLACES", "BANGLES", "HAIR ACCESSORIES", "BAGS & MORE"],
    primaryButtonText: "Explore Collection",
    secondaryButtonText: "Enquire on WhatsApp",
    trustBadgeText: "Curated With Love",
    brandPillars: "STYLISH • VERSATILE • CELEBRATION READY",
    heroImage: initialPhotos.hero,
    floatingBadgeTitle: "NAVRATRI SPECIALS",
    floatingBadgeSubtitle: "Traditional Looks Modern Vibes",
  },
  showcase: {
    eyebrow: "SHOP THE EDITS",
    title: "Made to move with you",
    description: "Classic bells, vibrant Garba dance details, and finishing touches for every festive ensemble.",
    edits: [
      {
        label: "Women’s Jhumkas",
        category: "Jhumkas",
        count: "18 designs",
        image: initialPhotos.jhumkas,
      },
      {
        label: "Navratri Specials",
        category: "Navratri Specials",
        count: "12 designs",
        image: initialPhotos.navratri,
      },
      {
        label: "Festive Add-ons",
        category: "Accessories",
        count: "10 designs",
        image: initialPhotos.bangles,
      },
    ],
  },
  featured: {
    eyebrow: "HANDPICKED SELECTIONS",
    title: "Jhumkas for Every Mood",
    subtitle: "From delicate everyday bells to bold festive pairs, find the piece that feels like you.",
    viewAllButtonText: "View All Pieces",
  },
  editorial: {
    eyebrow: "THE NAVRATRI EDIT",
    titlePrefix: "Nine nights.",
    titleAccent: "Endless colour.",
    paragraph1: "Dance-ready oxidised earrings, colourful bangles, and statement accessories chosen to complete your Garba and Dandiya looks with grace and confidence.",
    paragraph2: "Lightweight, expressive, and easy to pair—festive pieces meticulously crafted for long nights of movement, music, and celebration.",
    buttonText: "Explore Navratri Specials",
    largeImage: initialPhotos.editorial,
    smallImage: initialPhotos.bangles,
  },
  cta: {
    eyebrow: "ROOP & RIVAAZ • MAKE EVERY OCCASION SPECIAL",
    titlePrefix: "Accessorize Your",
    titleAccent: "Festive You",
    description: "Connect directly with us on WhatsApp for earrings, necklaces, bangles, hair accessories, bags & more. Instant styling assistance and seamless manual UPI ordering.",
    buttonText: "Enquire on WhatsApp",
  },
};
