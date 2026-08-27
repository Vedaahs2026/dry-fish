import React from "react";
import { 
  Sparkles, 
  UserCheck, 
  Shirt, 
  Tag, 
  ClipboardCheck, 
  CreditCard, 
  Truck, 
  XCircle, 
  RotateCcw, 
  Coins, 
  User, 
  Shield, 
  Award, 
  AlertTriangle, 
  Scale, 
  Lock, 
  Globe, 
  Clock, 
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export const metadata = {
  title: "Terms & Conditions - Dry Fish Basket",
  description: "Terms and conditions for using the Dry Fish Basket website and purchasing premium products.",
};

export default function TermsConditions() {
  const sections = [
    {
      title: "1. Eligibility",
      icon: UserCheck,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          By using this website, you confirm that you are at least 18 years of age or are using the website under the supervision of a parent or legal guardian.
        </p>
      ),
    },
    {
      title: "2. Products",
      icon: Shirt,
      content: (
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            We make every effort to display our products, colors, designs, fabrics, and descriptions as accurately as possible. However, due to differences in screen settings and lighting conditions, actual product colors may vary slightly from the images displayed on the website.
          </p>
          <p>
            As many of our products are made-to-order or stitched specifically for customers, slight variations in measurements, embroidery, prints, or fabric texture may occur and shall not be considered defects.
          </p>
        </div>
      ),
    },
    {
      title: "3. Pricing",
      icon: Tag,
      content: (
        <ul className="space-y-2.5 text-sm md:text-base pl-1">
          {[
            "All prices are displayed in Indian Rupees (INR).",
            "Prices are inclusive of applicable taxes unless otherwise stated.",
            "Shipping charges, if applicable, will be displayed during checkout.",
            "We reserve the right to change product prices at any time without prior notice."
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
              <span className="text-[#8c6239]/90 leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "4. Orders",
      icon: ClipboardCheck,
      content: (
        <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            After placing an order, you will receive an order confirmation via email or SMS.
          </p>
          <p className="font-semibold text-[#8c6239]">We reserve the right to:</p>
          <ul className="space-y-2 pl-1">
            {[
              "Accept or reject any order.",
              "Cancel orders suspected of fraud or unauthorized transactions.",
              "Limit product quantities.",
              "Refuse service where required."
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="text-[#8c6239]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#8c6239]/70 italic bg-[#C5A059]/10 p-3 rounded-xl border-l-4 border-[#C5A059]">
            Order confirmation does not guarantee acceptance. We may cancel an order if a product becomes unavailable, due to pricing errors, technical issues, or any unforeseen circumstances. In such cases, any payment received will be refunded to the original payment method.
          </p>
        </div>
      ),
    },
    {
      title: "5. Payment Policy",
      icon: CreditCard,
      content: (
        <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            We accept <strong className="text-[#8c6239]">prepaid payments only</strong> through secure payment gateways.
          </p>
          <p className="font-semibold text-[#8c6239]">Accepted payment methods may include:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["UPI", "Credit Cards", "Debit Cards", "Net Banking", "Digital Wallets"].map((method, idx) => (
              <div key={idx} className="bg-[#8c6239]/5 px-3 py-2 rounded-lg text-center font-medium border border-brand/5">
                {method}
              </div>
            ))}
          </div>
          <p className="font-bold text-red-700 bg-red-50 py-2.5 px-4 rounded-xl border-l-4 border-red-500">
            Cash on Delivery (COD) is NOT available.
          </p>
          <p className="text-xs text-[#8c6239]/60">
            All online payments are securely processed by trusted third-party payment providers. We do not store your card or banking details.
          </p>
        </div>
      ),
    },
    {
      title: "6. Shipping & Delivery",
      icon: Truck,
      content: (
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            Orders are processed after successful payment confirmation.
          </p>
          <p className="font-semibold text-[#8c6239]">Estimated delivery timelines are provided for convenience and may vary depending on:</p>
          <ul className="space-y-2 pl-1">
            {["Customer location", "Courier partner delays", "Public holidays", "Weather conditions", "Unforeseen operational issues"].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="text-[#8c6239]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Once the order is shipped, tracking details will be shared with the customer. While we strive to deliver within the estimated timeframe, delivery dates are not guaranteed.
          </p>
        </div>
      ),
    },
    {
      title: "7. Order Cancellation",
      icon: XCircle,
      content: (
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            Customers may request cancellation only before the packaging or dispatch process has started.
          </p>
          <p className="font-bold text-[#8c6239] bg-[#C5A059]/10 p-4 rounded-xl border-l-4 border-[#C5A059]">
            Once an order has been confirmed and packaging, sorting, or dispatch has commenced, the order CANNOT be cancelled, modified, or refunded.
          </p>
          <p>
            Since each batch of dried fish is packed specifically for the customer's order, cancellations after packaging begins are not possible.
          </p>
        </div>
      ),
    },
    {
      title: "8. Returns & Exchanges",
      icon: RotateCcw,
      content: (
        <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            As our products are perishable food items prepared specifically for each customer's order, <strong className="text-[#8c6239]">we do not accept returns or exchanges</strong> for correctly delivered products.
          </p>
          <p className="font-semibold text-[#8c6239]">Returns or exchanges will only be considered in the following exceptional circumstances:</p>
          <ul className="space-y-2 pl-1">
            {["Wrong product delivered.", "Product received in a damaged condition due to transit.", "Verified preparation defect."].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                <span className="text-[#8c6239]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Customers must notify us within <strong className="text-[#8c6239]">48 hours</strong> of delivery by contacting our customer support and providing clear photographs or videos of the product and packaging. Claims made after 48 hours may not be accepted.
          </p>
          <p className="text-xs text-[#8c6239]/60">
            Products that have been used, washed, ironed, altered, damaged by the customer, or returned without original packaging or tags will not be eligible for replacement. The final decision regarding replacement shall rest solely with Dry Fish Basket after inspection.
          </p>
        </div>
      ),
    },
    {
      title: "9. Refund Policy",
      icon: Coins,
      content: (
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            Since we do not accept returns for correctly delivered products, <strong className="text-[#8c6239]">refunds are generally not provided</strong>.
          </p>
          <p className="font-semibold text-[#8c6239]">Refunds will only be issued in the following cases:</p>
          <ul className="space-y-2 pl-1">
            {["The order cannot be fulfilled by us.", "The ordered product becomes unavailable.", "Duplicate payment has been successfully verified.", "A refund is approved after verification of a wrong, damaged, or defective product."].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="text-[#8c6239]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Approved refunds will be processed to the original payment method within <strong className="text-[#8c6239]">5–10 business days</strong>. Depending on your bank or payment service provider, the credit may take additional time to appear in your account.
          </p>
          <p className="text-xs text-[#8c6239]/60 italic">
            Shipping charges, payment gateway charges, convenience fees, and other applicable service charges are non-refundable unless the refund is due to our error.
          </p>
        </div>
      ),
    },
    {
      title: "10. Customer Responsibilities",
      icon: User,
      content: (
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p className="font-semibold text-[#8c6239]">Customers are responsible for:</p>
          <ul className="space-y-2 pl-1">
            {["Providing accurate personal information.", "Providing a complete and correct shipping address.", "Entering the correct mobile number and email address.", "Selecting the correct size before placing the order."].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                <span className="text-[#8c6239]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p>
            We shall not be responsible for delays or delivery failures caused by incorrect customer information.
          </p>
        </div>
      ),
    },
    {
      title: "11. Account Responsibility",
      icon: Shield,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          If you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials. You are responsible for all activities that occur under your account. Please notify us immediately if you believe your account has been accessed without authorization.
        </p>
      ),
    },
    {
      title: "12. Intellectual Property",
      icon: Award,
      content: (
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            All website content including logos, product photographs, designs, graphics, text, videos, layouts, and source content is the exclusive property of <strong className="text-[#8c6239]">Dry Fish Basket</strong> and is protected under applicable copyright, trademark, and intellectual property laws.
          </p>
          <p className="text-xs text-[#8c6239]/60 font-semibold">
            No content may be copied, reproduced, distributed, or used without prior written permission.
          </p>
        </div>
      ),
    },
    {
      title: "13. Prohibited Activities",
      icon: AlertTriangle,
      content: (
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p className="font-semibold text-[#8c6239]">Users shall not:</p>
          <ul className="space-y-2 pl-1">
            {["Attempt unauthorized access to our systems.", "Copy or reproduce website content.", "Interfere with website functionality.", "Upload malicious software.", "Engage in fraudulent transactions.", "Misuse promotional offers or discounts."].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="text-[#8c6239]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-red-600 font-semibold">
            Violation of these terms may result in account suspension and legal action where applicable.
          </p>
        </div>
      ),
    },
    {
      title: "14. Limitation of Liability",
      icon: Scale,
      content: (
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          <p>
            To the maximum extent permitted by law, <strong className="text-[#8c6239]">Dry Fish Basket</strong> shall not be liable for any indirect, incidental, special, or consequential damages arising from:
          </p>
          <ul className="space-y-1.5 pl-1">
            {["Use of the website.", "Delay in delivery.", "Temporary website downtime.", "Product color variations due to screen settings.", "Courier delays beyond our control."].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="text-[#8c6239]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold">
            Our maximum liability shall not exceed the amount paid by the customer for the affected order.
          </p>
        </div>
      ),
    },
    {
      title: "15. Privacy",
      icon: Lock,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          Your use of this website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.
        </p>
      ),
    },
    {
      title: "16. Governing Law",
      icon: Globe,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong className="text-[#8c6239]">Karnataka, India</strong>.
        </p>
      ),
    },
    {
      title: "17. Changes to Terms & Conditions",
      icon: Clock,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#8c6239]/80">
          We reserve the right to modify or update these Terms & Conditions at any time without prior notice. The latest version will always be available on our website. Continued use of the website after any updates constitutes acceptance of the revised Terms & Conditions.
        </p>
      ),
    },
    {
      title: "18. Contact Us",
      icon: Mail,
      content: (
        <div className="bg-[#8c6239]/5 p-5 md:p-8 rounded-2xl border border-brand/5 space-y-4">
          <p className="font-semibold text-lg text-[#8c6239]">Dry Fish Basket</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
            <a href="mailto:info@vkdryfishbasket.com" className="flex items-center gap-3 text-[#8c6239]/80 hover:text-[#C5A059] transition">
              <Mail size={18} className="text-[#C5A059]" />
              <span>info@vkdryfishbasket.com</span>
            </a>
            <div className="flex items-center gap-3 text-[#8c6239]/80">
              <Phone size={18} className="text-[#C5A059]" />
              <span>+91 96115 26047</span>
            </div>
            <div className="flex items-start gap-3 text-[#8c6239]/80 md:col-span-2">
              <MapPin size={18} className="text-[#C5A059] shrink-0 mt-1" />
              <span>Siddhapura, Karnataka, India</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#8c6239]/10 text-xs text-[#8c6239]/50 font-bold uppercase tracking-wider">
            Business Hours: Monday to Saturday, 10:00 AM – 7:00 PM (IST)
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FCFBF8] via-[#FDFBF7] to-[#F7F3EB] text-[#8c6239] py-16 px-6 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -right-40 bottom-40 w-96 h-96 bg-[#8c6239]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Legals & agreements</span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#8c6239] leading-tight mb-4 flex items-center justify-center gap-3">
            Terms & Conditions <Sparkles size={24} className="text-[#C5A059] shrink-0" />
          </h1>
          <div className="w-20 h-1 bg-[#C5A059] mx-auto rounded-full mb-6"></div>
          
          <p className="text-xs text-[#8c6239]/60 font-black uppercase tracking-widest mb-6">
            Effective Date: 06/08/2026
          </p>

          <p className="text-lg text-[#8c6239]/70 font-medium leading-relaxed max-w-2xl mx-auto">
            Welcome to <strong className="text-[#8c6239]">Dry Fish Basket</strong>. These Terms & Conditions govern your access to and use of our website and the purchase of products offered through our online store. By using our website or placing an order, you agree to be bound by these Terms & Conditions.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-6 animate-fadeIn">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#FFFDF6] p-6 md:p-10 rounded-[2rem] border border-[#8c6239]/5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#8c6239]/5 flex items-center justify-center text-white">
                    <Icon size={22} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-playfair font-bold text-[#8c6239]">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-0 md:pl-16">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
