'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const codeString = `import { Platform } from 'onwe/core';

async function buildSystem() {
  const app = new Platform({
    performance: 'ultra',
    architecture: 'scalable',
    security: 'enterprise'
  });
  
  await app.deploy();
  return { status: 'Live 🟢' };
}`;

const syntaxHighlight = (code: string) => {
  return code
    .replace(/(import|from|async|function|const|new|await|return)/g, '<span class="text-emerald-300 font-bold">$1</span>')
    .replace(/('onwe\/core'|'ultra'|'scalable'|'enterprise'|'Live 🟢')/g, '<span class="text-green-200">$1</span>')
    .replace(/(Platform|buildSystem|deploy)/g, '<span class="text-[#00ff79]">$1</span>');
};

export default function LaptopMockup() {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    let timer: NodeJS.Timeout;
    
    const type = () => {
      setDisplayedText(codeString.slice(0, i));
      if (i < codeString.length) {
        i++;
        timer = setTimeout(type, 30 + Math.random() * 50); // Human-like typing speed
      } else {
        timer = setTimeout(() => {
          i = 0;
          setDisplayedText('');
          type(); // Restart after delay
        }, 4000);
      }
    };
    
    timer = setTimeout(type, 1500); // Initial delay
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[900px] mx-auto flex items-center justify-center scale-110 lg:scale-[1.35] lg:translate-x-8 mt-10 lg:mt-0">
      {/* Glow behind laptop */}
      <div className="absolute inset-0 bg-[#00ff79]/20 blur-[100px] rounded-full scale-110 animate-pulse z-0 pointer-events-none" />

      {/* Floating animation wrapper */}
      <div className="relative z-10 w-full @container aspect-[4/3] animate-[floating_5s_ease-in-out_infinite]">
        
        {/* The 3D Laptop Image */}
        <Image 
          src="/Imagen1.png"
          alt="Onwe Platform 3D"
          fill
          className="object-contain drop-shadow-[0_30px_50px_rgba(0,255,121,0.25)]"
          priority
        />
        
        {/* 3D Transform Container for Screen Overlay */}
        <div 
          className="absolute z-20 overflow-hidden bg-[#031510]/95 backdrop-blur-md rounded-sm"
          style={{
            top: '18.5%', left: '26.2%', width: '44.9%', height: '42.7%',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            transform: 'perspective(3000px) rotateX(-9deg) rotateY(-16.9deg) rotateZ(-17.7deg) skewX(1deg) skewY(1.1deg)',
            containerType: 'inline-size'
          }}
        >
          {/* Code Editor Content */}
          <div 
            className="w-full h-full p-2 sm:p-3 font-mono text-emerald-500 whitespace-pre text-left relative flex flex-col justify-center items-start"
            style={{ fontSize: '4cqw', lineHeight: '1.7' }}
          >
            <div className="w-full pl-[5cqw]">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: syntaxHighlight(displayedText) + '<span class="animate-[pulse_1s_infinite] text-white">_</span>' 
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
