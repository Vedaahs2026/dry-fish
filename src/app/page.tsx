"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { ChevronLeft, ChevronRight, Sun, Leaf, FlaskConical, Package, Star } from "lucide-react";

type NavItem = {
  id: number;
  label: string;
  href: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
};

import { motion, AnimatePresence } from "framer-motion";

function isVideoUrl(url: string) {
  if (!url) return false;
  const cleanUrl = url.split("?")[0].toLowerCase();
  return (
    cleanUrl.endsWith(".mp4") ||
    cleanUrl.endsWith(".webm") ||
    cleanUrl.endsWith(".mov") ||
    cleanUrl.endsWith(".avi") ||
    cleanUrl.endsWith(".mkv") ||
    cleanUrl.includes("/video/upload/") ||
    (cleanUrl.includes(".cloudinary.com/") && cleanUrl.includes("/video/"))
  );
}

function parseOfferText(text: string) {
  if (text.includes("|")) {
    const parts = text.split("|");
    return { title: parts[0].trim(), subtitle: parts[1].trim() };
  }
  if (text.includes("!")) {
    const parts = text.split("!");
    const title = parts[0].trim();
    const subtitle = parts.slice(1).join("!").trim();
    return { title, subtitle: subtitle || null };
  }
  return { title: text.trim(), subtitle: null };
}

export default function Home() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [bannerUrl, setBannerUrl] = useState("");
  const [offers, setOffers] = useState<any[]>([]);
  const [homepageCatCards, setHomepageCatCards] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);



  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const res = await fetch("/api/admin/nav");
        const data = await res.json();
        if (data.success) {
          setNavItems(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch nav items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNavItems();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const resBanner = await fetch("/api/admin/settings?key=homepage_banner");
        const dataBanner = await resBanner.json();
        if (dataBanner.success && dataBanner.data) {
          setBannerUrl(dataBanner.data.value);
        }

        const resOffers = await fetch("/api/admin/offers");
        const dataOffers = await resOffers.json();
        if (dataOffers.success) {
          setOffers(dataOffers.data);
        }

        const resReviews = await fetch("/api/admin/reviews");
        const dataReviews = await resReviews.json();
        if (dataReviews.success) {
          setReviews(dataReviews.data || []);
        }

        const resCatCards = await fetch("/api/admin/homepage-categories");
        const dataCatCards = await resCatCards.json();
        if (dataCatCards.success) {
          setHomepageCatCards(dataCatCards.data);
        }
      } catch (err) {
        console.error("Failed to fetch settings/offers/categories/reviews", err);
      }
    }
    fetchData();
  }, []);

  const banners = useMemo(() => {
    if (!bannerUrl) return [];
    try {
      const parsed = JSON.parse(bannerUrl);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => {
          if (typeof item === "string") return { url: item, link: null };
          return { url: item.url || "", link: item.link || null };
        });
      }
    } catch (e) {
      // Fallback to legacy
    }
    return bannerUrl.split(",").map((url) => ({ url: url.trim(), link: null })).filter(b => b.url);
  }, [bannerUrl]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const marqueeItems = useMemo(() => {
    if (offers.length === 0) return [];
    const repeats = offers.length === 1 ? 12 : offers.length === 2 ? 6 : 4;
    const list = [];
    for (let i = 0; i < repeats; i++) {
      list.push(...offers);
    }
    return list;
  }, [offers]);

  return (
    <div className="min-h-screen bg-brand-light text-black font-sans selection:bg-brand-accent/30">



      {/* 2. Dynamic Home Banner Carousel (supports image and video) */}
      {banners.length > 0 && (
        <div className="w-full relative overflow-hidden border-b border-brand/10 group mt-0 bg-brand-light">
          {banners.length === 1 ? (
            <div className="w-full relative h-auto">
              {banners[0].link === "#featured-collections" ? (
                <a
                  href="#featured-collections"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("featured-collections")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block w-full h-auto cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition-all duration-300"
                >
                  {isVideoUrl(banners[0].url) ? (
                    <video src={banners[0].url} className="w-full h-auto" autoPlay muted loop playsInline />
                  ) : (
                    <img
                      src={banners[0].url}
                      alt="Current Offers & Collections"
                      className="w-full h-auto transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
                    />
                  )}
                </a>
              ) : banners[0].link ? (
                <Link
                  href={banners[0].link}
                  className="block w-full h-auto cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition-all duration-300"
                >
                  {isVideoUrl(banners[0].url) ? (
                    <video src={banners[0].url} className="w-full h-auto" autoPlay muted loop playsInline />
                  ) : (
                    <img
                      src={banners[0].url}
                      alt="Current Offers & Collections"
                      className="w-full h-auto transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
                    />
                  )}
                </Link>
              ) : (
                isVideoUrl(banners[0].url) ? (
                  <video src={banners[0].url} className="w-full h-auto" autoPlay muted loop playsInline />
                ) : (
                  <img
                    src={banners[0].url}
                    alt="Current Offers & Collections"
                    className="w-full h-auto transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
                  />
                )
              )}
              <div className="absolute inset-0 bg-black/[0.02] pointer-events-none"></div>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden aspect-[21/9] sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[21/9]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentBannerIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  {banners[currentBannerIndex]?.link === "#featured-collections" ? (
                    <a
                      href="#featured-collections"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("featured-collections")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="block w-full h-full cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition-all duration-300"
                    >
                      {isVideoUrl(banners[currentBannerIndex]?.url) ? (
                        <video src={banners[currentBannerIndex]?.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                      ) : (
                        <img
                          src={banners[currentBannerIndex]?.url}
                          alt={`Promo Banner ${currentBannerIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </a>
                  ) : banners[currentBannerIndex]?.link ? (
                    <Link
                      href={banners[currentBannerIndex].link}
                      className="block w-full h-full cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition-all duration-300"
                    >
                      {isVideoUrl(banners[currentBannerIndex]?.url) ? (
                        <video src={banners[currentBannerIndex]?.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                      ) : (
                        <img
                          src={banners[currentBannerIndex]?.url}
                          alt={`Promo Banner ${currentBannerIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </Link>
                  ) : (
                    isVideoUrl(banners[currentBannerIndex]?.url) ? (
                      <video src={banners[currentBannerIndex]?.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    ) : (
                      <img
                        src={banners[currentBannerIndex]?.url}
                        alt={`Promo Banner ${currentBannerIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/[0.02] pointer-events-none"></div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={() =>
                  setCurrentBannerIndex(
                    (prev) => (prev - 1 + banners.length) % banners.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              >
                <ChevronRight size={20} />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentBannerIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentBannerIndex
                        ? "bg-[#C5A059] w-6"
                        : "bg-white/60 hover:bg-white"
                      }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ProductGrid />

        {/* Brand Intro Section (styled after reference image) */}
        <section className="bg-[#FAF6ED] rounded-[2.5rem] p-8 md:p-14 my-16 border border-[#C5A059]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
          <div className="flex-1 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center bg-[#C5A059]/15 border-2 border-[#C5A059]/30 text-[#C5A059] text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full select-none">
              Premium Quality
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-gabriola font-bold tracking-wide text-[#064e3b] leading-tight">
              Dry Fish Basket
            </h2>

            {/* 4 key points grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C5A059] text-[#064e3b] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Sun size={24} className="fill-[#064e3b]/10" />
                </div>
                <span className="text-xs md:text-sm font-black uppercase tracking-wider text-[#064e3b] leading-snug">
                  Sun dried and handpicked Quality
                </span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C5A059] text-[#064e3b] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Leaf size={24} className="fill-[#064e3b]/10" />
                </div>
                <span className="text-xs md:text-sm font-black uppercase tracking-wider text-[#064e3b] leading-snug">
                  100% organic
                </span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C5A059] text-[#064e3b] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <FlaskConical size={24} className="fill-[#064e3b]/10" />
                </div>
                <span className="text-xs md:text-sm font-black uppercase tracking-wider text-[#064e3b] leading-snug">
                  No preservative and Chemicals
                </span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C5A059] text-[#064e3b] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Package size={24} className="fill-[#064e3b]/10" />
                </div>
                <span className="text-xs md:text-sm font-black uppercase tracking-wider text-[#064e3b] leading-snug">
                  International standards packing
                </span>
              </div>
            </div>
          </div>

          {/* Illustration image on the right */}
          <div className="w-full md:w-5/12 max-w-sm flex items-center justify-center">
            <div className="relative group w-full">
              <img
                src="/images/intro_illustration.png"
                alt="Dry Fish Basket Quality"
                className="w-full aspect-[4/3] object-cover rounded-[2rem] shadow-lg border border-[#C5A059]/20 transition-transform duration-500 group-hover:scale-[1.02]"
                onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        </section>

        {/* Dynamic Reviews Section */}
        {reviews.length > 0 && (
          <section className="w-full mx-auto my-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center mb-12 border-b border-brand/10 pb-6"
            >
              <h2 className="text-4xl font-playfair font-bold mb-3 text-black">Customer Testimonials</h2>
              <p className="text-gray-600 italic">See what our customers love about our traditional delicacies.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="p-8 bg-white border border-brand/5 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? "fill-[#C5A059] text-[#C5A059]" : "text-black/15"}
                        />
                      ))}
                    </div>
                    <p className="text-black/75 text-sm italic leading-relaxed mb-6">
                      "{review.comment}"
                    </p>
                  </div>
                  <div className="border-t border-brand/5 pt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-black">{review.userName}</span>
                    {review.designation && (
                      <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-wider">{review.designation}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

