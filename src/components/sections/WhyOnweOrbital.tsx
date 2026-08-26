'use client';

import React from 'react';
import Image from 'next/image';
import { Zap, ShieldCheck, Gem, TrendingUp } from 'lucide-react';

interface WhyOnweOrbitalProps {
  dict: {
    differentiators: {
      title: string;
      items: Array<{ title: string; desc: string }>;
    };
  };
}

const icons = [Zap, ShieldCheck, Gem, TrendingUp];

export default function WhyOnweOrbital({ dict }: WhyOnweOrbitalProps) {
  return (
    <section 
      id="why-onwe" 
      className="relative w-full py-24 lg:py-32 overflow-hidden bg-transparent border-t border-emerald-500/10"
    >
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            {dict.differentiators.title}
          </h2>
          <div className="w-20 h-1 bg-[#00ff79] mx-auto rounded-full" />
        </div>

        {/* Orbital System Container */}
        <div className="relative w-full flex items-center justify-center h-[500px] sm:h-[600px] lg:h-[800px]">
          
          {/* Scalable Canvas (Fixed 800x800, scales down on smaller screens) */}
          <div className="relative w-[800px] h-[800px] flex items-center justify-center scale-[0.45] sm:scale-[0.65] md:scale-75 lg:scale-100 group/system">
            
            {/* Center Logo */}
            <div className="absolute z-30 w-32 h-32 rounded-full bg-[#031c17] border border-[#00ff79]/40 flex items-center justify-center shadow-[0_0_60px_rgba(0,255,121,0.3)]">
               <Image 
                 src="/logos/onwe-mark.png" 
                 alt="Onwe" 
                 width={72} 
                 height={72} 
                 className="object-contain"
               />
               {/* Pulsing ring */}
               <div className="absolute inset-0 rounded-full border border-[#00ff79]/50 animate-ping opacity-20" />
            </div>

            {/* Inner Ring (Clockwise) */}
            <div className="absolute z-20 w-[400px] h-[400px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite] group-hover/system:[animation-play-state:paused]">
              
              {/* Item 1 (Top) */}
              <div className="absolute top-0 left-1/2 w-0 h-0">
                {/* Counter-rotation to keep card upright */}
                <div className="animate-[spin_40s_linear_infinite_reverse] group-hover/system:[animation-play-state:paused]">
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-max">
                    <PillCard item={dict.differentiators.items[0]} icon={icons[0]} />
                  </div>
                </div>
              </div>

              {/* Item 2 (Bottom) */}
              <div className="absolute bottom-0 left-1/2 w-0 h-0">
                <div className="animate-[spin_40s_linear_infinite_reverse] group-hover/system:[animation-play-state:paused]">
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-max">
                    <PillCard item={dict.differentiators.items[1]} icon={icons[1]} />
                  </div>
                </div>
              </div>

            </div>

            {/* Outer Ring (Counter-Clockwise) */}
            <div className="absolute z-10 w-[700px] h-[700px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite_reverse] group-hover/system:[animation-play-state:paused]">
              
              {/* Item 3 (Left) */}
              <div className="absolute top-1/2 left-0 w-0 h-0">
                {/* Counter-rotation to keep card upright */}
                <div className="animate-[spin_60s_linear_infinite] group-hover/system:[animation-play-state:paused]">
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-max">
                    <PillCard item={dict.differentiators.items[2]} icon={icons[2]} />
                  </div>
                </div>
              </div>

              {/* Item 4 (Right) */}
              <div className="absolute top-1/2 right-0 w-0 h-0">
                <div className="animate-[spin_60s_linear_infinite] group-hover/system:[animation-play-state:paused]">
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-max">
                    <PillCard item={dict.differentiators.items[3]} icon={icons[3]} />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function PillCard({ item, icon: Icon }: { item: { title: string, desc: string }, icon: any }) {
  return (
    <div className="group relative flex flex-col items-center justify-start bg-[#031510]/95 backdrop-blur-md border border-[#00ff79]/20 rounded-full px-6 py-4 overflow-hidden cursor-default transition-all duration-500 hover:rounded-3xl hover:bg-[#042821] hover:border-[#00ff79]/50 hover:shadow-[0_0_40px_rgba(0,255,121,0.3)] hover:z-50 hover:scale-110">
      
      {/* Glow behind pill */}
      <div className="absolute inset-0 bg-[#00ff79]/0 group-hover:bg-[#00ff79]/10 blur-xl transition-colors duration-500 rounded-full" />

      {/* Pill Header */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-[#00ff79]" />
        </div>
        <span className="text-white font-bold text-xl md:text-2xl whitespace-nowrap tracking-tight pr-2">{item.title}</span>
      </div>

      {/* Expandable Description */}
      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 w-full relative z-10">
        <div className="overflow-hidden">
           <p className="text-base md:text-lg text-slate-300 mt-4 mb-2 text-center max-w-[320px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 whitespace-normal leading-relaxed">
             {item.desc}
           </p>
        </div>
      </div>
      
    </div>
  );
}
