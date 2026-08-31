'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// These are the AI-generated Onwe aesthetic images
const images = [
  '/images/IMG_8654.JPG',
  '/images/IMG_8655.JPG',
  '/images/IMG_8656.JPG',
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const isInteracting = useRef({ row1: false, row2: false });

  // JS Marquee auto-scroll loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    
    const loop = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Approx 1px per frame at 60fps
      const speed = (deltaTime * 60) / 1000;
      
      if (row1Ref.current && !isInteracting.current.row1) {
        row1Ref.current.scrollLeft += speed;
        const W1 = row1Ref.current.scrollWidth / 3;
        // Jump back seamlessly when scrolled past a full set
        if (row1Ref.current.scrollLeft >= W1 * 2) {
          row1Ref.current.scrollLeft -= W1;
        }
      }
      
      if (row2Ref.current && !isInteracting.current.row2) {
        row2Ref.current.scrollLeft -= speed;
        const W2 = row2Ref.current.scrollWidth / 3;
        // Jump forward seamlessly when hitting the start
        if (row2Ref.current.scrollLeft <= 0) {
          row2Ref.current.scrollLeft += W2;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Cerrar el lightbox con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setScale(1);
        isInteracting.current = { row1: false, row2: false };
      }
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

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
      id="services"
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
        <div 
          ref={row1Ref}
          onMouseEnter={() => { isInteracting.current.row1 = true; }}
          onMouseLeave={() => { isInteracting.current.row1 = false; }}
          onTouchStart={() => { isInteracting.current.row1 = true; }}
          onTouchEnd={() => { isInteracting.current.row1 = false; }}
          className="w-full overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max gap-6 px-4">
            {marqueeItems.map((src, i) => (
              <div 
                key={`r1-${i}`} 
                onClick={() => {
                  setSelectedImage(src);
                  isInteracting.current = { row1: false, row2: false };
                }}
                className="cursor-pointer shrink-0 relative w-[240px] sm:w-[320px] md:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 bg-[#031510] group"
              >
              <Image 
                src={src} 
                alt="Onwe Dashboard Concept" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 768px) 240px, 400px" 
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
        </div>

        {/* Row 2: Moves Right (reverse) */}
        <div 
          ref={row2Ref}
          onMouseEnter={() => { isInteracting.current.row2 = true; }}
          onMouseLeave={() => { isInteracting.current.row2 = false; }}
          onTouchStart={() => { isInteracting.current.row2 = true; }}
          onTouchEnd={() => { isInteracting.current.row2 = false; }}
          className="w-full overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max gap-6 px-4 -ml-[15vw]">
            {marqueeItems.map((src, i) => (
              <div 
                key={`r2-${i}`} 
                onClick={() => {
                  setSelectedImage(src);
                  isInteracting.current = { row1: false, row2: false };
                }}
                className="cursor-pointer shrink-0 relative w-[260px] sm:w-[340px] md:w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 bg-[#031510] group"
              >
              <Image 
                src={src} 
                alt="Onwe Metrics Concept" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 768px) 260px, 420px" 
              />
              <div className="absolute inset-0 bg-[#031c17]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className="px-6 py-2 rounded-full border border-[#00ff79]/50 text-white font-medium text-sm bg-[#031c17]/80 shadow-[0_0_20px_rgba(0,255,121,0.2)]">
                  Ver Métricas
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal rendered via Portal to escape 3D container context */}
      {selectedImage && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-[#031510]/95 backdrop-blur-md overflow-auto transition-opacity no-scrollbar [&::-webkit-scrollbar]:hidden"
          onClick={() => { 
            setSelectedImage(null); 
            setScale(1); 
            isInteracting.current = { row1: false, row2: false };
          }}
        >
          <div className={`min-h-[100vh] min-w-[100vw] flex justify-center p-4 sm:p-8 ${scale > 1 ? 'items-start' : 'items-center'}`}>
            {/* Botón Cerrar */}
            <button 
              className="fixed top-6 right-6 z-[10000] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-lg transition-all shadow-md"
              onClick={() => { 
                setSelectedImage(null); 
                setScale(1); 
                isInteracting.current = { row1: false, row2: false };
              }}
              aria-label="Cerrar imagen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Contenedor de la Imagen con Zoom */}
            <div 
              className="relative rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,255,121,0.15)] transition-all duration-300 ease-out m-auto aspect-[4/5]"
              style={{
                width: scale > 1 ? '150vw' : '100%',
                maxHeight: scale > 1 ? 'none' : '90vh',
                maxWidth: scale > 1 ? 'none' : '1024px',
                cursor: scale > 1 ? 'zoom-out' : 'zoom-in'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setScale(s => s === 1 ? 2 : 1);
              }}
            >
              <Image 
                src={selectedImage}
                alt="Vista ampliada"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
