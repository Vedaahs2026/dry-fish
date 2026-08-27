"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { getFirstProductImageUrl, getProductImageUrls } from "@/utils/product";

import { Loader2, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  name: string;
  description: string;
  salePrice: number;
  basePrice: number;
  images: string; // JSON string
  colors: string | null;
  gender: string | null;
  category?: string;
  isFeatured: boolean | number | null;
  isCustomizable: boolean | number | null;
  sizes?: string[];
  style?: string | null;
  neckStyle?: string | null;
  keyWords?: string | null;
  avgRating?: number | string | null;
  numReviews?: number | string | null;
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
  "forest green": "#8c6239",
  green: "#22C55E",
  yellow: "#EAB308",
};

function AllProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Price Limits Computation
  const [minLimit, maxLimit] = useMemo(() => {
    if (products.length === 0) return [0, 10000];
    let min = Infinity;
    let max = -Infinity;
    products.forEach((p) => {
      const price = p.salePrice || p.basePrice || 0;
      if (price < min) min = price;
      if (price > max) max = price;
    });
    if (min === Infinity || max === -Infinity) return [0, 10000];
    if (min === max) return [Math.max(0, min - 100), min + 100];
    return [Math.floor(min), Math.ceil(max)];
  }, [products]);

  // Filter and Sorting states
  const [selectedGender, setSelectedGender] = useState<"men" | "women" | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isDesktopFiltersOpen, setIsDesktopFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [activeThumb, setActiveThumb] = useState<"min" | "max">("min");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPriceRange([minLimit, maxLimit]);
  }, [minLimit, maxLimit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGender, selectedColors, selectedSizes, priceRange, sortBy]);

  useEffect(() => {
    async function loadAllProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAllProducts();
  }, []);

  // Helpers
  const formatColorName = (c: string) => c.includes("::") ? c.split("::")[0] : c;

  // Filter Option Extractors
  const availableColors = useMemo(() => {
    const colorsSet = new Set<string>();
    products.forEach((p) => {
      try {
        const parsed = JSON.parse(p.colors || "[]");
        if (Array.isArray(parsed)) {
          parsed.forEach((c) => colorsSet.add(c.trim()));
        }
      } catch {}
    });
    return Array.from(colorsSet).filter(Boolean);
  }, [products]);

  const availableSizes = useMemo(() => {
    const sizesSet = new Set<string>();
    products.forEach((p) => {
      try {
        const parsed = p.sizes || [];
        if (Array.isArray(parsed)) {
          parsed.forEach((s) => sizesSet.add(s.trim()));
        }
      } catch {}
    });
    return Array.from(sizesSet).filter(Boolean);
  }, [products]);

  // Color options and counts
  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      try {
        const parsed = JSON.parse(p.colors || "[]");
        if (Array.isArray(parsed)) {
          parsed.forEach((c) => {
            const trimmed = c.trim();
            if (trimmed) {
              counts[trimmed] = (counts[trimmed] || 0) + 1;
            }
          });
        }
      } catch {}
    });
    return counts;
  }, [products]);

  // Size options and counts
  const sizeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      try {
        const parsed = p.sizes || [];
        if (Array.isArray(parsed)) {
          parsed.forEach((s) => {
            const trimmed = s.trim();
            if (trimmed) {
              counts[trimmed] = (counts[trimmed] || 0) + 1;
            }
          });
        }
      } catch {}
    });
    return counts;
  }, [products]);

  // Filters application
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Gender Filter
    if (selectedGender) {
      result = result.filter(
        (p) => (p.gender || "").toLowerCase() === selectedGender
      );
    }

    // 2. Colors Filter
    if (selectedColors.length > 0) {
      result = result.filter((p) => {
        try {
          const parsedColors = JSON.parse(p.colors || "[]") as string[];
          return parsedColors.some((c) => selectedColors.includes(c.trim()));
        } catch {
          return false;
        }
      });
    }

    // 3. Sizes Filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) => {
        const pSizes = p.sizes || [];
        return pSizes.some((s) => selectedSizes.includes(s.trim()));
      });
    }

    // 4. Price Filter
    result = result.filter((p) => {
      const price = p.salePrice || p.basePrice || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // 5. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice));
    }

    return result;
  }, [products, selectedGender, selectedColors, selectedSizes, priceRange, sortBy]);

  // Pagination bounds
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleClearFilters = () => {
    setSelectedGender(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([minLimit, maxLimit]);
    setSortBy("default");
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-48 w-full">
        <Loader2 className="animate-spin text-[#8c6239] mb-4" size={48} strokeWidth={1.5} />
        <p className="text-black/40 font-black uppercase tracking-[0.3em] text-[10px]">Loading Catalog...</p>
      </div>
    );
  }

  const renderFilterSidebar = () => {
    return (
      <>
        {/* Section 1: Colors */}
        {availableColors.length > 0 && (
          <div className="mb-6 pb-6 border-b border-[#064e3b]/5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#064e3b]/40 mb-3 ml-1">Colors</h3>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {availableColors.map((color) => {
                const count = colorCounts[color] || 0;
                const isChecked = selectedColors.includes(color);
                const displayName = color.includes("::") ? color.split("::")[0] : color;
                const actualColorValue = color.includes("::") ? color.split("::")[1] : color;
                const lowerColor = actualColorValue.toLowerCase();
                const hexCode = COLOR_MAP[lowerColor] || (actualColorValue.startsWith("#") ? actualColorValue : "#CCCCCC");
                const isWhite = lowerColor === "white" || hexCode === "#FFFFFF";

                return (
                  <label
                    key={color}
                    className="flex items-center gap-3 text-xs font-bold text-[#064e3b]/75 cursor-pointer hover:text-[#064e3b] transition-colors select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleColorToggle(color)}
                      className="rounded border-[#064e3b]/20 accent-[#064e3b] w-4 h-4 cursor-pointer"
                    />
                    <span
                      className={`w-3.5 h-3.5 rounded-full inline-block border shadow-sm flex-shrink-0 ${
                        isWhite ? "border-[#064e3b]/20" : "border-transparent"
                      }`}
                      style={{ backgroundColor: hexCode }}
                    />
                    <span className="flex-1 capitalize">{displayName}</span>
                    <span className="text-[#064e3b]/35 text-[10px] font-medium">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Sizes */}
        {availableSizes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#064e3b]/40 mb-3 ml-1">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => {
                const count = sizeCounts[size] || 0;
                const isChecked = selectedSizes.includes(size);

                return (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`h-9 min-w-[2.25rem] px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                      isChecked
                        ? "bg-[#eab308] text-[#064e3b] border-transparent shadow-sm"
                        : "bg-[#FFFDF6] text-[#064e3b]/70 border-[#064e3b]/10 hover:border-[#064e3b]/30"
                    }`}
                  >
                    <span>{size}</span>
                    <span className={`text-[8px] font-medium ${isChecked ? "text-white/60" : "text-[#064e3b]/35"}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price Range Slider */}
        <div className="mb-4 pb-4 border-b border-[#064e3b]/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#064e3b]/40 ml-1">Price Range</h3>
            <span className="text-xs font-bold text-[#064e3b]/80">
              ₹{priceRange[0].toLocaleString("en-IN")} - ₹{priceRange[1].toLocaleString("en-IN")}{priceRange[1] >= maxLimit ? "+" : ""}
            </span>
          </div>
          
          <div className="range-slider-container relative w-full h-5 flex items-center px-1">
            <div className="absolute left-1 right-1 h-1 bg-[#eab308]/10 rounded-full pointer-events-none" />
            <div
              className="absolute h-1 bg-[#FF4E20] rounded-full pointer-events-none"
              style={{
                left: `${((priceRange[0] - minLimit) / (maxLimit - minLimit || 1)) * 100}%`,
                right: `${100 - ((priceRange[1] - minLimit) / (maxLimit - minLimit || 1)) * 100}%`
              }}
            />
            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              value={priceRange[0]}
              onMouseDown={() => setActiveThumb("min")}
              onTouchStart={() => setActiveThumb("min")}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), priceRange[1]);
                setPriceRange([val, priceRange[1]]);
              }}
              style={{ zIndex: activeThumb === "min" ? 25 : 20 }}
              className="absolute left-0 w-full top-0 h-5 appearance-none bg-transparent cursor-pointer pointer-events-none"
            />
            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              value={priceRange[1]}
              onMouseDown={() => setActiveThumb("max")}
              onTouchStart={() => setActiveThumb("max")}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), priceRange[0]);
                setPriceRange([priceRange[0], val]);
              }}
              style={{ zIndex: activeThumb === "max" ? 25 : 20 }}
              className="absolute left-0 w-full top-0 h-5 appearance-none bg-transparent cursor-pointer pointer-events-none"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#064e3b]/40 mb-3 ml-1">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-[#FFFDF6] text-xs font-bold text-[#064e3b] border border-[#064e3b]/10 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </>
    );
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch relative z-30">
      {/* Left Column: Sidebar Filters */}
      <div className="hidden lg:block w-72 flex-shrink-0 bg-[#FAF6ED] border-r border-[#064e3b]/5 px-8 py-10">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#064e3b]/5">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#064e3b] flex items-center gap-2">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </h2>
            {(selectedColors.length > 0 || selectedSizes.length > 0 || selectedGender || sortBy !== "default") && (
              <button
                onClick={handleClearFilters}
                className="text-[10px] font-black uppercase tracking-widest text-[#FF4E20] hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          {renderFilterSidebar()}
        </div>
      </div>

      {/* Right Column: Products Grid */}
      <div className="flex-grow min-w-0 px-6 sm:px-8 lg:px-12 py-8 lg:py-10 max-w-7xl mx-auto w-full">
        {/* Header Title */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8 md:mb-10 text-left border-b border-[#064e3b]/5 pb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-playfair font-black text-[#064e3b] tracking-wide mb-2">
              All Products
            </h1>
            <p className="text-[#064e3b]/60 italic text-sm">
              Found {filteredAndSortedProducts.length} authentic delicacies
            </p>
          </div>
        </div>

        {/* Product Grid / Empty Filter State */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-24 text-center bg-[#FFFDF6] rounded-[2.5rem] border border-[#064e3b]/5 shadow-sm max-w-md mx-auto px-6">
            <div className="w-16 h-16 bg-[#eab308]/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <SlidersHorizontal size={24} className="text-[#064e3b]/40" />
            </div>
            <h3 className="text-lg font-bold text-[#064e3b] mb-2">No Matching Filters</h3>
            <p className="text-[#064e3b]/60 mb-6 text-xs leading-relaxed">
              We couldn't find any products matching the selected filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-[#eab308] text-[#064e3b] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#32451B] transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => {
                const parsedImages = getProductImageUrls(product.images, product.colors);
                const firstImage = getFirstProductImageUrl(product.images, product.colors);

                return (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      id: product.id.toString(),
                      name: product.name,
                      description: product.description || "",
                      price: product.salePrice || product.basePrice,
                      basePrice: product.basePrice,
                      salePrice: product.salePrice,
                      imageUrl: firstImage,
                      images: parsedImages,
                      categorySlug: product.category || "all",
                    }} 
                  />
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-8 border-t border-[#064e3b]/5">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-xl border border-[#064e3b]/10 text-xs font-bold text-[#064e3b] hover:bg-[#eab308]/5 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrent = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-[#eab308] text-[#C5A059] shadow-md scale-105"
                          : "border border-[#064e3b]/10 text-[#064e3b] hover:bg-[#eab308]/5"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-xl border border-[#064e3b]/10 text-xs font-bold text-[#064e3b] hover:bg-[#eab308]/5 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllProductsPage() {
  return (
    <main className="min-h-screen bg-brand-light">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-[#C5A059]" size={40} />
        </div>
      }>
        <AllProductsList />
      </Suspense>
    </main>
  );
}
