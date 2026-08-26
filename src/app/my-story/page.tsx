"use client";

import React from "react";
import { Mail, Phone, Camera, Share2, Send, MessageCircle, Sparkles } from "lucide-react";


export default function MyStory() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FCFBF8] via-[#FDFBF7] to-[#F7F3EB] text-[#1B3022]">



      {/* Narrative Section */}
      <section className="max-w-6xl mx-auto px-6 pt-4 pb-12 md:pt-8 md:pb-16 relative">
        <div className="absolute -right-20 top-40 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-[100px]"></div>

        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <div>
              <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1B3022] leading-tight mb-4">
                The Vision Behind <span className="text-[#C5A059]">Venkys Dried Fish Basket</span>
              </h2>
              <div className="w-20 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
            </div>

            <div className="space-y-6 text-base md:text-lg text-[#1B3022]/75 font-medium leading-relaxed max-w-2xl mx-auto text-center">
              <p>
                Welcome to Venkys Dried Fish Basket, where we bring you the finest traditional sun-dried fish, prepared with utmost hygiene and care. Sourced directly from trusted coastal fishermen, our selection of premium dry fish preserves the authentic taste of coastal culinary traditions. We are committed to delivering the highest quality dry fish, thoroughly cleaned and vacuum-sealed, straight to your doorstep.
              </p>
              <p>
                Welcome to Venkys Dried Fish Basket, where we bring you the finest traditional sun-dried fish, prepared with utmost hygiene and care. Sourced directly from trusted coastal fishermen, our selection of premium dry fish preserves the authentic taste of coastal culinary traditions. We are committed to delivering the highest quality dry fish, thoroughly cleaned and vacuum-sealed, straight to your doorstep.
              </p>
              <p>
                Welcome to Venkys Dried Fish Basket, where we bring you the finest traditional sun-dried fish, prepared with utmost hygiene and care. Sourced directly from trusted coastal fishermen, our selection of premium dry fish preserves the authentic taste of coastal culinary traditions. We are committed to delivering the highest quality dry fish, thoroughly cleaned and vacuum-sealed, straight to your doorstep.
              </p>
            </div>

            <div className="pt-6 max-w-xl mx-auto">
              <p className="italic text-[#C5A059] font-playfair text-xl py-4 bg-[#C5A059]/5 rounded-3xl border border-[#C5A059]/10 px-8 text-center">
                "We don't just sell dried fish; we deliver authentic coastal traditions to your plate."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="contact" className="bg-[#FFFDF6] py-24 text-[#1B3022] overflow-hidden relative border-t border-brand/5 shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h3 className="text-3xl font-playfair font-bold mb-8 flex items-center gap-3 text-black">
              Contact Us <Sparkles size={24} className="text-[#C5A059]" />
            </h3>
            <div className="space-y-6">
              <a href="mailto:dryfishbasket2627@gmail.com" className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3022]/5 flex items-center justify-center group-hover:bg-[#C5A059] transition-all duration-500">
                  <Mail size={20} className="text-[#C5A059] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3022]/40">Email Us</p>
                  <p className="text-lg font-bold text-[#1B3022]">dryfishbasket2627@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3022]/5 flex items-center justify-center group-hover:bg-[#C5A059] transition-all duration-500">
                  <Phone size={20} className="text-[#C5A059] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3022]/40">Call Us</p>
                  <p className="text-lg font-bold text-[#1B3022]">+91 63649 36047</p>
                </div>
              </div>

              <a href="https://wa.me/916364936047" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3022]/5 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-500">
                  <MessageCircle size={20} className="text-[#C5A059] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3022]/40">WhatsApp Us</p>
                  <p className="text-lg font-bold text-[#1B3022]">+91 63649 36047</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-brand/10 backdrop-blur-md shadow-sm">
            <h4 className="text-xl font-playfair font-bold mb-8 text-[#1B3022]">Follow Our Journey</h4>
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://www.instagram.com/dryfishbasket_store?igsh=MWpucWdvdWFmbzJnZA%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-3 p-4 bg-[#1B3022]/5 text-[#1B3022] hover:text-white rounded-2xl hover:bg-[#C5A059] transition-all group"
              >
                <Camera size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/share/1Ddd2P38UR/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-3 p-4 bg-[#1B3022]/5 text-[#1B3022] hover:text-white rounded-2xl hover:bg-brand-dark transition-all group"
              >
                <Share2 size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Facebook</span>
              </a>
              <a href="#" className="flex items-center justify-center gap-3 p-4 bg-[#1B3022]/5 text-[#1B3022] hover:text-white rounded-2xl hover:bg-blue-400 transition-all group">
                <Send size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Twitter</span>
              </a>
              <div className="p-4 bg-[#1B3022]/5 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] text-[#1B3022]/30">
                More Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
