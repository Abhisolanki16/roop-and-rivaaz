import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "ROOP & RIVAAZ | Women's Accessories & Lifestyle | Where Beauty Meets Tradition",
  description:
    "Accessorize Your Festive You. Discover elegant earrings, necklaces, bangles, hair accessories, bags & more. Stylish, versatile, and celebration-ready.",
  openGraph: {
    title: "ROOP & RIVAAZ | Women's Accessories & Lifestyle",
    description:
      "Accessorize Your Festive You with elegant earrings, necklaces, bangles, hair accessories, bags & more — for every celebration.",
    url: "https://roopandrivaaz.com",
    siteName: "ROOP & RIVAAZ",
    images: [
      {
        url: "https://images.unsplash.com/photo-1706076876111-28bf14ec6169?auto=format&fit=crop&w=1200&q=90",
        width: 1200,
        height: 630,
        alt: "Roop & Rivaaz Handcrafted Jewellery",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#fcfaf5] text-[#261d1c]">
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
