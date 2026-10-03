"use client";

import React, { useState } from "react";
import { Printer, Download, Eye, Sparkles, ArrowLeft, Phone, Globe, Mail, QrCode } from "lucide-react";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

export default function VisitingCardPage() {
  const [founderName, setFounderName] = useState("ABHI SOLANKI");
  const [founderRole, setFounderRole] = useState("FOUNDER & CURATOR");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [instagram, setInstagram] = useState("@roopandrivaaz.jewels");
  const [website, setWebsite] = useState("www.roopandrivaaz.com");
  const [activeTab, setActiveTab] = useState<"presentation" | "vector">("presentation");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#1a1617] text-white">
      {/* Studio Header (Hidden during print) */}
      <header className="print:hidden border-b border-[#35141f] bg-[#221c1e] px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#c5902f] flex items-center justify-center text-[#e1bf75] bg-[#35141f]">
            <Sparkles size={16} />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-[#fcfaf5] tracking-wide flex items-center gap-2">
              ROOP & RIVAAZ
              <span className="text-[10px] font-sans font-semibold uppercase px-2 py-0.5 rounded-full bg-[#7b1e3a] text-white tracking-widest">
                Private Studio
              </span>
            </h1>
            <p className="text-xs text-[#a89994]">
              Visiting Card & Packaging Insert Asset Generator (Not included in storefront navigation)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-[#141012] p-1 rounded-xs border border-[#35141f] flex text-xs">
            <button
              onClick={() => setActiveTab("presentation")}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                activeTab === "presentation"
                  ? "bg-[#7b1e3a] text-white font-semibold"
                  : "text-[#a89994] hover:text-white"
              }`}
            >
              Graphic Presentation
            </button>
            <button
              onClick={() => setActiveTab("vector")}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                activeTab === "vector"
                  ? "bg-[#7b1e3a] text-white font-semibold"
                  : "text-[#a89994] hover:text-white"
              }`}
            >
              Printable Vector Cards
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#c5902f] hover:bg-[#e1bf75] text-[#35141f] text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Printer size={14} /> Print / Save PDF
          </button>

          <a
            href="/"
            className="px-3 py-2 border border-[#4a3b3f] hover:bg-[#35141f] text-[#d2c2be] text-xs rounded-xs flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Store
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 1: High-Res Rendered Graphic Presentation */}
        {activeTab === "presentation" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#261f22] p-4 rounded-xs border border-[#3d2f34]">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#e1bf75]">
                  High-Resolution Card Presentation (Front & Back)
                </h2>
                <p className="text-xs text-[#a89994] mt-0.5">
                  Designed according to reference layout: 3.5 × 2 in landscape with model editorial, scannable QR code, and luxury burgundy-gold finishes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/visiting-card-presentation.jpg"
                  download="roop_rivaaz_visiting_cards.jpg"
                  className="px-4 py-2 bg-[#7b1e3a] hover:bg-[#912344] text-white text-xs font-bold rounded-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download size={14} /> Download Image (1920×1080)
                </a>
                <a
                  href="/visiting-card-mockup.jpg"
                  download="roop_rivaaz_card_mockup.jpg"
                  className="px-3 py-2 border border-[#c5902f]/50 hover:bg-[#c5902f]/10 text-[#e1bf75] text-xs rounded-xs flex items-center gap-1.5 transition-colors"
                >
                  <Eye size={14} /> View Silk Mockup
                </a>
              </div>
            </div>

            {/* Presentation Image Display */}
            <div className="rounded-xs overflow-hidden border-2 border-[#3d2f34] shadow-2xl bg-[#0f0c0d]">
              <img
                src="/visiting-card-presentation.jpg"
                alt="Roop & Rivaaz Luxury Visiting Card Front and Back Presentation"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Silk Luxury Mockup Secondary Card */}
            <div className="bg-[#221c1e] p-6 rounded-xs border border-[#3d2f34] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 rounded-xs overflow-hidden border border-[#523e45] shadow-lg">
                <img
                  src="/visiting-card-mockup.jpg"
                  alt="Roop & Rivaaz Silk Texture Physical Mockup"
                  className="w-full h-auto"
                />
              </div>
              <div className="md:col-span-7 space-y-4">
                <span className="text-[10px] font-bold text-[#c5902f] uppercase tracking-widest">
                  PRODUCTION & PRINTING GUIDE
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#fcfaf5]">
                  Silk Velvet & Gold Foil Printing
                </h3>
                <p className="text-xs text-[#d2c2be] leading-relaxed">
                  For physical production, recommend <strong>350–400 GSM Art Card</strong> with <strong>Soft-Touch Velvet Matte Lamination</strong> and <strong>Hot-Stamping Metallic Gold Foil</strong> for the <em>ROOP & RIVAAZ</em> typography and monogram emblem.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="bg-[#191416] p-3 rounded-xs border border-[#3d2f34]">
                    <strong className="block text-[#e1bf75] font-serif text-sm">Size: 3.5 × 2 inches</strong>
                    <span className="text-[11px] text-[#a89994]">89 mm × 51 mm standard horizontal card</span>
                  </div>
                  <div className="bg-[#191416] p-3 rounded-xs border border-[#3d2f34]">
                    <strong className="block text-[#e1bf75] font-serif text-sm">Dual Finish</strong>
                    <span className="text-[11px] text-[#a89994]">Burgundy #35141f + Ivory Cream #fcfaf5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Live Interactive & Printable Vector Cards */}
        {activeTab === "vector" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Customizer Toolbar (hidden on print) */}
            <div className="print:hidden bg-[#261f22] p-5 rounded-xs border border-[#3d2f34] space-y-4">
              <h2 className="text-xs font-bold text-[#e1bf75] uppercase tracking-widest flex items-center gap-2">
                <QrCode size={14} /> Customize Card Details Before Printing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[#a89994] mb-1 font-medium">Founder / Curator Name</label>
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full bg-[#181315] border border-[#42343a] px-3 py-1.5 rounded-xs text-[#fcfaf5] focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>
                <div>
                  <label className="block text-[#a89994] mb-1 font-medium">Role Title</label>
                  <input
                    type="text"
                    value={founderRole}
                    onChange={(e) => setFounderRole(e.target.value)}
                    className="w-full bg-[#181315] border border-[#42343a] px-3 py-1.5 rounded-xs text-[#fcfaf5] focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>
                <div>
                  <label className="block text-[#a89994] mb-1 font-medium">WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181315] border border-[#42343a] px-3 py-1.5 rounded-xs text-[#fcfaf5] focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>
                <div>
                  <label className="block text-[#a89994] mb-1 font-medium">Instagram Handle</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-[#181315] border border-[#42343a] px-3 py-1.5 rounded-xs text-[#fcfaf5] focus:outline-hidden focus:border-[#c5902f]"
                  />
                </div>
              </div>
            </div>

            {/* Printable Cards Preview Canvas */}
            <div className="space-y-10 print:space-y-6">
              {/* CARD 1: FRONT */}
              <div className="space-y-2">
                <span className="print:hidden text-[11px] font-bold text-[#a89994] uppercase tracking-widest block">
                  Card Front (3.5 × 2 in)
                </span>
                <div className="w-full max-w-[700px] aspect-[7/4] mx-auto rounded-xs overflow-hidden shadow-2xl border-2 border-[#c5902f] grid grid-cols-12 bg-[#35141f]">
                  {/* Left Column (55%) */}
                  <div className="col-span-7 p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-br from-[#35141f] via-[#2f111a] to-[#3a1522]">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 border border-[#c5902f] rounded-[50%_50%_4px_50%] -rotate-45 flex items-center justify-center bg-[#250d15] shadow-xs">
                          <span className="rotate-45 text-[#e1bf75] font-serif font-bold text-xl leading-none">
                            R
                          </span>
                        </div>
                        <div>
                          <strong className="block text-[#fffdf9] font-serif font-semibold text-lg tracking-[0.16em] leading-none">
                            ROOP &amp; RIVAAZ
                          </strong>
                          <small className="block mt-0.5 text-[#e1bf75] text-[8px] tracking-[0.22em] font-medium uppercase">
                            WOMEN'S ACCESSORIES &amp; LIFESTYLE
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 my-auto py-2">
                      <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white leading-tight">
                        Accessorize Your <br />
                        <em className="text-[#e1bf75] italic font-normal">Festive You</em>
                      </h2>
                      <p className="text-[10px] text-[#d2c2be] leading-relaxed line-clamp-3">
                        Elegant earrings, necklaces, bangles, hair accessories, bags &amp; more — for every celebration.
                      </p>
                      <div className="text-[7.5px] text-[#e1bf75] font-medium tracking-wider pt-1">
                        EARRINGS | NECKLACES | BANGLES | HAIR ACCESSORIES | BAGS &amp; MORE
                      </div>
                    </div>

                    <div className="text-[8px] text-[#e1bf75] font-semibold uppercase tracking-widest">
                      STYLISH • VERSATILE • CELEBRATION READY
                    </div>
                  </div>

                  {/* Right Column (45%) Model Photograph */}
                  <div className="col-span-5 relative bg-[#1f0b12] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1623133343364-04d1d1a26fcb?auto=format&fit=crop&w=800&q=90"
                      alt="Festive model wearing jhumkas"
                      className="w-full h-full object-cover object-center filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 right-3 bg-[#35141f]/95 border border-[#e1bf75]/80 text-[#e1bf75] text-[7.5px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md backdrop-blur-xs flex items-center gap-1">
                      <span>NAVRATRI SPECIALS</span>
                      <span className="text-white">❖</span>
                      <span className="font-serif italic font-normal lowercase text-[9px] text-white">Traditional Looks Modern Vibes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: BACK */}
              <div className="space-y-2">
                <span className="print:hidden text-[11px] font-bold text-[#a89994] uppercase tracking-widest block">
                  Card Back (3.5 × 2 in — Split Layout with Scannable QR)
                </span>
                <div className="w-full max-w-[700px] aspect-[7/4] mx-auto rounded-xs overflow-hidden shadow-2xl border-2 border-[#c5902f] grid grid-cols-12 bg-[#fcfaf5] text-[#261d1c]">
                  {/* Left Column (65%) Ivory + QR Code */}
                  <div className="col-span-8 p-6 sm:p-7 flex flex-col justify-between relative bg-[#fcfaf5]">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#e8ddcd]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 border border-[#c5902f] rounded-[50%_50%_2px_50%] -rotate-45 flex items-center justify-center bg-white">
                          <span className="rotate-45 text-[#7b1e3a] font-serif font-bold text-xs leading-none">
                            R
                          </span>
                        </div>
                        <div>
                          <span className="font-serif font-bold text-xs tracking-wider text-[#35141f] block leading-none">
                            ROOP &amp; RIVAAZ
                          </span>
                          <span className="text-[7px] text-[#746863] tracking-widest uppercase block">
                            WHERE BEAUTY MEETS TRADITION
                          </span>
                        </div>
                      </div>

                      <span className="border border-[#c5902f] text-[#35141f] text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fcfaf5]">
                        SHOP ONLINE
                      </span>
                    </div>

                    {/* QR Code and Scan Info */}
                    <div className="flex items-center gap-4 my-auto py-2">
                      {/* Stylized QR Box */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-2 rounded-xs shadow-md border border-[#e8ddcd] shrink-0 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-[#35141f]">
                          {/* Outer QR Markers */}
                          <rect x="5" y="5" width="28" height="28" fill="currentColor" rx="2" />
                          <rect x="9" y="9" width="20" height="20" fill="white" rx="1" />
                          <rect x="13" y="13" width="12" height="12" fill="currentColor" rx="1" />

                          <rect x="67" y="5" width="28" height="28" fill="currentColor" rx="2" />
                          <rect x="71" y="9" width="20" height="20" fill="white" rx="1" />
                          <rect x="75" y="13" width="12" height="12" fill="currentColor" rx="1" />

                          <rect x="5" y="67" width="28" height="28" fill="currentColor" rx="2" />
                          <rect x="9" y="71" width="20" height="20" fill="white" rx="1" />
                          <rect x="13" y="75" width="12" height="12" fill="currentColor" rx="1" />

                          {/* Pattern Blocks */}
                          <rect x="38" y="10" width="6" height="6" fill="currentColor" />
                          <rect x="48" y="10" width="6" height="6" fill="currentColor" />
                          <rect x="38" y="20" width="16" height="6" fill="currentColor" />
                          <rect x="10" y="38" width="6" height="16" fill="currentColor" />
                          <rect x="20" y="48" width="6" height="6" fill="currentColor" />
                          <rect x="38" y="38" width="24" height="24" fill="currentColor" />
                          <rect x="44" y="44" width="12" height="12" fill="white" />
                          <rect x="48" y="48" width="4" height="4" fill="currentColor" />

                          <rect x="67" y="38" width="8" height="8" fill="currentColor" />
                          <rect x="80" y="46" width="12" height="6" fill="currentColor" />
                          <rect x="38" y="67" width="14" height="6" fill="currentColor" />
                          <rect x="48" y="77" width="16" height="8" fill="currentColor" />
                          <rect x="70" y="70" width="8" height="8" fill="currentColor" />
                          <rect x="82" y="75" width="10" height="10" fill="currentColor" />
                        </svg>
                      </div>

                      {/* Scan text */}
                      <div className="space-y-1">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#35141f] leading-tight">
                          Scan. Explore. Shop.
                        </h3>
                        <p className="text-[9px] text-[#746863] leading-snug">
                          Discover our latest collection of earrings, necklaces, bangles, hair accessories, bags &amp; more.
                        </p>
                        <div className="pt-1">
                          <span className="text-[7px] text-[#7b1e3a] font-bold uppercase tracking-wider block">
                            VISIT THE BOUTIQUE
                          </span>
                          <strong className="text-[10px] text-[#35141f] font-mono">{website}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Footer strip */}
                    <div className="pt-2 border-t border-[#e8ddcd] text-[8px] text-[#746863] uppercase tracking-wider">
                      FESTIVE COLLECTIONS • EVERYDAY STYLES • NAVRATRI SPECIALS
                    </div>
                  </div>

                  {/* Right Column (35%) Burgundy Founder & Contacts */}
                  <div className="col-span-4 p-5 sm:p-6 bg-[#35141f] text-white flex flex-col justify-between border-l border-[#c5902f]/40 relative">
                    <div className="space-y-3">
                      <div>
                        <div className="w-2 h-2 rotate-45 border border-[#e1bf75] mb-1.5" />
                        <h4 className="font-serif font-bold text-sm tracking-wider text-[#fffdf9] leading-tight">
                          {founderName}
                        </h4>
                        <span className="text-[8px] text-[#e1bf75] font-semibold tracking-widest uppercase block">
                          {founderRole}
                        </span>
                      </div>

                      <div className="h-px bg-[#e1bf75]/25 w-full" />

                      <div className="space-y-2 text-[8px]">
                        <div>
                          <span className="text-[#e1bf75] font-semibold uppercase tracking-wider block text-[7px]">
                            CALL / WHATSAPP:
                          </span>
                          <span className="text-white font-medium">{phone}</span>
                        </div>
                        <div>
                          <span className="text-[#e1bf75] font-semibold uppercase tracking-wider block text-[7px]">
                            EMAIL:
                          </span>
                          <span className="text-white font-medium">orders@roopandrivaaz.com</span>
                        </div>
                        <div>
                          <span className="text-[#e1bf75] font-semibold uppercase tracking-wider block text-[7px]">
                            INSTAGRAM:
                          </span>
                          <span className="text-white font-medium">{instagram}</span>
                        </div>
                        <div>
                          <span className="text-[#e1bf75] font-semibold uppercase tracking-wider block text-[7px]">
                            WEBSITE:
                          </span>
                          <span className="text-white font-medium">{website}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#e1bf75]/20">
                      <p className="font-serif italic text-[9.5px] text-[#e1bf75] text-center leading-tight">
                        “Make Every Occasion Special.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
