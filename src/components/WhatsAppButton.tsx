"use client";

import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide on Admin portal pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/919848357279"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA56] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute right-16 bg-black/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap shadow-md">
        Chat with us
      </span>

      {/* WhatsApp SVG Icon */}
      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.257 1.875 13.779 1.84 11.998 1.84c-5.442 0-9.87 4.421-9.875 9.867a9.78 9.78 0 0 0 1.5 4.896l-.988 3.606 3.693-.97c1.554.912 3.11 1.353 4.719 1.353zm8.932-6.52c-.3-.15-1.774-.875-2.046-.975-.272-.1-.47-.15-.668.15-.198.3-.767.975-.94 1.175-.173.2-.347.225-.648.075-.3-.15-1.266-.467-2.41-1.485-.89-.795-1.49-1.777-1.665-2.078-.173-.3-.018-.462.13-.61.135-.135.3-.349.45-.524.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.668-1.612-.915-2.2-.24-.579-.486-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.774-.726 2.022-1.43.247-.704.247-1.306.173-1.43-.075-.124-.272-.198-.57-.347z"/>
      </svg>
    </a>
  );
}
