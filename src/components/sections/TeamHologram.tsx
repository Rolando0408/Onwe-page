'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const teamData = [
  {
    name: 'Gustavo Gutiérrez',
    roleKey: 'ceo',
    image: '/images/team_1_1787770505148.jpg',
  },
  {
    name: 'Rolando Rivas',
    roleKey: 'cto',
    image: '/images/team_2_1787770515440.jpg',
  },
  {
    name: 'Jesús Rivas',
    roleKey: 'engineering',
    image: '/images/team_3_1787770524787.jpg',
  },
  {
    name: 'Gabriel Cardona',
    roleKey: 'design',
    image: '/images/team_4_1787770535008.jpg',
  },
  {
    name: 'Adriano Robati',
    roleKey: 'product',
    image: '/images/team_5_1787770562638.jpg',
  },
  {
    name: 'Nelson Hernández',
    roleKey: 'data',
    image: '/images/team_6_1787770572908.jpg',
  },
  {
    name: 'César García',
    roleKey: 'growth',
    image: '/images/team_7_1787770582953.jpg',
  },
];

interface TeamHologramProps {
  dict?: {
    teamHologram?: {
      title?: string;
      subtitle?: string;
      roles?: Record<string, string>;
    };
  };
}

export default function TeamHologram({ dict }: TeamHologramProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animation for the team title
    gsap.fromTo('.team-header', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Staggered reveal for the hologram cards
    gsap.fromTo('.holo-card', 
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="team" ref={sectionRef} className="relative w-full py-24 lg:py-40 bg-transparent z-10">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="team-header text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 font-symora">
            {dict?.teamHologram?.title || 'Nuestra Mente Maestra'}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            {dict?.teamHologram?.subtitle || 'El talento humano detrás del código. Un equipo interdisciplinario orquestando el futuro del B2B SaaS.'}
          </p>
        </div>

        {/* Hologram Grid */}
        <div ref={gridRef} className="holo-grid flex flex-wrap justify-center gap-6 lg:gap-8 max-w-7xl mx-auto">
          {teamData.map((member, i) => (
            <div 
              key={i} 
              className="holo-card group relative w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] aspect-[3/4] rounded-2xl overflow-hidden bg-[#010907] border border-white/5 cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,255,121,0.15)]"
            >
              {/* Holographic Image Container */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover transition-all duration-700 filter grayscale opacity-40 mix-blend-luminosity blur-[2px] group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal group-hover:blur-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Scanline overlay (always present, subtle) */}
              <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(0,255,121,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-50 group-hover:opacity-10 transition-opacity duration-500" />
              
              {/* Green Laser glow from bottom on hover */}
              <div className="absolute inset-0 w-full h-full shadow-[0_-20px_40px_-20px_rgba(0,255,121,0)_inset] group-hover:shadow-[0_-80px_80px_-20px_rgba(0,255,121,0.5)_inset] transition-all duration-500 pointer-events-none" />

              {/* Information Overlay (Slides up on hover) */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-[#010907] via-[#010907]/90 to-transparent pt-12">
                <h3 className="text-xl font-bold text-white mb-1 tracking-wide">{member.name}</h3>
                <p className="text-[#00ff79] font-medium text-sm tracking-wider uppercase">
                  {dict?.teamHologram?.roles?.[member.roleKey] || member.roleKey}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
