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

  // JS Marquee auto-scroll and custom JS drag engine
  const hasDragged = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let lastTime = performance.now();
    
    // Cache widths to prevent Layout Thrashing on every frame
    let W1 = 0;
    let W2 = 0;
    
    const updateWidths = () => {
      if (row1Ref.current) W1 = row1Ref.current.scrollWidth / 3;
      if (row2Ref.current) W2 = row2Ref.current.scrollWidth / 3;
    };
    
    updateWidths();
    window.addEventListener('resize', updateWidths);
    
    const loop = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      const speed = prefersReducedMotion ? 0 : (deltaTime * 60) / 1000;
      
      if (row1Ref.current && !isInteracting.current.row1 && speed > 0) {
        row1Ref.current.scrollLeft += speed;
        if (W1 > 0 && row1Ref.current.scrollLeft >= W1) {
          row1Ref.current.scrollLeft -= W1;
        }
      }
      
      if (row2Ref.current && !isInteracting.current.row2 && speed > 0) {
        row2Ref.current.scrollLeft -= speed;
        if (W2 > 0 && row2Ref.current.scrollLeft <= 0) {
          row2Ref.current.scrollLeft += W2;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    
    // Start the auto-scroll loop
    animationFrameId = requestAnimationFrame(loop);

    // Custom Drag Engine
    let isDragging1 = false;
    let startX1 = 0;
    let startScrollLeft1 = 0;

    let isDragging2 = false;
    let startX2 = 0;
    let startScrollLeft2 = 0;

    const r1 = row1Ref.current;
    const r2 = row2Ref.current;

    // Row 1 Handlers
    const onDown1 = (e: PointerEvent) => {
      isDragging1 = true;
      isInteracting.current.row1 = true;
      hasDragged.current = false;
      startX1 = e.clientX;
      startScrollLeft1 = r1 ? r1.scrollLeft : 0;
      if (r1) r1.setPointerCapture(e.pointerId);
    };
    const onMove1 = (e: PointerEvent) => {
      if (!isDragging1 || !r1) return;
      const dx = e.clientX - startX1;
      if (Math.abs(dx) > 5) hasDragged.current = true;
      r1.scrollLeft = startScrollLeft1 - dx;
      
      if (W1 > 0 && r1.scrollLeft >= W1) {
        r1.scrollLeft -= W1;
        startScrollLeft1 -= W1;
      } else if (W1 > 0 && r1.scrollLeft <= 0) {
        r1.scrollLeft += W1;
        startScrollLeft1 += W1;
      }
    };
    const onUp1 = (e: PointerEvent) => {
      isDragging1 = false;
      isInteracting.current.row1 = false;
      if (r1) r1.releasePointerCapture(e.pointerId);
    };

    // Row 2 Handlers
    const onDown2 = (e: PointerEvent) => {
      isDragging2 = true;
      isInteracting.current.row2 = true;
      hasDragged.current = false;
      startX2 = e.clientX;
      startScrollLeft2 = r2 ? r2.scrollLeft : 0;
      if (r2) r2.setPointerCapture(e.pointerId);
    };
    const onMove2 = (e: PointerEvent) => {
      if (!isDragging2 || !r2) return;
      const dx = e.clientX - startX2;
      if (Math.abs(dx) > 5) hasDragged.current = true;
      r2.scrollLeft = startScrollLeft2 - dx;
      
      if (W2 > 0 && r2.scrollLeft <= 0) {
        r2.scrollLeft += W2;
        startScrollLeft2 += W2;
      } else if (W2 > 0 && r2.scrollLeft >= W2) {
        r2.scrollLeft -= W2;
        startScrollLeft2 -= W2;
      }
    };
    const onUp2 = (e: PointerEvent) => {
      isDragging2 = false;
      isInteracting.current.row2 = false;
      if (r2) r2.releasePointerCapture(e.pointerId);
    };

    if (r1) {
      r1.addEventListener('pointerdown', onDown1);
      r1.addEventListener('pointermove', onMove1);
      r1.addEventListener('pointerup', onUp1);
      r1.addEventListener('pointercancel', onUp1);
    }
    if (r2) {
      r2.addEventListener('pointerdown', onDown2);
      r2.addEventListener('pointermove', onMove2);
      r2.addEventListener('pointerup', onUp2);
      r2.addEventListener('pointercancel', onUp2);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateWidths);
      if (r1) {
        r1.removeEventListener('pointerdown', onDown1);
        r1.removeEventListener('pointermove', onMove1);
        r1.removeEventListener('pointerup', onUp1);
        r1.removeEventListener('pointercancel', onUp1);
      }
      if (r2) {
        r2.removeEventListener('pointerdown', onDown2);
        r2.removeEventListener('pointermove', onMove2);
        r2.removeEventListener('pointerup', onUp2);
        r2.removeEventListener('pointercancel', onUp2);
      }
    };
  }, []);

  // Cerrar el lightbox con la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        isInteracting.current = { row1: false, row2: false };
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Duplicate items 3 times for a completely seamless infinite loop
  const marqueeItems = [...images, ...images, ...images];

  useGSAP(() => {
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
      <div className="container mx-auto px-6 lg:px-12 relative z-30 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 font-symora">
          {dict?.bentoMarquee?.title || 'El Ecosistema Onwe'}
        </h2>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
          {dict?.bentoMarquee?.subtitle || 'Métricas, analíticas y operaciones bajo una sola presencia visual, donde el diseño acelerado y la tecnología se vuelven uno.'}
        </p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#00ff79]/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
      
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
          className="w-full overflow-hidden no-scrollbar cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="flex w-max gap-6 px-4">
            {marqueeItems.map((src, i) => (
              <div 
                key={`r1-${i}`} 
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImage(src);
                    isInteracting.current = { row1: false, row2: false };
                  }
                }}
                onClick={(e) => {
                  if (hasDragged.current) { e.preventDefault(); return; }
                  setSelectedImage(src);
                  isInteracting.current = { row1: false, row2: false };
                }}
                className="shrink-0 relative w-[240px] sm:w-[320px] md:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden mix-blend-screen group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff79] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031510]"
              >
              <Image 
                src={src} 
                alt="Onwe Dashboard Concept" 
                fill 
                draggable={false}
                priority={i < 3}
                className="object-cover transition-transform duration-700 md:group-hover:scale-105 pointer-events-none select-none" 
                sizes="(max-width: 768px) 240px, 400px" 
              />
              {/* Glass Hover Overlay */}
              <div className="absolute inset-0 bg-[#031c17]/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                <span className="px-6 py-2 rounded-full border border-[#00ff79]/50 text-white font-medium text-sm bg-transparent shadow-[0_0_20px_rgba(0,255,121,0.2)]">
                  Ver imagen
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Row 2: Moves Right (reverse) */}
        <div 
          ref={row2Ref}
          className="w-full overflow-hidden no-scrollbar cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="flex w-max gap-6 px-4 -ml-[15vw]">
            {marqueeItems.map((src, i) => (
              <div 
                key={`r2-${i}`} 
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImage(src);
                    isInteracting.current = { row1: false, row2: false };
                  }
                }}
                onClick={(e) => {
                  if (hasDragged.current) { e.preventDefault(); return; }
                  setSelectedImage(src);
                  isInteracting.current = { row1: false, row2: false };
                }}
                className="shrink-0 relative w-[260px] sm:w-[340px] md:w-[420px] aspect-[4/5] rounded-3xl overflow-hidden mix-blend-screen group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff79] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031510]"
              >
              <Image 
                src={src} 
                alt="Onwe Metrics Concept" 
                fill 
                draggable={false}
                priority={i < 3}
                className="object-cover transition-transform duration-700 md:group-hover:scale-105 pointer-events-none select-none" 
                sizes="(max-width: 768px) 260px, 420px" 
              />
              <div className="absolute inset-0 bg-[#031c17]/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                <span className="px-6 py-2 rounded-full border border-[#00ff79]/50 text-white font-medium text-sm bg-transparent shadow-[0_0_20px_rgba(0,255,121,0.2)]">
                  Ver imagen
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
                priority
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
