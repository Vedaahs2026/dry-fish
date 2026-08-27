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
    <div className="w-full flex flex-col font-sans select-none">
      <footer id="contact-us" className="w-full bg-[#8c6239] pt-14 pb-12 px-6 md:px-12 text-[#FFFDF6]/90">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Info and Address */}
          <div className="md:col-span-2 flex flex-col pr-0 md:pr-10">
            <h3 className="text-xl font-serif font-black text-[#fcd34d] mb-4 tracking-wide">
              Godavari Dry fish
            </h3>
            <p className="text-xs text-[#FFFDF6]/80 leading-relaxed mb-3">
              Traditional taste from the Godavari coastal belt. FSSAI licensed & hygienic processing.
            </p>
            <p className="text-xs text-[#FFFDF6]/80 italic leading-relaxed mb-5">
              Now delivering to Hyderabad, Bangalore, Chennai, Mumbai, Pune, Delhi &amp; across India.
            </p>
            <div className="text-xs text-[#FFFDF6]/85 space-y-1">
              <p className="font-bold text-[#fcd34d] tracking-wide mb-1">Address:</p>
              <p>Bhimavaram</p>
              <p>ANDHRAPRADESH - 534204</p>
              <p className="pt-3">call: +91-9676344465</p>
              <p>godavaridryfish@gmail.com</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-sm font-serif font-black text-[#fcd34d] mb-4 tracking-wide uppercase">
              QUICK LINKS
            </h3>
            <ul className="space-y-2 text-xs font-medium text-[#FFFDF6]/80">
              <li>
                <Link href="/search" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Buy Dry Fish Online
                </Link>
              </li>
              <li>
                <Link href="/profile/orders" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping-payment" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/cancellation-returns" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Refund & Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Delivery Locations */}
          <div className="flex flex-col">
            <h3 className="text-sm font-serif font-black text-[#fcd34d] mb-4 tracking-wide uppercase">
              OUR DRY FISH DELIVERY LOCATIONS
            </h3>
            <ul className="space-y-2 text-xs font-medium text-[#FFFDF6]/80">
              <li>
                <Link href="/search?q=Mumbai" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Dry Fish in Mumbai
                </Link>
              </li>
              <li>
                <Link href="/search?q=Hyderabad" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Dry Fish in Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/search?q=Delhi" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Dry Fish in Delhi
                </Link>
              </li>
              <li>
                <Link href="/search?q=Chennai" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Dry Fish in Chennai
                </Link>
              </li>
              <li>
                <Link href="/search?q=Bangalore" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Dry Fish in Bangalore
                </Link>
              </li>
              <li>
                <Link href="/search?q=Kolkata" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Dry Fish in Kolkata
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Dry Fish Price
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#fcd34d] hover:underline transition-colors">
                  Dry Fish Wholesale
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </footer>

      {/* Dark Footer Bottom Bar */}
      <div className="w-full bg-[#252525] py-4 px-6 md:px-12 text-[#FFFDF6]/50 text-[11px] font-medium border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p>&copy; 2026 Godavari dryfish</p>
          <div className="flex gap-4">
            <Link href="/terms-conditions" className="hover:underline hover:text-white transition-colors">Terms and Conditions</Link>
            <Link href="/privacy-policy" className="hover:underline hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
