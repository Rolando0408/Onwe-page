'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Search } from 'lucide-react';
import Magnet from '@/components/ui/Magnet';
import LaptopMockup from '@/components/ui/LaptopMockup';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

interface HeroProps {
  dict: {
    hero: {
      badge: string;
      title_part1: string;
      title_highlight: string;
      title_part2: string;
      subtitle: string;
      cta_primary: string;
      cta_secondary: string;
      trusted_by: string;
      card_status: string;
      card_metric: string;
      card_tag: string;
      card_role: string;
      card_score: string;
    };
  };
}

export default function Hero({ dict }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Stagger entrance of hero elements
      tl.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
      })
        .from(
          '.hero-title-line',
          {
            y: 35,
            opacity: 0,
            duration: 0.85,
            stagger: 0.12,
          },
          '-=0.5'
        )
        .from(
          '.hero-sub',
          {
            y: 20,
            opacity: 0,
            duration: 0.75,
          },
          '-=0.55'
        )
        .from(
          '.hero-interactive',
          {
            y: 20,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
          },
          '-=0.55'
        )
        .from(
          '.hero-social-proof',
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          '-=0.4'
        )
        .from(
          '.hero-main-logo',
          {
            scale: 0.5,
            opacity: 0,
            filter: 'blur(20px)',
            duration: 1.5,
            ease: 'elastic.out(1, 0.7)',
          },
          '-=0.8'
        );

      // Logo stays static after intro animation
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] w-full flex flex-col justify-center pt-24 pb-12 sm:pt-30 sm:pb-16"
    >
      {/* Main Hero Content Area */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
      >
        {/* Left Column: Headline, Copy & Interactive Input */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Main Title (H1) with High-Impact Typography */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 break-words">
            <span className="hero-title-line block">{dict.hero.title_part1}</span>
            <span className="hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-[#00ff79] via-[#3aff9e] to-[#c2ffdb] filter drop-shadow-[0_0_30px_rgba(0,255,121,0.35)]">
              {dict.hero.title_highlight}
            </span>
            <span className="hero-title-line block text-slate-100 text-2xl xs:text-3xl sm:text-5xl xl:text-6xl font-bold mt-1">
              {dict.hero.title_part2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal font-sans">
            {dict.hero.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="hero-interactive flex flex-wrap items-center gap-4">
            <Magnet magnetStrength={3} padding={50}>
              <Link
                href="#contact"
                className="relative group overflow-hidden inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-emerald-600 rounded-full shadow-[0_0_20px_rgba(0,255,121,0.3)] hover:shadow-[0_0_40px_rgba(0,255,121,0.6)] hover:bg-emerald-500 focus-visible:ring-2 focus-visible:ring-[#00ff79] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300 active:scale-95"
              >
                {/* Shine Sweep Effect */}
                <span className="absolute top-0 -left-full w-full h-full skew-x-[-35deg] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none z-0" />
                
                <span className="relative z-10">{dict.hero.cta_primary}</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnet>

            <Link
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-slate-200 bg-emerald-950/50 border border-emerald-500/25 rounded-full hover:bg-emerald-900/40 hover:border-emerald-500/50 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00ff79] focus-visible:ring-offset-2 focus-visible:ring-offset-black backdrop-blur-md transition-all duration-200"
            >
              <span>{dict.hero.cta_secondary}</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Main Brand Logo with Dramatic Intro */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full max-w-md mx-auto lg:max-w-none">
          <div className="hero-main-logo w-full">
            <LaptopMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
