import React from 'react';
import Image from 'next/image';

interface FooterProps {
  dict: {
    hero: {
      trusted_by: string;
    };
  };
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="relative z-10 w-full border-t border-emerald-500/15 bg-transparent pt-12 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xs">
            {dict.hero?.trusted_by}
          </p>

          {/* Brand trust tags */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70 hover:opacity-100 transition-all duration-300 text-xs sm:text-sm tracking-wider font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <Image src="/logos/onwe-mark.png" alt="Onwe Mark" width={22} height={22} className="object-contain" />
              <span>ONWE PLATFORM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00ff79]">●</span> ENTERPRISE READY
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00ff79]">●</span> NEXT-GEN ARCHITECTURE
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00ff79]">●</span> REAL-TIME SYSTEMS
            </div>
          </div>
        </div>
        
        {/* Additional footer content can go here later (socials, links, etc.) */}
      </div>
    </footer>
  );
}
