"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Facebook = ({ size = 20, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = ({ size = 20, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

interface NavItem {
  id: number;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
}

export default function Footer() {
  const pathname = usePathname();
  const [shopLinks, setShopLinks] = useState<NavItem[]>([]);

  useEffect(() => {
    async function fetchShopLinks() {
      try {
        const res = await fetch("/api/admin/nav");
        const data = await res.json();
        if (data.success) {
          // Filter only active items and sort them by order
          const activeLinks = (data.data as NavItem[])
            .filter(item => item.isActive)
            .sort((a, b) => a.order - b.order);
          setShopLinks(activeLinks);
        }
      } catch (err) {
        console.error("Failed to fetch footer shop links", err);
      }
    }
    fetchShopLinks();
  }, [pathname]);

  // Hide Footer for Admin Portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer id="contact-us" className="w-full bg-[#eab308] pt-16 pb-8 px-6 md:px-12 border-t border-[#064e3b]/10 text-[#064e3b] font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Column 1: Brand Info */}
        <div className="md:col-span-6 space-y-4">
          <Link href="/" className="flex items-center gap-1.5 group">
            <img 
              src="/images/logo.png" 
              alt="Dry Fish Basket Logo" 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="font-gabriola text-2xl font-bold tracking-wide text-[#064e3b] group-hover:text-black transition-colors">
              Dry Fish Basket
            </span>
          </Link>
          <p className="text-[#064e3b]/75 text-xs leading-relaxed max-w-md">
            At Dry Fish Basket, we bring you the finest traditional sun-dried fish, prepared with utmost hygiene and care. 
            Experience the authentic taste of premium coastal delicacies delivered directly to your doorstep.
          </p>
        </div>

        {/* Column 2: Customer Care & Policies */}
        <div className="md:col-span-3">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#064e3b] mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-xs text-[#064e3b]/85 font-semibold">
            <li><Link href="/my-story#contact" className="hover:text-black transition">Contact Us</Link></li>
            <li><Link href="/shipping-payment" className="hover:text-black transition">Shipping & Payment</Link></li>
            <li><Link href="/terms-conditions" className="hover:text-black transition">Terms & Conditions</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-black transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div className="md:col-span-3">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#064e3b] mb-4">Keep In Touch</h4>
          <div className="flex space-x-4 text-[#064e3b]/65 mb-6">
            <a 
              href="https://www.facebook.com/share/1Ddd2P38UR/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black transition" 
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://www.instagram.com/dryfishbasket_store?igsh=MWpucWdvdWFmbzJnZA%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black transition" 
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
          <p className="text-[10px] text-[#064e3b]/55 font-bold uppercase tracking-[0.2em] mb-2">Email Support</p>
          <a href="mailto:dryfishbasket2627@gmail.com" className="text-xs font-semibold text-[#064e3b] hover:text-black transition">
            dryfishbasket2627@gmail.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#064e3b]/10 flex items-center justify-center">
        <p className="text-[10px] text-[#064e3b]/55 font-semibold tracking-wider uppercase text-center">
          &copy; {new Date().getFullYear()} Dry Fish Basket. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
