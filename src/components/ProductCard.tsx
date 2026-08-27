"use client";

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { usePathname } from 'next/navigation';
import HoverImageCarousel from './HoverImageCarousel';

interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  basePrice?: number;
  salePrice?: number;
  imageUrl: string;
  images?: string[];
  categorySlug: string;
  isCustomizable?: boolean;
  style?: string | null;
  neckStyle?: string | null;
  keyWords?: string | null;
  avgRating?: number | string | null;
  numReviews?: number | string | null;
}

export default function ProductCard({ product }: { product: Product }) {
  const basePrice = product.basePrice ?? product.price ?? 0;
  const salePrice = product.salePrice ?? product.price ?? 0;
  
  // Active price to display
  const activePrice = salePrice > 0 && salePrice < basePrice ? salePrice : basePrice;
  const originalPrice = basePrice;
  
  // Calculate discount percentage automatically
  const discount = originalPrice > 0 && activePrice < originalPrice
    ? Math.round(((originalPrice - activePrice) / originalPrice) * 100)
    : 0;

  const pathname = usePathname();
  const isWishlisted = useWishlistStore((state) => state.items.some((item) => item.productId === Number(product.id)));
  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const isAuthenticated = useWishlistStore((state) => state.isAuthenticated);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      window.location.href = `/login?redirect=${encodeURIComponent(pathname)}`;
      return;
    }

    if (isWishlisted) {
      await removeItem(Number(product.id));
    } else {
      await addItem(Number(product.id));
    }
  };

  return (
    <Link 
      href={`/product/${product.id}`} 
      className="group flex flex-col w-full bg-[#FFFDF6] rounded-3xl border border-brand/5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 overflow-hidden"
    >
      {/* Top Image Section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-brand-light/50 border-b border-brand/5">
        <HoverImageCarousel 
          images={product.images || []}
          defaultImage={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          className="transform group-hover:scale-105 transition-transform duration-700" 
        />

        {/* Left Badge - e.g. PATTARAI MADE (Placed after carousel with z-30) */}
        {product.neckStyle && (
          <div className="absolute top-3 left-3 z-30 bg-[#eab308] px-3 py-1 rounded-lg border-2 border-black shadow-md flex items-center justify-center">
            <span className="text-[9px] font-black uppercase tracking-wider text-black">
              {product.neckStyle}
            </span>
          </div>
        )}

        {/* Right Circular Discount Badge (Placed after carousel with z-30) */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 z-30 bg-[#991b1b] text-white text-[10px] font-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg border border-white/20">
            -{discount}%
          </div>
        )}

        {/* Wishlist Heart Icon (Bottom Right, Placed after carousel with z-30) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className="absolute bottom-3 right-3 z-30 p-2 rounded-full bg-black/45 text-white hover:bg-black/60 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center"
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-white"} />
        </button>
      </div>
      
      {/* Bottom Content Section */}
      <div className="pt-4 pb-4 px-3 flex flex-col flex-1 items-center justify-between">
        
        {/* Product Name (Centered) */}
        <h3 className="text-sm md:text-base font-bold text-black text-center mb-2 line-clamp-2 px-1 w-full leading-snug">
          {product.name}
        </h3>

        {/* Key Attributes (e.g. OMEGA3, MID SALT - Centered) */}
        {product.keyWords && (
          <div className="flex items-center justify-center gap-2 mb-2 w-full">
            {product.keyWords.split(",").map(k => k.trim()).filter(Boolean).slice(0, 2).map((char, index) => (
              <span 
                key={char} 
                className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                  index === 0 
                    ? "bg-[#eff6ff] text-[#1e40af] border border-[#dbeafe]" 
                    : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        )}

        {/* Description (Centered) */}
        <p className="text-[11px] md:text-xs text-black/60 font-medium text-center line-clamp-2 mb-3 leading-relaxed px-1 w-full">
          {product.description || "Fresh sundried premium quality"}
        </p>
        
        {/* Pricing Block (Centered at Bottom) */}
        <div className="flex items-center justify-center gap-2 mt-auto pt-2 border-t border-black/5 w-full">
          {discount > 0 ? (
            <>
              <span className="text-xs text-black/45 line-through font-bold">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="text-sm md:text-base font-black text-black">
                ₹{activePrice.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-sm md:text-base font-black text-black">
              ₹{activePrice.toLocaleString()}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}
