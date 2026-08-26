import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

interface FooterProps {
  dict?: {
    footer?: {
      address_l1?: string;
      address_l2?: string;
      legal?: {
        imprint?: string;
        privacy?: string;
        terms?: string;
      };
    };
  };
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="relative w-full overflow-hidden bg-[#010907] pt-24 pb-12 mt-24 border-t border-[#00ff79]/10">
      <div className="container mx-auto px-6 lg:px-12 h-full">
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[350px]">
          
          {/* Top Section */}
          <div className="max-w-md">
            {/* Logo */}
            <div className="mb-12">
              <Image 
                src="/logos/onwe-logo.svg" 
                alt="Onwe" 
                width={150} 
                height={50} 
                className="object-contain" 
              />
            </div>

            {/* Address */}
            <address className="not-italic text-slate-300 font-medium mb-12 space-y-1">
              <p>{dict?.footer?.address_l1 || 'Av. Principal de Las Mercedes'}</p>
              <p>{dict?.footer?.address_l2 || 'Caracas, Venezuela'}</p>
            </address>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a href="mailto:hello@onwe.com" className="text-slate-400 hover:text-[#00ff79] transition-colors" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-[#00ff79] transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-[#00ff79] transition-colors" aria-label="X (Twitter)">
                <XIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Bottom Section (Legal) */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-wrap gap-6 sm:gap-10 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              {dict?.footer?.legal?.imprint || 'Aviso Legal'}
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              {dict?.footer?.legal?.privacy || 'Privacidad'}
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              {dict?.footer?.legal?.terms || 'Términos y Condiciones'}
            </Link>
          </div>
        </div>
      </div>

      {/* Massive Graphic Element on the Right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] pointer-events-none opacity-90 hidden md:block">
        <div 
          className="w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-[#ffffff]"
          style={{
            WebkitMaskImage: "url('/logos/onwe-wt.svg')",
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center right',
            maskImage: "url('/logos/onwe-wt.svg')",
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center right',
          }}
        />
      </div>
      
      {/* Glow effect behind the massive graphic */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00ff79]/10 blur-[100px] rounded-full pointer-events-none hidden md:block" />
    </footer>
  );
}
