'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Eye, Diamond, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MissionVisionProps {
  dict?: {
    about?: {
      mission_title?: string;
      mission_desc?: string;
      vision_title?: string;
      vision_desc?: string;
      values_title?: string;
      values?: {
        title: string;
        desc: string;
      }[];
    };
  };
}

export default function MissionVision({ dict }: MissionVisionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Refs for animating the rows
  const missionTextRef = useRef<HTMLDivElement>(null);
  const missionVisualRef = useRef<HTMLDivElement>(null);
  
  const visionTextRef = useRef<HTMLDivElement>(null);
  const visionVisualRef = useRef<HTMLDivElement>(null);
  
  const valuesTextRef = useRef<HTMLDivElement>(null);
  const valuesVisualRef = useRef<HTMLDivElement>(null);
  const valuesListRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const commonScrollTrigger = (trigger: Element | null) => ({
      trigger,
      start: 'top 70%', // Start slightly lower, but with proper calculations now
      toggleActions: 'play none none reverse',
    });

    // Row 1: Mission (Text from Left, Visual from Right)
    if (missionTextRef.current && missionVisualRef.current) {
      gsap.fromTo(
        missionTextRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: commonScrollTrigger(missionTextRef.current) }
      );
      gsap.fromTo(
        missionVisualRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: commonScrollTrigger(missionVisualRef.current) }
      );
    }

    // Row 2: Vision (Visual from Left, Text from Right)
    if (visionTextRef.current && visionVisualRef.current) {
      gsap.fromTo(
        visionTextRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: commonScrollTrigger(visionTextRef.current) }
      );
      gsap.fromTo(
        visionVisualRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: commonScrollTrigger(visionVisualRef.current) }
      );
    }

    // Row 3: Values (Text from Left, Visual from Right, List cascade)
    if (valuesTextRef.current && valuesVisualRef.current && valuesListRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: commonScrollTrigger(valuesTextRef.current)
      });

      tl.fromTo(
        valuesTextRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' }
      )
      .fromTo(
        valuesVisualRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' },
        "-=1.2" // start slightly before previous animation ends
      );

      // Stagger children of the values list
      if (valuesListRef.current.children.length > 0) {
        gsap.fromTo(
          valuesListRef.current.children,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: valuesListRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }

    // Fix calculation order due to previous section's pinSpacing
    setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="relative w-full py-24 lg:py-32 overflow-hidden bg-[#031c17]">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff79]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#39d5ac]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col gap-24 lg:gap-32">
        
        {/* ROW 1: MISSION (Zig) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div ref={missionTextRef} className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>{dict?.about?.mission_title || 'Nuestra Misión'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-symora leading-tight">
              Diseñamos el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff79] to-[#39d5ac]">presente</span>.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              {dict?.about?.mission_desc || 'Impulsar la transformación digital...'}
            </p>
          </div>
          
          <div ref={missionVisualRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff79]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Target className="w-32 h-32 text-[#00ff79]/80 drop-shadow-[0_0_30px_rgba(0,255,121,0.5)] group-hover:scale-110 transition-transform duration-700 ease-out" strokeWidth={1} />
            </div>
          </div>
        </div>

        {/* ROW 2: VISION (Zag) */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div ref={visionVisualRef} className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tl from-[#39d5ac]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Eye className="w-32 h-32 text-[#39d5ac]/80 drop-shadow-[0_0_30px_rgba(57,213,172,0.5)] group-hover:scale-110 transition-transform duration-700 ease-out" strokeWidth={1} />
            </div>
          </div>

          <div ref={visionTextRef} className="w-full lg:w-1/2 space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Eye className="w-4 h-4" />
              <span>{dict?.about?.vision_title || 'Nuestra Visión'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-symora leading-tight">
              Construimos el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff79] to-[#39d5ac]">futuro</span>.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              {dict?.about?.vision_desc || 'Convertirnos en el estándar de excelencia...'}
            </p>
          </div>
        </div>

        {/* ROW 3: VALUES (Zig) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div ref={valuesTextRef} className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Diamond className="w-4 h-4" />
              <span>{dict?.about?.values_title || 'Nuestros Valores'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-symora">
              Lo que nos <span className="text-[#00ff79]">define</span>.
            </h2>
            
            <ul ref={valuesListRef} className="space-y-6">
              {dict?.about?.values?.map((val, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ff79]/40 hover:bg-white/10 transition-colors duration-300">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#00ff79]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{val.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{val.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div ref={valuesVisualRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff79]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Diamond className="w-32 h-32 text-[#00ff79]/80 drop-shadow-[0_0_30px_rgba(0,255,121,0.5)] group-hover:scale-110 transition-transform duration-700 ease-out" strokeWidth={1} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
