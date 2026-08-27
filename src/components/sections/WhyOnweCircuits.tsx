'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ShieldCheck, Gem, TrendingUp } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WhyOnweCircuitsProps {
  dict: {
    differentiators: {
      title: string;
      items: Array<{ title: string; desc: string }>;
    };
  };
}

const icons = [Zap, ShieldCheck, Gem, TrendingUp];

// SVG Path definitions for the 4 corners
// Center is at (500, 300)
const paths = [
  "M 500 300 C 300 300, 160 200, 160 80", // Top-Left
  "M 500 300 C 700 300, 840 200, 840 80", // Top-Right
  "M 500 300 C 300 300, 160 400, 160 520", // Bottom-Left
  "M 500 300 C 700 300, 840 400, 840 520", // Bottom-Right
];

const cardPositions = [
  "top-0 left-0",      // Top-Left
  "top-0 right-0",     // Top-Right
  "bottom-0 left-0",   // Bottom-Left
  "bottom-0 right-0",  // Bottom-Right
];

export default function WhyOnweCircuits({ dict }: WhyOnweCircuitsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // DESKTOP & GLOBAL PINNED SCROLL ANIMATION
      // -------------------------------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: '+=1000',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Center logo lights up first
      tl.fromTo(
        '.center-logo-glow',
        { opacity: 0.3, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3 }
      );

      // 2. Animate Top Circuit Paths (Top-Left & Top-Right)
      tl.fromTo(
        '.circuit-path-0, .circuit-path-1',
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1, ease: 'none' },
        'top-paths'
      );

      // 3. When top lines reach cards, light up Top Cards
      tl.fromTo(
        '.circuit-card-0, .circuit-card-1',
        { 
          opacity: 0.25, 
          backgroundColor: 'rgba(3, 28, 23, 0.2)',
          borderColor: 'rgba(16, 185, 129, 0.2)', 
          boxShadow: '0 0 0px rgba(0,0,0,0)' 
        },
        { 
          opacity: 1, 
          backgroundColor: 'rgba(3, 28, 23, 0.45)',
          borderColor: '#00ff79', 
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 35px rgba(0, 255, 121, 0.4)', 
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.3'
      );

      // 4. Animate Bottom Circuit Paths (Bottom-Left & Bottom-Right)
      tl.fromTo(
        '.circuit-path-2, .circuit-path-3',
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1, ease: 'none' },
        'bottom-paths'
      );

      // 5. When bottom lines reach cards, light up Bottom Cards
      tl.fromTo(
        '.circuit-card-2, .circuit-card-3',
        { 
          opacity: 0.25, 
          backgroundColor: 'rgba(3, 28, 23, 0.2)',
          borderColor: 'rgba(16, 185, 129, 0.2)', 
          boxShadow: '0 0 0px rgba(0,0,0,0)' 
        },
        { 
          opacity: 1, 
          backgroundColor: 'rgba(3, 28, 23, 0.45)',
          borderColor: '#00ff79', 
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 35px rgba(0, 255, 121, 0.4)', 
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.3'
      );

      // -------------------------------------------------------------
      // MOBILE SCROLL ANIMATION
      // -------------------------------------------------------------
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.mobile-circuit-container',
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: 0.8,
        },
      });

      // Mobile center line grows downward as user scrolls
      mobileTl.fromTo(
        '.mobile-connecting-line',
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: 'top center', duration: 1.5, ease: 'none' }
      );

      // Each mobile card lights up progressively on scroll
      gsap.utils.toArray<HTMLElement>('.mobile-circuit-card').forEach((card) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0.25, 
            backgroundColor: 'rgba(3, 28, 23, 0.2)',
            borderColor: 'rgba(16, 185, 129, 0.2)', 
            boxShadow: '0 0 0px rgba(0,0,0,0)' 
          },
          {
            opacity: 1,
            backgroundColor: 'rgba(3, 28, 23, 0.45)',
            borderColor: '#00ff79',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 35px rgba(0, 255, 121, 0.4)',
            duration: 0.4,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="why-onwe" 
      ref={containerRef}
      className="relative w-full min-h-screen py-8 lg:py-12 flex flex-col justify-center items-center overflow-hidden bg-transparent border-t border-emerald-500/10"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            {dict.differentiators.title}
          </h2>
          <div className="w-20 h-1 bg-[#00ff79] mx-auto rounded-full shadow-[0_0_12px_#00ff79]" />
        </div>

        {/* ========================================== */}
        {/* DESKTOP LAYOUT (Canvas 1000x560)             */}
        {/* ========================================== */}
        <div className="hidden lg:flex w-full justify-center items-center">
          <div className="relative w-[1000px] h-[560px] scale-[0.68] lg:scale-[0.75] xl:scale-[0.82] 2xl:scale-[0.9] origin-center">
            
            {/* SVG Lines */}
            <svg ref={svgRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {paths.map((path, idx) => (
                <g key={idx}>
                  {/* Subtle background circuit trace */}
                  <path 
                    d={path} 
                    fill="none" 
                    stroke="rgba(0, 255, 121, 0.12)" 
                    strokeWidth="2.5" 
                  />
                  {/* Illuminated animated path driven by scroll */}
                  <path 
                    d={path} 
                    fill="none" 
                    stroke="#00ff79" 
                    strokeWidth="3" 
                    filter="url(#glow)"
                    className={`circuit-path-${idx}`}
                    style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                  />
                </g>
              ))}
            </svg>

            {/* Center Logo */}
            <div className="center-logo-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 rounded-full bg-[#031c17]/40 backdrop-blur-2xl border-2 border-[#00ff79] flex items-center justify-center shadow-[0_0_60px_rgba(0,255,121,0.4)]">
              <Image 
                src="/logos/onwe-mark.png" 
                alt="Onwe" 
                width={72} 
                height={72} 
                className="object-contain relative z-10 filter drop-shadow-[0_0_12px_rgba(0,255,121,0.6)]"
              />
              <div className="absolute inset-0 rounded-full border border-[#00ff79] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
            </div>

            {/* 4 Cards */}
            {dict.differentiators.items.map((item, idx) => {
              const Icon = icons[idx];
              return (
                <div 
                  key={idx}
                  className={`circuit-card-wrapper absolute w-[340px] z-10 ${cardPositions[idx]}`}
                >
                  <div 
                    className={`circuit-card-${idx} w-full p-8 rounded-3xl bg-[#031c17]/40 backdrop-blur-2xl border-2 cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 hover:bg-[#031c17]/60 hover:shadow-[0_0_55px_rgba(0,255,121,0.6)]`}
                    style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* MOBILE & TABLET LAYOUT                     */}
        {/* ========================================== */}
        <div className="flex lg:hidden flex-col items-center w-full max-w-2xl mobile-circuit-container relative">
          
          {/* Mobile Center Logo */}
          <div className="w-24 h-24 rounded-full bg-[#031c17]/40 backdrop-blur-2xl border-2 border-[#00ff79] flex items-center justify-center shadow-[0_0_40px_rgba(0,255,121,0.4)] mb-10 relative z-20">
            <Image 
              src="/logos/onwe-mark.png" 
              alt="Onwe" 
              width={48} 
              height={48} 
              className="object-contain filter drop-shadow-[0_0_10px_rgba(0,255,121,0.6)]"
            />
          </div>

          {/* Vertical connecting line behind items */}
          <div className="mobile-connecting-line absolute top-[48px] bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#00ff79] via-[#00ff79] to-transparent shadow-[0_0_15px_rgba(0,255,121,0.8)] z-0 origin-top" />

          <div className="flex flex-col gap-6 w-full relative z-10">
            {dict.differentiators.items.map((item, idx) => {
              const Icon = icons[idx];
              return (
                <div 
                  key={idx}
                  className="mobile-circuit-card w-full p-6 sm:p-8 rounded-3xl bg-[#031c17]/40 backdrop-blur-2xl border-2 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-[#031c17]/60 hover:shadow-[0_0_55px_rgba(0,255,121,0.6)] relative overflow-hidden group cursor-pointer"
                  style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
