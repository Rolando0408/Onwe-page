'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Eye, Diamond, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Figure3DContainer = dynamic(() => import('@/components/ui/Figure3DContainer'), { ssr: false });

interface MissionVisionProps {
  dict?: {
    about?: {
      mission_title?: string;
      mission_h2_p1?: string;
      mission_h2_hl?: string;
      mission_desc?: string;
      vision_title?: string;
      vision_h2_p1?: string;
      vision_h2_hl?: string;
      vision_desc?: string;
      values_title?: string;
      values_h2_p1?: string;
      values_h2_hl?: string;
      values?: {
        title: string;
        desc: string;
      }[];
    };
  };
};

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
      const trigger = missionTextRef.current.parentElement;
      gsap.fromTo(
        missionTextRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: commonScrollTrigger(trigger) }
      );
      gsap.fromTo(
        missionVisualRef.current,
        { opacity: 0.01, x: 60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: commonScrollTrigger(trigger) }
      );
    }

    // Row 2: Vision (Visual from Left, Text from Right)
    if (visionTextRef.current && visionVisualRef.current) {
      const trigger = visionTextRef.current.parentElement;
      gsap.fromTo(
        visionTextRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: commonScrollTrigger(trigger) }
      );
      gsap.fromTo(
        visionVisualRef.current,
        { opacity: 0.01, x: -60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: commonScrollTrigger(trigger) }
      );
    }

    // Row 3: Values (Text from Left, Visual from Right, List cascade)
    if (valuesTextRef.current && valuesVisualRef.current && valuesListRef.current) {
      const trigger = valuesTextRef.current.parentElement;
      const tl = gsap.timeline({
        scrollTrigger: commonScrollTrigger(trigger)
      });

      tl.fromTo(
        valuesTextRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' }
      )
      .fromTo(
        valuesVisualRef.current,
        { opacity: 0.01, x: 60 },
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
    <section id="about" ref={containerRef} className="relative w-full overflow-hidden">
      
      {/* ROW 1: MISSION (Zig) */}
      <div className="w-full bg-[#031c17] py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 lg:pl-40 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div ref={missionTextRef} className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>{dict?.about?.mission_title || 'Nuestra Misión'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-symora leading-tight">
              {dict?.about?.mission_h2_p1 || 'Diseñamos el'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff79] to-[#39d5ac]">{dict?.about?.mission_h2_hl || 'presente.'}</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              {dict?.about?.mission_desc || 'Impulsar la transformación digital...'}
            </p>
          </div>
          
          <div ref={missionVisualRef} className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-end lg:pr-15">
            <Figure3DContainer 
              shapeType="icosahedron" 
              colorHex="#00ff79" 
              delay={0}
            />
          </div>
        </div>
      </div>

      {/* ROW 2: VISION (Zag) */}
      <div className="w-full bg-[#c2ffdb] py-24 lg:py-32 lg:pl-12 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div ref={visionVisualRef} className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-start">
            <Figure3DContainer 
              shapeType="torus" 
              colorHex="#39d5ac" 
              glowColor="#00ff79"
              glowOpacity="opacity-100"
              transmission={0.9}
              glassOpacity={0.4}
              delay={0.2}
            />
          </div>

          <div ref={visionTextRef} className="w-full lg:w-1/2 space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#054c3e] border border-[#031c17] text-[#c2ffdb] text-sm font-bold">
              <Eye className="w-4 h-4" />
              <span>{dict?.about?.vision_title || 'Nuestra Visión'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#054c3e] font-symora leading-tight">
              {dict?.about?.vision_h2_p1 || 'Construimos el'} <span className="text-[#08af83] drop-shadow-sm">{dict?.about?.vision_h2_hl || 'futuro.'}</span>
            </h2>
            <p className="text-[#054c3e] font-medium text-lg leading-relaxed max-w-xl">
              {dict?.about?.vision_desc || 'Convertirnos en el estándar de excelencia...'}
            </p>
          </div>
        </div>
      </div>

      {/* ROW 3: VALUES (Zig) */}
      <div className="w-full bg-[#031c17] py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 lg:pl-40 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div ref={valuesTextRef} className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Diamond className="w-4 h-4" />
              <span>{dict?.about?.values_title || 'Nuestros Valores'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-symora">
              {dict?.about?.values_h2_p1 || 'Lo que nos'} <span className="text-[#00ff79]">{dict?.about?.values_h2_hl || 'define.'}</span>
            </h2>
            
            <ul ref={valuesListRef} className="space-y-6">
              {dict?.about?.values?.map((val, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#031c17]/45 backdrop-blur-2xl border border-[#00ff79] shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_35px_rgba(0,255,121,0.4)] transition-colors duration-300">
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
          
          <div ref={valuesVisualRef} className="hidden lg:flex w-full lg:pr-12 lg:w-1/2 justify-center lg:justify-end">
            <Figure3DContainer 
              shapeType="octahedron" 
              colorHex="#80ffc0" 
              delay={0.4}
            />
          </div>
        </div>
      </div>

    </section>
  );
}
