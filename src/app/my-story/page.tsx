"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Star, X } from "lucide-react";

export default function MyStory() {
  const [isWhyChooseModalOpen, setIsWhyChooseModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF6ED] text-[#3b2314] font-sans selection:bg-[#8c6239]/20 pb-20">
      
      {/* 1. Header & Main Intro Section */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-10 text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-serif font-black text-[#8c6239] leading-tight">
          About Us – Dry Fish Basket
        </h1>
        <div className="w-24 h-1 bg-[#8c6239]/20 mx-auto rounded-full"></div>
        <p className="text-xs md:text-sm text-black/75 font-medium leading-relaxed max-w-3xl mx-auto text-justify md:text-center">
          At Dry Fish Basket, we bring you authentic coastal flavours of Andhra Pradesh using traditional, time-honoured methods from the coastal region. Based in Bhimavaram, we work with trusted fishermen who follow sustainable practices to deliver premium, hygienically processed dry fish across India. Every batch is naturally sun-dried, carefully cleaned, and packed in food-grade, moisture-free packaging to preserve purity, freshness, and nutrition.
        </p>
      </section>

      {/* 2. Split Process / Why Choose Us Section */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Traditional Sun-drying Process Image */}
          <div className="relative rounded-[2rem] overflow-hidden border border-[#8c6239]/15 shadow-md aspect-[4/3] md:aspect-auto min-h-[350px] bg-brand/5">
            <img
              src="https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80"
              alt="Traditional sun-drying process of Dry Fish Basket"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/800x600/FAF6ED/8c6239?text=Traditional+Sun-Drying+Process";
              }}
            />
          </div>

          {/* Right Column: Why Choose Dry Fish Basket text */}
          <div className="bg-[#FAF6ED] border border-[#8c6239]/15 rounded-[2rem] p-8 flex flex-col justify-center space-y-4 shadow-sm text-left">
            <h2 className="text-lg md:text-xl font-serif font-black text-[#8c6239] flex items-center gap-2">
              🔥 Why Choose Dry Fish Basket?
            </h2>
            <span className="text-[10px] font-black text-black/40 uppercase tracking-widest block">
              December 9, 2025
            </span>
            <p className="text-xs md:text-sm text-black/75 font-medium leading-relaxed">
              Why Choose Dry Fish Basket? At Dry Fish Basket, we don't just sell seafood; we deliver a piece of our coastal heritage. Here is why thousands of seafood lovers across India trust us:...
            </p>
            <div className="pt-2">
              <button 
                type="button"
                onClick={() => setIsWhyChooseModalOpen(true)}
                className="text-xs font-black uppercase tracking-wider text-[#8c6239] hover:underline cursor-pointer focus:outline-none"
              >
                Read more...
              </button>
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
              Born out of love for traditional coastal food, <span className="font-bold text-[#8c6239]">Dry Fish Basket</span> started with one idea:
            </p>
            <p className="italic bg-[#FAF6ED] p-4 rounded-xl border border-[#8c6239]/10 font-bold block max-w-xl mx-auto text-black">
              "Everyone deserves access to clean, authentic and tasty dry fish at the right price."
            </p>
            <p>
              Many people living away from their hometowns miss the flavour of real sun-dried fish. We bridge that gap by delivering the same <span className="font-bold">home-style quality</span> to your doorstep—fresh, flavourful, and affordable.
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

      {/* Why Choose Us Pop-up Modal */}
      {isWhyChooseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#8c6239]/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsWhyChooseModalOpen(false)} />
          
          <div className="relative bg-white w-full max-w-xl max-h-[80vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-[#8c6239]/15">
            {/* Header */}
            <div className="p-6 border-b border-[#8c6239]/10 flex items-center justify-between bg-brand/5">
              <h2 className="text-base md:text-lg font-serif font-black text-[#8c6239] flex items-center gap-2">
                🔥 Why Choose Dry Fish Basket?
              </h2>
              <button
                onClick={() => setIsWhyChooseModalOpen(false)}
                className="p-2 text-black hover:bg-[#8c6239]/10 rounded-full transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[#3b2314] custom-scrollbar">
              <p className="text-xs md:text-sm font-semibold text-black/80 italic">
                At dryfishbasket.in, we don't just sell seafood; we deliver a piece of our coastal heritage. Here is why thousands of seafood lovers across India trust us:
              </p>

              <div className="space-y-5 text-xs md:text-sm">
                {/* Point 1 */}
                <div className="space-y-1">
                  <h3 className="font-bold text-[#8c6239] text-xs uppercase tracking-wider">🐟 Authentic Taste</h3>
                  <p className="text-black/75 leading-relaxed">
                    Sourced directly from the pristine coastlines, our fish carries the legendary "Andhra Style" flavor that is hard to find in big cities. From <strong>Nethallu (Anchovies)</strong> to <strong>Endu Royyalu (Dry Prawns)</strong>, every bite takes you back to the roots of traditional coastal cooking.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="space-y-2">
                  <h3 className="font-bold text-[#8c6239] text-xs uppercase tracking-wider">💎 Premium Quality, Zero Chemicals</h3>
                  <p className="text-black/75 leading-relaxed">
                    We believe that what is good for the soul should be good for the body.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-black/75">
                    <li><strong>100% Natural:</strong> Naturally sun-dried using traditional methods.</li>
                    <li><strong>No Hidden Nasties:</strong> Zero urea, no artificial colors, and no harmful preservatives.</li>
                    <li><strong>Clean & Hygienic:</strong> Processed in controlled environments to ensure you get sand-free, high-protein seafood.</li>
                  </ul>
                </div>

                {/* Point 3 */}
                <div className="space-y-1">
                  <h3 className="font-bold text-[#8c6239] text-xs uppercase tracking-wider">💰 Direct from Source, Low Prices</h3>
                  <p className="text-black/75 leading-relaxed">
                    By cutting out the middleman and sourcing directly from local fishing communities, we provide <strong>Export Quality</strong> dry fish at <strong>Wholesale Prices</strong>. You get premium seafood without the premium price tag.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="space-y-2">
                  <h3 className="font-bold text-[#8c6239] text-xs uppercase tracking-wider">🚚 Pan-India Doorstep Delivery</h3>
                  <p className="text-black/75 leading-relaxed">
                    Missing the taste of home in Bangalore, Mumbai, Kolkata, or Chennai? We've got you covered!
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-black/75">
                    <li><strong>Odor-Proof Packaging:</strong> Our specialized vacuum-sealing ensures that the aroma stays inside the pack until it reaches your kitchen.</li>
                    <li><strong>Pan-India Reach:</strong> We deliver to every corner of India with real-time tracking so you can plan your next meal with confidence.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-brand/5 border-t border-[#8c6239]/10 flex justify-end">
              <button
                onClick={() => setIsWhyChooseModalOpen(false)}
                className="bg-[#8c6239] hover:bg-[#734f2d] text-[#FAF6ED] px-6 py-2 rounded-xl font-bold uppercase tracking-widest text-[9px] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
