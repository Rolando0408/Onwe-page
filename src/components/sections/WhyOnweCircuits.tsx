'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the drawing of the SVG lines
      gsap.fromTo('.circuit-base-path', 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { 
          strokeDashoffset: 0, 
          duration: 1.5, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate cards fading in
      gsap.fromTo('.circuit-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Mobile cards stagger
      gsap.fromTo('.mobile-circuit-card',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.mobile-circuit-container',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="why-onwe" 
      ref={containerRef}
      className="relative w-full py-24 lg:py-32 overflow-hidden bg-transparent border-t border-emerald-500/10"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            {dict.differentiators.title}
          </h2>
          <div className="w-20 h-1 bg-[#00ff79] mx-auto rounded-full" />
        </div>

        {/* ========================================== */}
        {/* DESKTOP LAYOUT (Canvas 1000x600)             */}
        {/* ========================================== */}
        <div className="hidden lg:flex w-full justify-center">
          <div className="relative w-[1000px] h-[600px] scale-[0.8] xl:scale-100 transform-origin-top">
            
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
                  {/* Base dim line */}
                  <path 
                    d={path} 
                    fill="none" 
                    stroke="#00ff79" 
                    strokeWidth="2" 
                    className="circuit-base-path opacity-20"
                  />
                  {/* Glowing active line (visible on hover) */}
                  <path 
                    d={path} 
                    fill="none" 
                    stroke="#00ff79" 
                    strokeWidth="3" 
                    filter="url(#glow)"
                    className="transition-all duration-500"
                    style={{
                      strokeDasharray: 1000,
                      strokeDashoffset: hoveredIndex === idx ? 0 : 1000,
                      opacity: hoveredIndex === idx ? 1 : 0
                    }}
                  />
                </g>
              ))}
            </svg>

            {/* Center Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 rounded-full bg-white/5 backdrop-blur-xl border border-[#00ff79]/40 flex items-center justify-center shadow-[0_0_60px_rgba(0,255,121,0.2)]">
              <Image 
                src="/logos/onwe-mark.png" 
                alt="Onwe" 
                width={72} 
                height={72} 
                className="object-contain relative z-10"
              />
              <div className="absolute inset-0 rounded-full border border-[#00ff79]/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
            </div>

            {/* 4 Cards */}
            {dict.differentiators.items.map((item, idx) => {
              const Icon = icons[idx];
              const isHovered = hoveredIndex === idx;
              return (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`circuit-card absolute w-[340px] p-8 rounded-2xl bg-white/5 backdrop-blur-xl border transition-all duration-500 z-10 cursor-default ${cardPositions[idx]} ${
                    isHovered 
                      ? 'border-[#00ff79]/60 shadow-[0_0_40px_rgba(0,255,121,0.2)] -translate-y-2' 
                      : 'border-emerald-500/20 shadow-lg'
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isHovered ? 'bg-[#00ff79]/20' : 'bg-emerald-950/80 border border-emerald-500/20'}`}>
                        <Icon className={`w-6 h-6 transition-colors duration-300 ${isHovered ? 'text-[#00ff79]' : 'text-emerald-400'}`} />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {item.desc}
                    </p>
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
          <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-xl border border-[#00ff79]/40 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,121,0.2)] mb-10 relative z-20">
            <Image 
              src="/logos/onwe-mark.png" 
              alt="Onwe" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </div>

          {/* Vertical connecting line behind items */}
          <div className="absolute top-[48px] bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#00ff79]/50 via-emerald-500/20 to-transparent z-0" />

          <div className="flex flex-col gap-6 w-full relative z-10">
            {dict.differentiators.items.map((item, idx) => {
              const Icon = icons[idx];
              return (
                <div 
                  key={idx}
                  className="mobile-circuit-card w-full p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00ff79] to-transparent opacity-50" />
                  <div className="flex flex-col gap-3 ml-2">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#00ff79]" />
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
