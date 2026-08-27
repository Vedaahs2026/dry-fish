"use client";

import { useState, useEffect, use, useMemo } from "react";
import { Sparkles, ArrowLeft, ShoppingBag, Check, X, Heart, Truck, ClipboardList, Package, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { usePathname } from "next/navigation";
import RefineDrawer from "@/components/RefineDrawer";
import { getProductImageUrls } from "@/utils/product";


interface Variation {
  id: number;
  size: string;
  color: string;
  stock: number;
  mrp: number;
  salePrice: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  salePrice: number;
  images: string; // JSON string array
  colors: string; // JSON string array
  isFeatured: boolean | number | null;
  isCustomizable: boolean | number | null;
  enabledMeasurements: string | null; // JSON string array
  gender: string | null;
  avgRating?: number | string | null;
  numReviews?: number | string | null;
  tags?: string | null;
  style?: string | null;
  fabricComposition?: string | null;
  weave?: string | null;
  neckStyle?: string | null;
  keyWords?: string | null;
  specifications?: string | null;
  variations: Variation[];
}

const COLOR_MAP: Record<string, string> = {
  white: "#FFFFFF",
  black: "#171717",
  red: "#EF4444",
  blue: "#3B82F6",
  "sky blue": "#0EA5E9",
  navy: "#1E3A8A",
  grey: "#737373",
  gray: "#737373",
  brown: "#78350F",
  maroon: "#5C1D16",
  pink: "#EC4899",
  beige: "#EADED2",
  gold: "#C5A059",
  "forest green": "#1B3022",
  green: "#22C55E",
  yellow: "#EAB308",
};

const getColorDisplayName = (color: string | null | undefined) => {
  if (!color) return "";
  return color.includes("::") ? color.split("::")[0] : color;
};

const getColorHex = (colorName: string) => {
  if (colorName.includes("::")) {
    return colorName.split("::")[1];
  }
  const lower = colorName.toLowerCase();
  return COLOR_MAP[lower] || (colorName.startsWith("#") ? colorName : "#CCCCCC");
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState("");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [isShippingExpanded, setIsShippingExpanded] = useState(false);
  const [isQualityExpanded, setIsQualityExpanded] = useState(false);
  const [isStorageExpanded, setIsStorageExpanded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const pathname = usePathname();
  const isWishlisted = useWishlistStore((state) => state.items.some((item) => item.productId === Number(id)));
  const addItemToWishlist = useWishlistStore((state) => state.addItem);
  const removeItemFromWishlist = useWishlistStore((state) => state.removeItem);
  const isAuthenticated = useWishlistStore((state) => state.isAuthenticated);

  // Parse specifications
  const parsedSpecs = useMemo(() => {
    if (!product?.specifications) return null;
    try {
      return JSON.parse(product.specifications) as Record<string, string>;
    } catch (e) {
      console.error("Failed to parse specifications:", e);
      return null;
    }
  }, [product?.specifications]);

  const hasSpecs = parsedSpecs ? Object.keys(parsedSpecs).length > 0 : false;

  const topBadges = useMemo(() => {
    if (!product?.weave) return [];
    return product.weave.split(",").map(b => b.trim()).filter(Boolean);
  }, [product?.weave]);

  const taglines = product?.neckStyle ? product.neckStyle.trim() : "";
  const soldCount = product?.keyWords ? product.keyWords.trim() : "";

  const specDetailsList = useMemo(() => {
    if (!parsedSpecs) return [];
    return Object.entries(parsedSpecs).filter(([k]) => k.toLowerCase() !== "key words" && k.toLowerCase() !== "key details");
  }, [parsedSpecs]);


  const handleWishlistClick = async () => {
    if (!isAuthenticated) {
      window.location.href = `/login?redirect=${encodeURIComponent(pathname)}`;
      return;
    }

    if (isWishlisted) {
      await removeItemFromWishlist(Number(id));
    } else {
      await addItemToWishlist(Number(id));
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);

          // Set initial color and size if available
          const uniqueColors = Array.from(new Set(data.variations.map((v: Variation) => v.color))) as string[];
          if (uniqueColors.length > 0) {
            const firstColor = uniqueColors[0] as string;
            setSelectedColor(firstColor);

            // Also set first size for that color
            const firstSize = data.variations.find((v: Variation) => v.color === firstColor)?.size;
            if (firstSize) setSelectedSize(firstSize);
          }

          // Set initial main image
          let initialImage = "/images/placeholder.png";
          try {
            const parsed = JSON.parse(data.images || "[]");
            if (Array.isArray(parsed)) {
              if (parsed.length > 0) initialImage = parsed[0];
            } else if (uniqueColors.length > 0 && parsed[uniqueColors[0]] && parsed[uniqueColors[0]].length > 0) {
              initialImage = parsed[uniqueColors[0]][0];
            } else if (parsed["Default"] && parsed["Default"].length > 0) {
              initialImage = parsed["Default"][0];
            } else {
              const keys = Object.keys(parsed);
              if (keys.length > 0 && parsed[keys[0]].length > 0) {
                initialImage = parsed[keys[0]][0];
              }
            }
          } catch {}
          setMainImage(initialImage);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const colorImages = useMemo(() => {
    if (!product) return [];
    return getProductImageUrls(product.images, product.colors, selectedColor);
  }, [product, selectedColor]);

  // Sync main image when color images update
  useEffect(() => {
    if (colorImages.length > 0) {
      setMainImage(colorImages[0]);
    }
  }, [colorImages]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
          <Link href="/" className="text-black-accent hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const variations = product.variations || [];

  // Get unique colors available for this product
  const availableColors = Array.from(new Set(variations.map(v => v.color))).filter(Boolean);

  // Get sizes available for the selected color
  const sizesForColor = variations.filter(v => v.color === selectedColor);
  const availableSizes = Array.from(new Set(sizesForColor.map(v => v.size)));

  const isSingleSize = availableSizes.length === 1 && (
    availableSizes[0] === "Standard" || 
    availableSizes[0] === "One Size" || 
    availableSizes[0] === "No Size" || 
    availableSizes[0] === "Default"
  );

  // Current selected variation
  const currentVariation = variations.find(
    v => v.color === selectedColor && v.size === selectedSize
  );

  const displayPrice = currentVariation?.salePrice || product.salePrice || product.basePrice;
  const mrp = currentVariation?.mrp || product.basePrice;
  const currentStock = currentVariation?.stock || 0;

  const enabledMeasurementsList = JSON.parse(product.enabledMeasurements || "[]") as string[];

  const handleAddToCart = () => {
    if (!selectedColor) {
      setToast("Please select a color first");
      return;
    }
    if (!selectedSize) {
      setToast("Please select a size first");
      return;
    }
    if (!currentVariation) {
      setToast("The selected combination is currently unavailable.");
      return;
    }

    addItem({
      id: `prod_${product.id}_${selectedColor}_${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: displayPrice,
      image: mainImage,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      customizations: null
    });

    setAdded(true);
    setToast("Item successfully added to bag!");
    setTimeout(() => {
      setAdded(false);
      setToast("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-brand-light text-black font-sans selection:bg-brand-accent/30">
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-6 pb-16">
        <Link href="/" className="inline-flex items-center space-x-3 text-black/60 hover:text-black-accent transition-all mb-6 text-xs font-bold uppercase tracking-widest group">
          <div className="p-2 rounded-full bg-white shadow-sm border border-brand/5 group-hover:border-brand-accent/30 transition-all">
            <ArrowLeft size={14} />
          </div>
          <span>Back to Collections</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Image Gallery (6 cols - reduced from 7) */}
          <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-5">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[600px] no-scrollbar">
              {colorImages.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative flex-shrink-0 w-20 h-24 md:w-24 md:h-32 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? "border-brand-accent shadow-md scale-105" : "border-transparent hover:border-brand/20"
                    }`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-[4/5] relative rounded-2xl overflow-hidden bg-white shadow-xl group">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 right-6">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-brand/5 text-black-accent">
                  <Sparkles size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Details (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {topBadges.length > 0 ? (
                topBadges.map((badge, idx) => (
                  <span key={idx} className="bg-[#FFFDF6] border border-[#eab308] text-black px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    {badge.toLowerCase().includes("shipping") || badge.toLowerCase().includes("delivery") ? "🚚" : badge.toLowerCase().includes("support") ? "🎧" : "📦"}
                    {badge}
                  </span>
                ))
              ) : (
                <span className="bg-brand/5 text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">Premium Collection</span>
              )}
              {currentStock > 0 && currentStock < 5 && (
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter animate-pulse">
                  Only {currentStock} left!
                </span>
              )}
            </div>

            {/* Title & Share Button */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-black flex-1">
                {product.name}
              </h1>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setToast("Link copied to clipboard!");
                  setTimeout(() => setToast(""), 2000);
                }}
                className="bg-white border border-[#eab308] text-[#eab308] rounded-xl px-4 py-2 hover:bg-brand/5 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0"
              >
                <span>🔗</span> Share
              </button>
            </div>

            {/* Key Attributes */}
            {soldCount && (
              <div className="flex items-center text-xs mb-4">
                <span className="bg-[#991b1b] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm animate-pulse">
                  🔥 {soldCount}
                </span>
              </div>
            )}

            {/* Product Description */}
            {product.description && (
              <p className="text-black/80 font-medium text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {product.description}
              </p>
            )}

            {/* Pricing Box with red border and countdown */}
            <div className="bg-[#FFFDF6] border-2 border-red-500/25 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 shadow-sm">
              <div>
                <div className="flex items-baseline space-x-3 gap-2">
                  <span className="text-3xl font-black text-black">₹{displayPrice.toLocaleString()}</span>
                  {mrp > displayPrice && (
                    <>
                      <span className="text-lg text-black/40 line-through font-medium">₹{mrp.toLocaleString()}</span>
                      <span className="bg-[#22c55e] text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                        Save {Math.round(((mrp - displayPrice) / mrp) * 100)}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[10px] text-black/40 font-bold uppercase tracking-wider mt-1.5">MRP incl. of all taxes</p>
              </div>
            </div>

            {/* Outline Tags List (product.tags) */}
            {product.tags && (
              <div className="flex flex-wrap gap-2.5 mb-6">
                {product.tags.split(",").map(t => t.trim()).filter(Boolean).map((tag, idx) => (
                  <span key={idx} className="bg-white border-2 border-black/15 text-black px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    {tag.toLowerCase().includes("natural") ? "🌱" : tag.toLowerCase().includes("preservat") ? "🚫" : tag.toLowerCase().includes("sustain") ? "🌱" : tag.toLowerCase().includes("fresh") ? "🐟" : "✓"}
                    {tag}
                  </span>
                ))}
              </div>
            )}



            {/* Color Selector */}
            {availableColors.length > 1 && availableColors.some(c => c !== "Default") && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm font-bold text-black uppercase tracking-widest flex items-center gap-2">
                    1. Select Color <span className="text-black/30">—</span> <span className="text-black-accent">{getColorDisplayName(selectedColor)}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        const colorSizes = variations.filter(v => v.color === color).map(v => v.size);
                        const isSingle = colorSizes.length === 1 && (
                          colorSizes[0] === "Standard" || 
                          colorSizes[0] === "One Size" || 
                          colorSizes[0] === "No Size" || 
                          colorSizes[0] === "Default"
                        );
                        if (selectedSize && colorSizes.includes(selectedSize)) {
                          // Keep selected size if available in the newly selected color
                        } else if (isSingle) {
                          setSelectedSize(colorSizes[0]);
                        } else {
                          setSelectedSize(null);
                        }
                      }}
                      className={`relative w-12 h-12 rounded-full border-2 p-1 transition-all ${selectedColor === color
                          ? "border-brand-accent scale-110 shadow-lg"
                          : "border-transparent hover:border-brand/20"
                        }`}
                      title={getColorDisplayName(color)}
                    >
                      <div
                        className="w-full h-full rounded-full border border-black/5"
                        style={{ backgroundColor: getColorHex(color) }}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center text-white">
                            <Check size={16} className="drop-shadow-md" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Weight / Pack Size Selector */}
            {!isSingleSize && (
              <div className="mb-8">
                <span className="text-sm font-black text-black uppercase tracking-wider block mb-4">
                  Weight
                </span>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map((size) => {
                    const variation = variations.find(v => v.color === selectedColor && v.size === size);
                    const isOutOfStock = variation ? variation.stock === 0 : true;
  
                    return (
                      <button
                        key={size}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2.5 rounded-lg flex items-center justify-center text-xs font-black transition-all border-2 ${selectedSize === size
                            ? "bg-black text-[#FFFDF6] border-black scale-105 shadow-md"
                            : isOutOfStock
                              ? "bg-brand/5 text-black/20 border-transparent cursor-not-allowed line-through opacity-50"
                              : "bg-white text-black border-black hover:bg-black/5 shadow-sm"
                          }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}



            {/* Characteristics / Badges */}
            {product.style && (
              <div className="mb-8 flex flex-wrap gap-2.5">
                {product.style.split(",").map(c => c.trim()).filter(Boolean).map((char) => {
                  let icon = "✨";
                  const lower = char.toLowerCase();
                  if (lower.includes("natural")) icon = "🍃";
                  else if (lower.includes("preservative")) icon = "🚫";
                  else if (lower.includes("sustainable") || lower.includes("source")) icon = "🌱";
                  else if (lower.includes("coastal") || lower.includes("fresh") || lower.includes("fish")) icon = "🐟";
                  else if (lower.includes("sun-dried") || lower.includes("dried") || lower.includes("traditional")) icon = "🔥";
                  
                  return (
                    <span 
                      key={char} 
                      className="px-4 py-2 rounded-full border border-black flex items-center gap-2 text-xs font-semibold text-[#991b1b] bg-white shadow-sm"
                    >
                      <span>{icon}</span>
                      <span>{char}</span>
                    </span>
                  );
                })}
              </div>
            )}

            {/* Add to Cart & Wishlist */}
            <div className="mt-auto pt-6 border-t border-brand/5 flex items-center gap-4 w-full">
              <button
                disabled={!!(selectedColor && selectedSize && currentStock === 0)}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center space-x-3 font-black py-4 rounded-2xl transition-all text-base shadow-xl ${selectedColor && selectedSize && currentStock === 0
                    ? "bg-brand/10 text-black/30 cursor-not-allowed"
                    : "bg-[#991b1b] text-white hover:bg-[#801414] active:scale-[0.98] border border-transparent shadow-red-900/10"
                  }`}
              >
                {added ? (
                  <Check size={22} className="text-white animate-in zoom-in duration-300" />
                ) : (
                  <ShoppingBag size={22} className="transition-all text-white" />
                )}
                <span>
                  {selectedColor && selectedSize && currentStock === 0 ? "Out of Stock" : added ? "Added!" : "Add to cart"}
                </span>
              </button>
              <button
                type="button"
                onClick={handleWishlistClick}
                className="flex-1 flex items-center justify-center space-x-3 font-black py-4 rounded-2xl transition-all text-base shadow-xl bg-black text-white hover:bg-black/90 active:scale-[0.98] border border-transparent cursor-pointer"
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500 animate-pulse" : "text-white"}`} />
                <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
              </button>
            </div>

            {/* 4 Dropdowns Section (Details, Shipping, Quality, Storage) */}
            <div className="mt-8 space-y-4 border-t border-black/10 pt-6">
              {/* Accordion 1: Product Details */}
              <div className="border-b border-black/10 pb-4">
                <button 
                  type="button"
                  onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                  className="w-full flex items-center justify-between text-left text-sm font-black uppercase tracking-wider text-black py-2 cursor-pointer focus:outline-none select-none"
                >
                  <span className="flex items-center gap-2">
                    📄 Product Details
                  </span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isDetailsExpanded ? "rotate-180" : "rotate-0"}`} />
                </button>
                
                {isDetailsExpanded && (
                  <div className="pt-4 pb-2 text-sm text-black/85 leading-relaxed transition-all duration-300 animate-in fade-in duration-300">
                    <div className="whitespace-pre-wrap font-medium text-black/85">
                      {product.fabricComposition || product.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping Information */}
              <div className="border-b border-black/10 pb-4">
                <button 
                  type="button"
                  onClick={() => setIsShippingExpanded(!isShippingExpanded)}
                  className="w-full flex items-center justify-between text-left text-sm font-black uppercase tracking-wider text-black py-2 cursor-pointer focus:outline-none select-none"
                >
                  <span className="flex items-center gap-2">
                    <Truck size={16} className="text-black/75" /> Shipping Information
                  </span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isShippingExpanded ? "rotate-180" : "rotate-0"}`} />
                </button>
                
                {isShippingExpanded && (
                  <div className="pt-4 pb-2 space-y-4 text-sm text-black/85 leading-relaxed transition-all duration-300 animate-in fade-in duration-300">
                    <p className="font-medium text-black/85">
                      We offer fast and reliable shipping on all orders. Processing time is 1-2 business days. Standard delivery typically takes 3-7 business days, depending on your location. You'll receive a tracking number once your order ships. If you need super fast or same day delivery contact our customer support agent +91 9790131444
                    </p>
                    <div>
                      <Link href="/shipping-payment" className="inline-block bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-colors">
                        Learn more
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Certified Quality */}
              <div className="border-b border-black/10 pb-4">
                <button 
                  type="button"
                  onClick={() => setIsQualityExpanded(!isQualityExpanded)}
                  className="w-full flex items-center justify-between text-left text-sm font-black uppercase tracking-wider text-black py-2 cursor-pointer focus:outline-none select-none"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardList size={16} className="text-black/75" /> Certified Quality
                  </span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isQualityExpanded ? "rotate-180" : "rotate-0"}`} />
                </button>
                
                {isQualityExpanded && (
                  <div className="pt-4 pb-2 space-y-4 text-sm text-black/85 leading-relaxed transition-all duration-300 animate-in fade-in duration-300">
                    <p className="font-medium text-black/85">
                      We take pride in delivering premium dry fish products that meet the highest standards of quality and safety. Our facility is FSSAI-certified and rated 5 stars for food hygiene and processing standards. Each batch is sourced from trusted fisheries, hygienically dried, and quality-checked to ensure freshness, purity, and great taste. Shop with confidence—you're getting the best.
                    </p>
                    <div>
                      <Link href="/terms-conditions" className="inline-block bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-colors">
                        Learn more
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 4: Storage Information */}
              <div className="border-b border-black/10 pb-4">
                <button 
                  type="button"
                  onClick={() => setIsStorageExpanded(!isStorageExpanded)}
                  className="w-full flex items-center justify-between text-left text-sm font-black uppercase tracking-wider text-black py-2 cursor-pointer focus:outline-none select-none"
                >
                  <span className="flex items-center gap-2">
                    <Package size={16} className="text-black/75" /> Storage Information
                  </span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isStorageExpanded ? "rotate-180" : "rotate-0"}`} />
                </button>
                
                {isStorageExpanded && (
                  <div className="pt-4 pb-2 space-y-4 text-sm text-black/85 leading-relaxed transition-all duration-300 animate-in fade-in duration-300">
                    <p className="font-medium text-black/85">
                      For best quality, store dry fish in a cool, dry, and well-ventilated area. In humid or warm climates, it's recommended to refrigerate the fish to preserve freshness and prevent spoilage. Always keep the product in an airtight container and away from moisture, direct sunlight, or strong odors.
                    </p>
                    <div>
                      <Link href="/cancellation-returns" className="inline-block bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-colors">
                        Learn more
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Floating Toast Notification */}
        {toast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#1B3022] text-[#C5A059] px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 font-bold text-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
            <Check size={18} />
            <span>{toast}</span>
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar for Mobile/Tablet */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-black/10 py-3.5 px-6 shadow-[0_-10px_25px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4 md:hidden">
        <div className="flex-1">
          <select 
            value={selectedSize || ""} 
            onChange={e => setSelectedSize(e.target.value)}
            className="w-full bg-brand/5 border border-black/10 rounded-xl px-3 py-3 text-xs font-black text-black uppercase tracking-wider outline-none cursor-pointer"
          >
            {availableSizes.map(size => {
              const varItem = variations.find(v => v.color === selectedColor && v.size === size);
              const price = varItem?.salePrice || displayPrice;
              return (
                <option key={size} value={size}>
                  {size} - ₹{price.toLocaleString()}
                </option>
              );
            })}
          </select>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-[#991b1b] hover:bg-[#801414] text-white text-xs font-black uppercase tracking-[0.2em] py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-center cursor-pointer"
        >
          {added ? "Added!" : "Add to cart"}
        </button>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand/60 backdrop-blur-md" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
            <div className="p-8 border-b border-brand/5 flex items-center justify-between bg-brand/5">
              <h2 className="text-2xl font-serif font-bold text-black">Size Guide</h2>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-2 hover:bg-brand/10 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="flex justify-center mb-8 bg-brand/5 p-2 rounded-2xl">
                <button
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${product.gender === 'men' ? 'bg-brand text-[#064e3b] shadow-lg' : 'text-black/40 hover:text-black'}`}
                  onClick={() => setProduct(p => p ? { ...p, gender: 'men' } : null)}
                >
                  Men's Guide
                </button>
                <button
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${product.gender === 'women' ? 'bg-brand text-[#064e3b] shadow-lg' : 'text-black/40 hover:text-black'}`}
                  onClick={() => setProduct(p => p ? { ...p, gender: 'women' } : null)}
                >
                  Women's Guide
                </button>
              </div>

              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-brand/5 bg-white">
                <img
                  src={product.gender === 'men' ? "/images/guides/male.jpg" : "/images/guides/female.jpg"}
                  alt={`${product.gender} Size Guide`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x800/f5f0e8/1b3022?text=Size+Guide+Image+Not+Found";
                  }}
                />
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-xs font-black text-black uppercase tracking-widest">How to Measure?</h4>
                <p className="text-xs text-black/60 leading-relaxed">
                  For the most accurate fit, we recommend having someone else measure you. Hold the tape measure snug, but not tight, against your body.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-brand/5 rounded-2xl">
                    <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1">Bust / Chest</p>
                    <p className="text-[10px] text-black/40">Measure around the fullest part of your chest.</p>
                  </div>
                  <div className="p-4 bg-brand/5 rounded-2xl">
                    <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1">Waist</p>
                    <p className="text-[10px] text-black/40">Measure around your natural waistline.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-brand/5 border-t border-brand/5 flex justify-center">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="bg-brand text-[#064e3b] px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-hover transition-all shadow-xl"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
