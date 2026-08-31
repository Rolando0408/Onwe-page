'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface NarrativeTransitionProps {
  dict: {
    narrative: {
      problem: string;
      solution: string;
    };
  };
}

export default function NarrativeTransition({ dict }: NarrativeTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLHeadingElement>(null);
  const baseTextRef = useRef<HTMLHeadingElement>(null);
  const solutionRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      // Desktop: scrubbed pin
      desktop: "(min-width: 768px)",
      // Mobile: autoplay when in view, no pin
      mobile: "(max-width: 767px)"
    }, (context) => {
      const { desktop } = context.conditions as { desktop: boolean; mobile: boolean };
      
      const tl = gsap.timeline({
        scrollTrigger: desktop ? {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        } : {
          trigger: containerRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // 0. Darken the background gradually
      tl.to(bgRef.current, {
        opacity: 0.95,
        duration: 1,
        ease: 'power1.inOut',
      }, 0)
      // 1. Draw the strikethrough line over the problem
      .to(problemRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power2.inOut',
      }, 0)
      // 2. Dim the problem text slightly
      .to([baseTextRef.current, problemRef.current], {
        opacity: 0.3,
        duration: 0.5,
      }, "<0.5")
      // 3. Reveal the solution text from below
      .fromTo(solutionRef.current, {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      });

      // 4. Fade out the background just before unpinning to avoid a hard edge
      // Only necessary if it's scrubbing, but keeping it smooth for both
      tl.to(bgRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center bg-transparent"
    >
      {/* Darkening Overlay with faded top and bottom edges to avoid sharp cuts */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 bg-[#031c17] z-0 opacity-0 pointer-events-none" 
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center justify-center text-center max-w-5xl h-full">
        {/* Problem State */}
        <div className="relative mb-6 md:mb-10 inline-block">
          {/* Base Text */}
          <h2 
            ref={baseTextRef}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-symora text-slate-300 leading-tight"
          >
            {dict.narrative.problem}
          </h2>
          
          {/* Strikethrough Overlay Text */}
          <h2 
            ref={problemRef}
            className="absolute top-0 left-0 w-full h-full text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-symora text-transparent leading-tight pointer-events-none"
            style={{
              textDecoration: 'line-through',
              textDecorationColor: '#00ff79',
              textDecorationThickness: '6px',
              clipPath: 'inset(0 100% 0 0)'
            }}
            aria-hidden="true"
          >
            {dict.narrative.problem}
          </h2>
        </div>

        {/* Solution State */}
        <div className="relative">
          <h2 
            ref={solutionRef}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-symora text-white leading-tight opacity-0 drop-shadow-[0_0_40px_rgba(0,255,121,0.5)]"
          >
            {dict.narrative.solution}
          </h2>
        </div>

      </div>
    </section>
  );
}
