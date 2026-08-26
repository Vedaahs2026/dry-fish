import React from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  User, 
  Settings, 
  Lock, 
  Cookie, 
  Share2, 
  FileText, 
  ExternalLink, 
  Users, 
  Clock,
  Mail
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Dry Fish Basket",
  description: "Privacy policy for Dry Fish Basket store and services.",
};

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: User,
      content: (
        <div>
          <p className="mb-4 text-sm md:text-base leading-relaxed text-[#1B3022]/80">
            We may collect the following information when you interact with our website or make a purchase:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base">
            {[
              "Full Name",
              "Email Address",
              "Mobile Number",
              "Shipping & Billing Address",
              "Payment Information (processed securely through third-party payment gateways)",
              "Order History",
              "Device Information",
              "IP Address",
              "Browser Type",
              "Cookies and Website Usage Data"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-[#1B3022]/5 p-3 rounded-xl border border-brand/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                <span className="text-[#1B3022]/90 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2. How We Use Your Information",
      icon: Settings,
      content: (
        <div>
          <p className="mb-4 text-sm md:text-base leading-relaxed text-[#1B3022]/80">
            We use your information to provide, maintain, and improve our services, including to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base">
            {[
              "Process and deliver your orders",
              "Verify your identity",
              "Send order confirmations and shipping updates",
              "Respond to customer support requests",
              "Improve our products and services",
              "Personalize your shopping experience",
              "Send promotional offers (only with your consent)",
              "Detect fraud and maintain website security",
              "Comply with legal obligations"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-[#1B3022]/5 p-3 rounded-xl border border-brand/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                <span className="text-[#1B3022]/90 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "3. Payment Security",
      icon: Lock,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#1B3022]/80">
          We do not store your debit/credit card details. All payments are securely processed through trusted payment gateway providers using industry-standard encryption.
        </p>
      ),
    },
    {
      title: "4. Cookies",
      icon: Cookie,
      content: (
        <div>
          <p className="mb-4 text-sm md:text-base leading-relaxed text-[#1B3022]/80">
            Our website uses cookies to enhance your experience, analyze website traffic, and show relevant updates. Specifically, we use cookies to:
          </p>
          <ul className="space-y-2 mb-4 text-sm md:text-base pl-1">
            {[
              "Keep you logged in",
              "Remember your shopping cart",
              "Improve website performance",
              "Analyze visitor behavior",
              "Personalize content"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="text-[#1B3022]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm md:text-base leading-relaxed text-[#1B3022]/70 italic bg-[#C5A059]/10 p-4 rounded-xl border-l-4 border-[#C5A059]">
            You may disable cookies through your browser settings, although some website features may not function properly.
          </p>
        </div>
      ),
    },
    {
      title: "5. Sharing of Information",
      icon: Share2,
      content: (
        <div>
          <p className="mb-4 text-sm md:text-base leading-relaxed text-[#1B3022]/80">
            We may share your information with trusted partners to perform service actions, such as:
          </p>
          <ul className="space-y-2 mb-4 text-sm md:text-base pl-1">
            {[
              "Delivery Partners",
              "Payment Gateway Providers",
              "Technology Service Providers",
              "Legal Authorities when required by law"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="text-[#1B3022]/90">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm md:text-base leading-relaxed text-[#1B3022]/80 font-bold text-[#1B3022]">
            We never sell your personal information to third parties.
          </p>
        </div>
      ),
    },
    {
      title: "6. Data Protection",
      icon: ShieldCheck,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#1B3022]/80">
          We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, misuse, alteration, or disclosure.
        </p>
      ),
    },
    {
      title: "7. Your Rights",
      icon: FileText,
      content: (
        <div>
          <p className="mb-4 text-sm md:text-base leading-relaxed text-[#1B3022]/80">
            Depending on your location, you may have certain rights regarding your personal information, including the right to request to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base mb-6">
            {[
              "Access your personal data",
              "Update inaccurate information",
              "Delete your account",
              "Withdraw marketing consent",
              "Request a copy of your stored data"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-[#1B3022]/5 p-3 rounded-xl border border-brand/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                <span className="text-[#1B3022]/90 leading-snug">{item}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-[#1B3022]/10 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-sm text-[#1B3022]/60 font-semibold">To exercise these rights, contact us at:</span>
            <a href="mailto:dryfishbasket2627@gmail.com" className="inline-flex items-center gap-2 text-[#C5A059] font-bold hover:underline">
              <Mail size={16} />
              dryfishbasket2627@gmail.com
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "8. Third-Party Links",
      icon: ExternalLink,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#1B3022]/80">
          Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.
        </p>
      ),
    },
    {
      title: "9. Children's Privacy",
      icon: Users,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#1B3022]/80">
          Our services are not intended for children under the age of 18. We do not knowingly collect personal information from minors.
        </p>
      ),
    },
    {
      title: "10. Policy Updates",
      icon: Clock,
      content: (
        <p className="text-sm md:text-base leading-relaxed text-[#1B3022]/80">
          We may update this Privacy Policy periodically. Changes will be posted on this page with the revised effective date.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FCFBF8] via-[#FDFBF7] to-[#F7F3EB] text-[#1B3022] py-16 px-6 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -right-40 bottom-40 w-96 h-96 bg-[#1B3022]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Legals & transparency</span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#1B3022] leading-tight mb-4 flex items-center justify-center gap-3">
            Privacy Policy <Sparkles size={24} className="text-[#C5A059] shrink-0" />
          </h1>
          <div className="w-20 h-1 bg-[#C5A059] mx-auto rounded-full mb-8"></div>
          
          <p className="text-lg text-[#1B3022]/70 font-medium leading-relaxed max-w-2xl mx-auto">
            Welcome to <strong className="text-[#1B3022]">Dry Fish Basket</strong>. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#FFFDF6] p-6 md:p-10 rounded-[2rem] border border-[#1B3022]/5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B3022]/5 flex items-center justify-center text-[#C5A059]">
                    <Icon size={22} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-playfair font-bold text-[#1B3022]">
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

        {/* Footer contact note */}
        <div className="mt-16 text-center bg-[#FFFDF6] p-8 rounded-[2rem] border border-[#1B3022]/5 shadow-sm max-w-xl mx-auto">
          <p className="text-sm text-[#1B3022]/60 font-semibold mb-2">Have questions about our privacy practices?</p>
          <p className="text-lg font-bold text-[#1B3022]">
            Contact us at{" "}
            <a href="mailto:dryfishbasket2627@gmail.com" className="text-[#C5A059] hover:underline">
              dryfishbasket2627@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
