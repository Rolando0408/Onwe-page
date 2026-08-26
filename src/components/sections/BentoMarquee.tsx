'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// These are the AI-generated Onwe aesthetic images
const images = [
  '/images/onwe_brand_1_1787769973320.jpg',
  '/images/onwe_brand_2_1787769983535.jpg',
  '/images/onwe_brand_3_1787769993023.jpg',
  '/images/onwe_brand_4_1787770003399.jpg',
];

// Triplicate the array so the marquee can scroll 50% seamlessly
const marqueeItems = [...images, ...images, ...images];

interface BentoMarqueeProps {
  dict?: {
    bentoMarquee?: {
      title?: string;
      subtitle?: string;
    };
  };
}

export default function BentoMarquee({ dict }: BentoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Smooth fade up and in when scrolled into view
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 150 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-24 lg:py-20 overflow-hidden bg-transparent"
      style={{ perspective: '1500px' }}
    >
      {/* Title above the carousel */}
      <div className="container mx-auto px-6 lg:px-12 relative z-30 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 font-symora">
          {dict?.bentoMarquee?.title || 'El Ecosistema Onwe'}
        </h2>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
          {dict?.bentoMarquee?.subtitle || 'Métricas, analíticas y operaciones bajo una sola presencia visual, donde el diseño acelerado y la tecnología se vuelven uno.'}
        </p>
      </div>

      {/* Background ambient glow behind the grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#00ff79]/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
      
      {/* 3D Tilted Grid Container */}
      {/* rotateX creates the falling back 3D effect. rotateZ tilts it sideways. */}
      <div 
        className="relative z-10 w-[130vw] -ml-[15vw] flex flex-col gap-6 origin-center"
        style={{
          transform: 'rotateX(8deg) rotateY(-2deg) rotateZ(-4deg) scale(1.1)',
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* Row 1: Moves Left */}
        {/* We use animate-[marquee_X] which is defined in globals.css */}
        <div className="flex w-max gap-6 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
          {marqueeItems.map((src, i) => (
            <div 
              key={`r1-${i}`} 
              className="relative w-[300px] sm:w-[400px] md:w-[500px] aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 bg-[#031510] group"
            >
              <Image 
                src={src} 
                alt="Onwe Dashboard Concept" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 768px) 300px, 500px" 
              />
              {/* Glass Hover Overlay */}
              <div className="absolute inset-0 bg-[#031c17]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className="px-6 py-2 rounded-full border border-[#00ff79]/50 text-white font-medium text-sm bg-[#031c17]/80 shadow-[0_0_20px_rgba(0,255,121,0.2)]">
                  Explorar Caso
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Moves Right (reverse) */}
        {/* Negative margin to offset the starting position compared to Row 1 */}
        <div className="flex w-max gap-6 animate-[marquee_55s_linear_infinite_reverse] hover:[animation-play-state:paused] -ml-[25vw]">
          {marqueeItems.map((src, i) => (
            <div 
              key={`r2-${i}`} 
              className="relative w-[350px] sm:w-[450px] md:w-[550px] aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 bg-[#031510] group"
            >
              <Image 
                src={src} 
                alt="Onwe Metrics Concept" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 768px) 350px, 550px" 
              />
              <div className="absolute inset-0 bg-[#031c17]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className="px-6 py-2 rounded-full border border-[#00ff79]/50 text-white font-medium text-sm bg-[#031c17]/80 shadow-[0_0_20px_rgba(0,255,121,0.2)]">
                  Ver Métricas
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 3: Moves Left (different speed/width to break uniformity) */}
        <div className="flex w-max gap-6 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] ml-[5vw]">
          {marqueeItems.map((src, i) => (
            <div 
              key={`r3-${i}`} 
              className="relative w-[280px] sm:w-[380px] md:w-[480px] aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 bg-[#031510] group"
            >
              <Image 
                src={src} 
                alt="Onwe Platform Concept" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 768px) 280px, 480px" 
              />
              <div className="absolute inset-0 bg-[#031c17]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className="px-6 py-2 rounded-full border border-[#00ff79]/50 text-white font-medium text-sm bg-[#031c17]/80 shadow-[0_0_20px_rgba(0,255,121,0.2)]">
                  Análisis Predictivo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
