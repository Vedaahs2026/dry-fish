import React from "react";

export const metadata = {
  title: "Shipping Policy - Dry Fish Basket",
  description: "Read the shipping locations, timelines, and charges policy of Dry Fish Basket.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF6ED] text-[#3b2314] font-sans selection:bg-[#8c6239]/20 pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-black text-center text-[#8c6239] mb-10 tracking-wide">
          Shipping policy
        </h1>

        <div className="space-y-8 text-xs md:text-sm text-black/85 leading-relaxed font-medium">
          
          {/* Section 1 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              1. Shipping Locations
            </h2>
            <p>
              We currently ship orders <strong>all over India</strong>, including major cities, towns, and remote locations covered by our courier partners.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              2. Order Processing Time
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Orders are processed within <strong>24-48 hours</strong> (excluding Sundays and public holidays).
              </li>
              <li>
                You will receive an email/SMS notification once your order is confirmed and shipped.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              3. Delivery Time
            </h2>
            <p>Estimated delivery timelines:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Metro Cities:</strong> 2-4 working days</li>
              <li><strong>Tier 1 &amp; Tier 2 Cities:</strong> 3-6 working days</li>
              <li><strong>Remote Areas / Village Locations:</strong> 5-9 working days</li>
            </ul>
            <blockquote className="border-l-4 border-[#8c6239] bg-white p-4 italic rounded-r-xl border-[#8c6239]/10 text-xs">
              Delivery timelines may vary due to weather, strikes, or courier delays.
            </blockquote>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              4. Shipping Charges
            </h2>
            <p>Choose one option based on your business:</p>
            
            <div className="space-y-2 pl-2">
              <h3 className="font-bold text-[#8c6239]">Option A – Free Shipping (Recommended for marketing)</h3>
              <p>We offer <strong>Free Shipping across India</strong> on all orders.</p>
            </div>

            <div className="space-y-2 pl-2">
              <h3 className="font-bold text-[#8c6239]">Option B – Standard Charges</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Standard shipping fee: <strong>₹49 – ₹99</strong> (calculated at checkout)</li>
                <li>COD charges may apply (₹30–₹50 based on courier partner)</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              5. Cash on Delivery (COD)
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>COD available for most PIN codes in India.</li>
              <li>For high-value orders, prepaid payment may be required.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              6. Order Tracking
            </h2>
            <p>
              Once shipped, you will receive a <strong>tracking link</strong> via SMS/Email where you can track your order in real-time.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              7. Packaging &amp; Handling
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All products are packed securely to prevent damage.</li>
              <li>Temperature-sensitive products (like frozen or dry fish) are packed in <strong>insulated packaging</strong> to maintain freshness.</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              8. Delivery Attempts
            </h2>
            <p>
              Courier partners attempt <strong>2-3 deliveries</strong>. If the customer is unreachable or address is incorrect, the order may be returned to origin.
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-2 border-b border-[#8c6239]/10 pb-6">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              9. Delayed or Missing Deliveries
            </h2>
            <p>If your order is delayed:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Contact our support team at <strong>dryfishbasket2627@gmail.com / 9676344465</strong>. We will coordinate with the courier partner and update you.
              </li>
            </ul>
          </div>

          {/* Section 10 */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base font-serif font-black text-[#8c6239]">
              10. Undeliverable Locations
            </h2>
            <p>
              Some PIN codes may not be serviceable. If your location is undeliverable, we will inform you and issue a refund or alternate delivery method.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
