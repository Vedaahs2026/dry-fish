"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Star } from "lucide-react";

export default function MyStory() {
  return (
    <main className="min-h-screen bg-[#FAF6ED] text-[#3b2314] font-sans selection:bg-[#8c6239]/20 pb-20">
      
      {/* 1. Header & Main Intro Section */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-10 text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-serif font-black text-[#8c6239] leading-tight">
          About Us – Godavari Dry Fish
        </h1>
        <div className="w-24 h-1 bg-[#8c6239]/20 mx-auto rounded-full"></div>
        <p className="text-xs md:text-sm text-black/75 font-medium leading-relaxed max-w-3xl mx-auto text-justify md:text-center">
          At Godavari Dry Fish, we bring you authentic coastal flavours of Andhra Pradesh using traditional, time-honoured methods from the Godavari region. Based in Bhimavaram, we work with trusted fishermen who follow sustainable practices to deliver premium, hygienically processed dry fish across India. Every batch is naturally sun-dried, carefully cleaned, and packed in food-grade, moisture-free packaging to preserve purity, freshness, and nutrition.
        </p>
      </section>

      {/* 2. Split Process / Why Choose Us Section */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Traditional Sun-drying Process Image */}
          <div className="relative rounded-[2rem] overflow-hidden border border-[#8c6239]/15 shadow-md aspect-[4/3] md:aspect-auto min-h-[350px] bg-brand/5">
            <img
              src="https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80"
              alt="Traditional sun-drying process of Godavari Dry Fish"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/800x600/FAF6ED/8c6239?text=Traditional+Sun-Drying+Process";
              }}
            />
          </div>

          {/* Right Column: Why Choose Godavari Dry Fish text */}
          <div className="bg-[#FAF6ED] border border-[#8c6239]/15 rounded-[2rem] p-8 flex flex-col justify-center space-y-4 shadow-sm text-left">
            <h2 className="text-lg md:text-xl font-serif font-black text-[#8c6239] flex items-center gap-2">
              🔥 Why Choose Godavari Dry Fish?
            </h2>
            <span className="text-[10px] font-black text-black/40 uppercase tracking-widest block">
              December 9, 2025
            </span>
            <p className="text-xs md:text-sm text-black/75 font-medium leading-relaxed">
              Why Choose GodavariDryFish ? At GodavariDryFish.com, we don't just sell seafood; we deliver a piece of our coastal heritage. Here is why thousands of seafood lovers across India trust us:...
            </p>
            <div className="pt-2">
              <Link 
                href="/search"
                className="text-xs font-black uppercase tracking-wider text-[#8c6239] hover:underline"
              >
                Read more...
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Center Story & Order Now Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="bg-white border border-[#8c6239]/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-6">
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#8c6239] flex items-center justify-center gap-2">
            ⭐️ Our Story ⭐️
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-4 text-xs md:text-sm text-black/85 leading-relaxed font-medium">
            <p>
              Born out of love for traditional coastal food, <span className="font-bold text-[#8c6239]">Godavari Dry Fish</span> started with one idea:
            </p>
            <p className="italic bg-[#FAF6ED] p-4 rounded-xl border border-[#8c6239]/10 font-bold block max-w-xl mx-auto text-black">
              "Everyone deserves access to clean, authentic and tasty dry fish at the right price."
            </p>
            <p>
              Many people living away from their hometowns miss the flavour of real Godavari dry fish. We bridge that gap by delivering the same <span className="font-bold">home-style quality</span> to your doorstep—fresh, flavourful, and affordable.
            </p>
          </div>

          <div className="pt-6">
            <Link
              href="/search"
              className="inline-block bg-[#8c6239] hover:bg-[#734f2d] text-[#FAF6ED] px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
