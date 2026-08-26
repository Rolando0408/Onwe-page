'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Menu, X } from 'lucide-react';
import Magnet from '@/components/ui/Magnet';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface NavbarProps {
  dict: {
    nav: {
      home: string;
      why?: string;
      services: string;
      team?: string;
      contact: string;
      cta: string;
    };
  };
  lang: string;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useGSAP(
    () => {
      if (!navInnerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=120',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Smooth continuous morph from 100% full-width header to centered floating capsule
      tl.to(navInnerRef.current, {
        maxWidth: '1024px',
        marginTop: '16px',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'rgba(3, 28, 23, 0.45)',
        borderWidth: '0px',
        borderRadius: '9999px',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 255, 121, 0.14)',
        ease: 'none',
      });
    },
    { scope: containerRef }
  );

  const toggleLanguage = () => {
    const targetLang = lang === 'es' ? 'en' : 'es';
    const newPath = pathname.replace(`/${lang}`, `/${targetLang}`);
    router.push(newPath || `/${targetLang}`);
  };

  const navLinks = [
    { label: dict.nav.home, href: `#hero` },
    { label: dict.nav.why || '¿Por qué Onwe?', href: `#why-onwe` },
    { label: dict.nav.services, href: `#services` },
    { label: dict.nav.team || 'Equipo', href: `#team` },
  ];

  return (
    <header
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none transition-all duration-300 px-6 sm:px-12 lg:px-24"
    >
      <div
        ref={navInnerRef}
        className="pointer-events-auto w-full flex items-center justify-between px-6 sm:px-12 lg:px-16 py-4 transition-[border-color,box-shadow] duration-300"
        style={{
          maxWidth: '100%',
          marginTop: '0px',
          borderRadius: '0px',
          borderWidth: '0px',
        }}
      >
        {/* Brand Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff79] rounded-lg">
          <div className="relative flex items-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logos/onwe-logo.png"
              alt="Onwe Mark"
              width={50}
              height={50}
              className="h-8 sm:h-8 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(0,255,121,0.35)]"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-sm font-medium text-slate-200 hover:text-white rounded-full transition-all duration-200 hover:bg-emerald-500/15 hover:shadow-[0_0_12px_rgba(0,255,121,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff79]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA + Language Switcher */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={toggleLanguage}
            aria-label="Change language"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full hover:bg-emerald-500/20 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff79] transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(0,255,121,0.1)]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'EN' : 'ES'}</span>
          </button>

          <Link
            href="#contact"
            className="px-4 py-1.5 text-xs font-bold text-[#010907] bg-[#00ff79] hover:bg-[#00e06a] hover:shadow-[0_0_15px_rgba(0,255,121,0.4)] rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {dict.nav.contact}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            aria-label="Change language"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold uppercase text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 rounded-full"
          >
            <span>{lang === 'es' ? 'EN' : 'ES'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 text-slate-200 hover:text-white bg-emerald-950/60 border border-emerald-500/30 rounded-full"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-4 top-20 bg-[#031c17]/95 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 z-50 pointer-events-auto">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-medium text-slate-200 hover:text-white hover:bg-emerald-500/15 rounded-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 text-sm font-bold text-zinc-950 bg-[#00ff79] rounded-full shadow-[0_0_20px_rgba(0,255,121,0.5)]"
          >
            {dict.nav.cta}
          </Link>
        </div>
      )}
    </header>
  );
}
