"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { HomepageContent } from "@/types";
import { initialPhotos } from "@/data/initialProducts";
import ImageUploadPicker from "@/components/common/ImageUploadPicker";
import {
  Sparkles,
  Save,
  RotateCcw,
  Image as ImageIcon,
  CheckCircle,
  ExternalLink,
  Layers,
  ShoppingBag,
  BookOpen,
  Megaphone,
} from "lucide-react";

export default function HomeContentManager() {
  const { homeContent, updateHomeContent, resetHomeContent, setActiveTab } = useStore();

  const [formData, setFormData] = useState<HomepageContent>(homeContent);
  const [activeSection, setActiveSection] = useState<"hero" | "showcase" | "featured" | "editorial" | "cta">("hero");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [categoryTagsInput, setCategoryTagsInput] = useState(
    homeContent.hero.categoryTags.join(", ")
  );

  React.useEffect(() => {
    setFormData(homeContent);
    setCategoryTagsInput(homeContent.hero.categoryTags.join(", "));
  }, [homeContent]);

  const photoPresets = [
    { label: "Hero Statement Jhumka", url: initialPhotos.hero },
    { label: "Editorial Garba Styling", url: initialPhotos.editorial },
    { label: "Model Portrait Drops", url: initialPhotos.portrait },
    { label: "Traditional Kundan Box", url: initialPhotos.jewelleryBox },
    { label: "Navratri Special Neckpiece", url: initialPhotos.navratri },
    { label: "Mirrorwork Bangles Stack", url: initialPhotos.bangles },
    { label: "Antique Jhumkas Bell", url: initialPhotos.jhumkas },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = categoryTagsInput
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);

    const updated: HomepageContent = {
      ...formData,
      hero: {
        ...formData.hero,
        categoryTags: tags.length > 0 ? tags : formData.hero.categoryTags,
      },
    };

    updateHomeContent(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all homepage content back to default values?")) {
      resetHomeContent();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Controls */}
      <div className="bg-white p-6 rounded-xs border border-[#e8ddcd] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#c5902f] uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={13} />
            HOMEPAGE CMS &amp; VISUAL CONTROL
          </span>
          <h2 className="font-serif font-bold text-2xl text-[#35141f] mt-1">
            Configure Homepage Content
          </h2>
          <p className="text-xs text-[#746863] mt-0.5 max-w-xl">
            Update headings, images, button labels, and promotional text live across your homepage. Layout and styling remain pixel-perfect.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 border border-[#d2c2be] text-[#746863] hover:text-[#7b1e3a] hover:border-[#7b1e3a] text-xs font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset all fields to original defaults"
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className="px-3.5 py-2 bg-[#fcfaf5] border border-[#c5902f]/50 hover:bg-[#f4ecdf] text-[#35141f] text-xs font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink size={14} /> Preview Live Site
          </button>

          <button
            type="submit"
            form="home-cms-form"
            className="px-5 py-2 bg-[#7b1e3a] hover:bg-[#35141f] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Save size={15} /> Save Changes
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xs flex items-center gap-2 animate-fadeIn shadow-xs font-medium">
          <CheckCircle size={16} className="text-emerald-600 shrink-0" />
          <span>Homepage content updated successfully! Changes are immediately reflected live on the storefront.</span>
        </div>
      )}

      {/* Main CMS Card with Section Navigation */}
      <div className="bg-white rounded-xs border border-[#e8ddcd] shadow-xs overflow-hidden">
        {/* Section Tabs */}
        <div className="flex border-b border-[#e8ddcd] bg-[#fcfaf5] overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveSection("hero")}
            className={`py-3.5 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === "hero"
                ? "border-[#7b1e3a] text-[#7b1e3a] bg-white font-bold"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <Sparkles size={14} /> 1. Hero Banner
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("showcase")}
            className={`py-3.5 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === "showcase"
                ? "border-[#7b1e3a] text-[#7b1e3a] bg-white font-bold"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <Layers size={14} /> 2. Shop The Edits
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("featured")}
            className={`py-3.5 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === "featured"
                ? "border-[#7b1e3a] text-[#7b1e3a] bg-white font-bold"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <ShoppingBag size={14} /> 3. Featured Products Grid
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("editorial")}
            className={`py-3.5 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === "editorial"
                ? "border-[#7b1e3a] text-[#7b1e3a] bg-white font-bold"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <BookOpen size={14} /> 4. Navratri Editorial Story
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("cta")}
            className={`py-3.5 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === "cta"
                ? "border-[#7b1e3a] text-[#7b1e3a] bg-white font-bold"
                : "border-transparent text-[#746863] hover:text-[#35141f]"
            }`}
          >
            <Megaphone size={14} /> 5. Final CTA / Slogan
          </button>
        </div>

        <form id="home-cms-form" onSubmit={handleSave} className="p-6 sm:p-8 space-y-6">
          {/* SECTION 1: HERO BANNER */}
          {activeSection === "hero" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#f0e6d6]">
                <h3 className="font-serif font-bold text-xl text-[#35141f]">
                  Hero Banner Configuration
                </h3>
                <p className="text-xs text-[#746863] mt-0.5">
                  Controls the primary first-fold headline, buttons, category ticker, and featured model image.
                </p>
              </div>

              {/* Eyebrow Pill */}
              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Top Pill Badge Text
                </label>
                <input
                  type="text"
                  value={formData.hero.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, badge: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="e.g. NAVRATRI SPECIALS • TRADITIONAL LOOKS ❖ MODERN VIBES"
                />
              </div>

              {/* Headline Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Headline Prefix (Regular font) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hero.headlinePrefix}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, headlinePrefix: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-serif text-base"
                    placeholder="e.g. Accessorize Your"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Headline Accent (Gold italic serif) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hero.headlineAccent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, headlineAccent: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-serif text-base italic text-[#7b1e3a]"
                    placeholder="e.g. Festive You."
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Hero Subtitle Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.hero.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] leading-relaxed"
                  placeholder="e.g. Elegant earrings, necklaces, bangles, hair accessories, bags & more — for every celebration."
                />
              </div>

              {/* Category Tags Bar */}
              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Category Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={categoryTagsInput}
                  onChange={(e) => setCategoryTagsInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="EARRINGS, NECKLACES, BANGLES, HAIR ACCESSORIES, BAGS & MORE"
                />
                <p className="text-[10px] text-[#746863] mt-1">
                  Separated by commas. Displayed as a gold uppercase ribbon directly under the hero subtitle.
                </p>
              </div>

              {/* Buttons & Trust Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero.primaryButtonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, primaryButtonText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                    placeholder="Explore Collection"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Secondary WhatsApp Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero.secondaryButtonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, secondaryButtonText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                    placeholder="Enquire on WhatsApp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Trust Badge Note (Next to 5 Stars)
                  </label>
                  <input
                    type="text"
                    value={formData.hero.trustBadgeText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, trustBadgeText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                    placeholder="Curated With Love"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Brand Pillars Label
                  </label>
                  <input
                    type="text"
                    value={formData.hero.brandPillars}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, brandPillars: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                    placeholder="STYLISH • VERSATILE • CELEBRATION READY"
                  />
                </div>
              </div>

              {/* Hero Image & Floating Badge */}
              <div className="pt-4 border-t border-[#f0e6d6] space-y-4">
                <ImageUploadPicker
                  label="Hero Frame Picture"
                  value={formData.hero.heroImage}
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, heroImage: url },
                    })
                  }
                  folder="banners"
                  presetUrls={photoPresets}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#35141f] mb-1">
                      Floating Pill Badge Title
                    </label>
                    <input
                      type="text"
                      value={formData.hero.floatingBadgeTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, floatingBadgeTitle: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                      placeholder="NAVRATRI SPECIALS"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#35141f] mb-1">
                      Floating Pill Badge Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.hero.floatingBadgeSubtitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, floatingBadgeSubtitle: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                      placeholder="Traditional Looks Modern Vibes"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: SHOP THE EDITS / SHOWCASE */}
          {activeSection === "showcase" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#f0e6d6]">
                <h3 className="font-serif font-bold text-xl text-[#35141f]">
                  Category Showcase ("Shop the Edits") Configuration
                </h3>
                <p className="text-xs text-[#746863] mt-0.5">
                  Configure the 3 feature cards displayed on the homepage with custom pictures, titles, design counts, and category routes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Section Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.showcase.eyebrow}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        showcase: { ...formData.showcase, eyebrow: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                    placeholder="SHOP THE EDITS"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Section Heading *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.showcase.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        showcase: { ...formData.showcase, title: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-serif text-base"
                    placeholder="Made to move with you"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Section Subtitle
                </label>
                <textarea
                  rows={2}
                  value={formData.showcase.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      showcase: { ...formData.showcase, description: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="Classic bells, vibrant Garba dance details, and finishing touches for every festive ensemble."
                />
              </div>

              {/* 3 Edit Cards Configuration */}
              <div className="space-y-4 pt-4 border-t border-[#f0e6d6]">
                <h4 className="text-xs font-bold text-[#7b1e3a] uppercase tracking-wider">
                  The 3 Feature Showcase Cards
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {formData.showcase.edits.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-[#fcfaf5] p-4 rounded-xs border border-[#e8ddcd] space-y-3 relative shadow-xs"
                    >
                      <span className="text-[10px] font-bold text-[#c5902f] uppercase tracking-widest block">
                        Card #{idx + 1}
                      </span>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#35141f] mb-1">
                          Card Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={card.label}
                          onChange={(e) => {
                            const newEdits = [...formData.showcase.edits];
                            newEdits[idx] = { ...card, label: e.target.value };
                            setFormData({
                              ...formData,
                              showcase: { ...formData.showcase, edits: newEdits },
                            });
                          }}
                          className="w-full px-2.5 py-1.5 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs font-serif font-bold"
                          placeholder="e.g. Women’s Jhumkas"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold text-[#746863] mb-1">
                            Count / Subtitle
                          </label>
                          <input
                            type="text"
                            value={card.count}
                            onChange={(e) => {
                              const newEdits = [...formData.showcase.edits];
                              newEdits[idx] = { ...card, count: e.target.value };
                              setFormData({
                                ...formData,
                                showcase: { ...formData.showcase, edits: newEdits },
                              });
                            }}
                            className="w-full px-2 py-1 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs"
                            placeholder="18 designs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-[#746863] mb-1">
                            Target Filter
                          </label>
                          <input
                            type="text"
                            value={card.category}
                            onChange={(e) => {
                              const newEdits = [...formData.showcase.edits];
                              newEdits[idx] = { ...card, category: e.target.value };
                              setFormData({
                                ...formData,
                                showcase: { ...formData.showcase, edits: newEdits },
                              });
                            }}
                            className="w-full px-2 py-1 bg-white border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs"
                            placeholder="Earrings"
                          />
                        </div>
                      </div>

                      <ImageUploadPicker
                        label="Card Photo"
                        value={card.image}
                        onChange={(url) => {
                          const newEdits = [...formData.showcase.edits];
                          newEdits[idx] = { ...card, image: url };
                          setFormData({
                            ...formData,
                            showcase: { ...formData.showcase, edits: newEdits },
                          });
                        }}
                        folder="edits"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: FEATURED PRODUCTS SECTION */}
          {activeSection === "featured" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#f0e6d6]">
                <h3 className="font-serif font-bold text-xl text-[#35141f]">
                  Featured Products Header Configuration
                </h3>
                <p className="text-xs text-[#746863] mt-0.5">
                  Controls the title and description above the 4 featured product cards on the homepage.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Top Badge Label
                </label>
                <input
                  type="text"
                  value={formData.featured.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: { ...formData.featured, eyebrow: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="HANDPICKED SELECTIONS"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Featured Section Heading *
                </label>
                <input
                  type="text"
                  required
                  value={formData.featured.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: { ...formData.featured, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-serif text-lg font-bold"
                  placeholder="Jhumkas for Every Mood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={formData.featured.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: { ...formData.featured, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="From delicate everyday bells to bold festive pairs, find the piece that feels like you."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Bottom Button Text
                </label>
                <input
                  type="text"
                  value={formData.featured.viewAllButtonText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: { ...formData.featured, viewAllButtonText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="View All Pieces"
                />
              </div>
            </div>
          )}

          {/* SECTION 4: EDITORIAL STORY */}
          {activeSection === "editorial" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#f0e6d6]">
                <h3 className="font-serif font-bold text-xl text-[#35141f]">
                  Navratri Editorial Story Configuration
                </h3>
                <p className="text-xs text-[#746863] mt-0.5">
                  Controls the editorial feature section with overlapping photo frames and festive story copy.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={formData.editorial.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      editorial: { ...formData.editorial, eyebrow: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="THE NAVRATRI EDIT"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Story Title Prefix *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.editorial.titlePrefix}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        editorial: { ...formData.editorial, titlePrefix: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-serif text-lg"
                    placeholder="Nine nights."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Story Title Accent (Gold Italic) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.editorial.titleAccent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        editorial: { ...formData.editorial, titleAccent: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-serif text-lg italic text-[#c5902f]"
                    placeholder="Endless colour."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Story Paragraph 1 *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.editorial.paragraph1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        editorial: { ...formData.editorial, paragraph1: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Story Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={formData.editorial.paragraph2}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        editorial: { ...formData.editorial, paragraph2: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] leading-relaxed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.editorial.buttonText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      editorial: { ...formData.editorial, buttonText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="Explore Navratri Specials"
                />
              </div>

              {/* Editorial Pictures */}
              <div className="pt-4 border-t border-[#f0e6d6] grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ImageUploadPicker
                  label="Main Large Photo"
                  value={formData.editorial.largeImage}
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      editorial: { ...formData.editorial, largeImage: url },
                    })
                  }
                  folder="banners"
                  required
                />

                <ImageUploadPicker
                  label="Overlapping Inset Photo"
                  value={formData.editorial.smallImage}
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      editorial: { ...formData.editorial, smallImage: url },
                    })
                  }
                  folder="banners"
                  required
                />
              </div>
            </div>
          )}

          {/* SECTION 5: FINAL CTA & SLOGAN */}
          {activeSection === "cta" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#f0e6d6]">
                <h3 className="font-serif font-bold text-xl text-[#35141f]">
                  Final CTA Banner Configuration
                </h3>
                <p className="text-xs text-[#746863] mt-0.5">
                  Controls the royal burgundy closing section with WhatsApp ordering invitation.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Top Slogan Eyebrow
                </label>
                <input
                  type="text"
                  value={formData.cta.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cta: { ...formData.cta, eyebrow: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="ROOP & RIVAAZ • MAKE EVERY OCCASION SPECIAL"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Title Prefix *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cta.titlePrefix}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cta: { ...formData.cta, titlePrefix: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-serif text-lg"
                    placeholder="Accessorize Your"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#35141f] mb-1">
                    Title Accent (Italic Gold) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cta.titleAccent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cta: { ...formData.cta, titleAccent: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] font-serif text-lg italic text-[#c5902f]"
                    placeholder="Festive You"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  Description Text *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.cta.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cta: { ...formData.cta, description: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#35141f] mb-1">
                  WhatsApp Action Button Label
                </label>
                <input
                  type="text"
                  value={formData.cta.buttonText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cta: { ...formData.cta, buttonText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                  placeholder="Enquire on WhatsApp"
                />
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="pt-6 border-t border-[#f0e6d6] flex items-center justify-between">
            <span className="text-[11px] text-[#746863]">
              Tip: Click <strong>Save Changes</strong> to instantly update the storefront.
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#7b1e3a] hover:bg-[#35141f] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Save size={15} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
