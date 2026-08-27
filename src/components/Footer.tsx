"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer for Admin Portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact-us" className="w-full bg-[#eab308] pt-12 pb-6 px-6 md:px-12 border-t border-[#064e3b]/10 text-black font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Column 1: MAIN MENU */}
        <div>
          <div className="bg-black text-[#eab308] px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block mb-4">
            MAIN MENU
          </div>
          <ul className="space-y-2 text-xs font-semibold text-black/80">
            <li><Link href="/" className="hover:text-black hover:underline transition">Home</Link></li>
            <li><Link href="/#featured-collections" className="hover:text-black hover:underline transition">Products</Link></li>
            <li><Link href="/" className="hover:text-black hover:underline transition">Combo Packs</Link></li>
            <li><Link href="/" className="hover:text-black hover:underline transition">Build your combo</Link></li>
            <li><Link href="/profile/orders" className="hover:text-black hover:underline transition">Track Order</Link></li>
            <li><Link href="/my-story#contact" className="hover:text-black hover:underline transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 2: COMPANY */}
        <div>
          <div className="bg-black text-[#eab308] px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block mb-4">
            COMPANY
          </div>
          <ul className="space-y-2 text-xs font-semibold text-black/80">
            <li><Link href="/profile/orders" className="hover:text-black hover:underline transition">Orders</Link></li>
            <li><Link href="/account/profile" className="hover:text-black hover:underline transition">Profile</Link></li>
          </ul>
        </div>

        {/* Column 3: BESTSELLERS */}
        <div>
          <div className="bg-black text-[#eab308] px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block mb-4">
            BESTSELLERS
          </div>
          <ul className="space-y-2 text-xs font-semibold text-black/80">
            <li><Link href="/#featured-collections" className="hover:text-black hover:underline transition">Products</Link></li>
            <li><Link href="/" className="hover:text-black hover:underline transition">Other Products</Link></li>
            <li><Link href="/" className="hover:text-black hover:underline transition">Blogs</Link></li>
            <li><Link href="/" className="hover:text-black hover:underline transition">Recipes</Link></li>
            <li><Link href="/" className="hover:text-black hover:underline transition">Offers</Link></li>
          </ul>
        </div>

        {/* Column 4: POLICIES */}
        <div>
          <div className="bg-black text-[#eab308] px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block mb-4">
            POLICIES
          </div>
          <ul className="space-y-2 text-xs font-semibold text-black/80">
            <li><Link href="/profile" className="hover:text-black hover:underline transition">My Account</Link></li>
            <li><Link href="/terms-conditions" className="hover:text-black hover:underline transition">Terms and Conditions</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-black hover:underline transition">Privacy Policy</Link></li>
            <li><Link href="/cancellation-returns" className="hover:text-black hover:underline transition">Return and Refund Policy</Link></li>
            <li><Link href="/shipping-payment" className="hover:text-black hover:underline transition">Shipping Policy</Link></li>
            <li><Link href="/terms-conditions" className="hover:text-black hover:underline transition">Terms of Service</Link></li>
            <li><Link href="/cancellation-returns" className="hover:text-black hover:underline transition">Refund policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 hidden sm:block"></div>
        <p className="text-[10px] text-black font-bold tracking-wider uppercase text-center flex-1">
          &copy; {new Date().getFullYear()} Venkys Dried Fish Basket.
        </p>
        <button 
          onClick={handleBackToTop} 
          className="flex items-center gap-1 text-[10px] text-black font-bold uppercase tracking-wider hover:underline cursor-pointer flex-1 justify-end"
        >
          <span className="text-xs">↑</span> Back to top
        </button>
      </div>
    </footer>
  );
}
