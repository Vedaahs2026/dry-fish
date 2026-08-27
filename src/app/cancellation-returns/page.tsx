import React from "react";
import { Check, X, Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Refund Policy - Dry Fish Basket",
  description: "Read the refund and returns policy of Dry Fish Basket premium products.",
};

export default function CancellationReturns() {
  return (
    <main className="min-h-screen bg-[#FAF6ED] text-[#3b2314] font-sans selection:bg-[#8c6239]/20 pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-black text-center text-[#8c6239] mb-10 tracking-wide">
          Refund policy
        </h1>

        <div className="space-y-8 text-xs md:text-sm text-black/85 leading-relaxed font-medium">
          
          {/* Section 1 */}
          <div className="space-y-4 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              1. Returns Policy
            </h2>
            <p>
              Since dry fish is a <strong>perishable and consumable product</strong>, we only accept returns under the following conditions:
            </p>

            <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#8c6239]/10">
              <h3 className="font-bold text-green-700 flex items-center gap-2 text-xs md:text-sm">
                <Check size={16} className="bg-green-100 text-green-700 rounded-full p-0.5" />
                We accept returns if:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>The wrong product was delivered</li>
                <li>The product was <strong>damaged</strong> during delivery</li>
                <li>The product is <strong>spoiled</strong> upon arrival</li>
                <li>There is a <strong>quantity mismatch</strong></li>
              </ul>
            </div>

            <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#8c6239]/10">
              <h3 className="font-bold text-red-700 flex items-center gap-2 text-xs md:text-sm">
                <X size={16} className="bg-red-100 text-red-700 rounded-full p-0.5" />
                We do NOT accept returns for:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Change of mind after receiving the product</li>
                <li>Taste, smell, or texture preference</li>
                <li>Delay caused by courier partners</li>
                <li>Products damaged due to improper storage after delivery</li>
                <li>Opened or partially used products</li>
              </ul>
            </div>

            <p className="text-xs text-red-700 font-bold bg-red-50 p-4 rounded-xl border border-red-100">
              Important: All issues must be reported within <strong>24 hours of delivery</strong>, along with photo or video proof, to qualify for return/replacement.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              2. Refund Policy
            </h2>
            <p>Refunds will be issued in the following situations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Product received damaged or spoiled</li>
              <li>Wrong item delivered</li>
              <li>Order cancelled before shipping</li>
              <li>Order undeliverable due to courier limitations</li>
            </ul>

            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-[#8c6239]">Refund Mode:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Prepaid Orders:</strong> Refunded to original payment method within <strong>5-7 working days</strong></li>
                <li><strong>COD Orders:</strong> Refunded via <strong>UPI/Bank Transfer</strong></li>
              </ul>
            </div>
            <p className="italic text-black/60">If the product is not eligible for return, refunds cannot be processed.</p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              3. Replacement Policy
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>If replacement is approved, the order will be delivered within 5-7 days.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              4. Order Cancellation Policy
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Orders can be cancelled within <strong>1 hour of placing the order</strong>.</li>
              <li>Once the order is processed or shipped, cancellations are <strong>not permitted</strong>.</li>
              <li>Frequent COD cancellations may lead to blocked or restricted COD access.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              5. Return Request Procedure
            </h2>
            <p>To request a return, refund, or replacement:</p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Contact us within <strong>24 hours</strong> of delivery</li>
              <li>Provide your <strong>Order ID</strong></li>
              <li>Share clear <strong>photos or videos</strong> showing the issue</li>
              <li>Our team will verify and update you on the resolution</li>
              <li>Refund or replacement will be processed accordingly</li>
            </ol>
          </div>

          {/* Section 6 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              6. Non-Refundable Shipping Fees
            </h2>
            <p>Shipping charges are <strong>non-refundable</strong>, except when:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We send the wrong product</li>
              <li>Product is damaged/spoiled in transit</li>
              <li>Order cannot be delivered</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              7. Contact Us
            </h2>
            <p>For any return or refund related concerns, reach out to us:</p>
            <ul className="space-y-2 pl-1 font-semibold text-black/90">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#8c6239]" />
                <span>Email: dryfishbasket2627@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#8c6239]" />
                <span>Phone / WhatsApp: 9676344465</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-[#8c6239]" />
                <span>Address: Bhimavaram, Andhra Pradesh - 534206</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </main>
  );
}
