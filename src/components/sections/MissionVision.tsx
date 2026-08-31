'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Eye, Diamond, CheckCircle2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
}

const GlassShape3D = ({ shapeType, colorHex, transmission = 1, glassOpacity = 1 }: { shapeType: 'icosahedron' | 'torus' | 'octahedron', colorHex: string, transmission?: number, glassOpacity?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const isTorus = shapeType === 'torus';
  const finalColor = isTorus ? '#085b45' : colorHex;
  const finalTransmission = isTorus ? 0.6 : transmission;
  const finalOpacity = isTorus ? 0.8 : glassOpacity;
  const finalThickness = isTorus ? 1.4 : 0.5;
  const finalRoughness = isTorus ? 0.0 : 0.05;
  const finalIor = isTorus ? 2.5 : 1.3;
  const finalChromaticAberration = isTorus ? 0.0 : 0.06;

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        {shapeType === 'icosahedron' && <icosahedronGeometry args={[1.4, 0]} />}
        {shapeType === 'torus' && <torusGeometry args={[1.1, 0.4, 32, 100]} />}
        {shapeType === 'octahedron' && <octahedronGeometry args={[1.5, 0]} />}
        <MeshTransmissionMaterial 
          backside
          thickness={finalThickness}
          roughness={finalRoughness}
          transmission={finalTransmission}
          transparent={finalOpacity < 1 || finalTransmission < 1}
          opacity={finalOpacity}
          ior={finalIor}
          chromaticAberration={finalChromaticAberration}
          anisotropy={0.1}
          color={finalColor}
        />
      </mesh>
    </Float>
  );
};

const Figure3DContainer = ({ shapeType, colorHex, glowColor, glowOpacity = "opacity-40", transmission = 1, glassOpacity = 1, delay = 0 }: { shapeType: 'icosahedron' | 'torus' | 'octahedron', colorHex: string, glowColor?: string, glowOpacity?: string, transmission?: number, glassOpacity?: number, delay?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      scale: 1.15,
      opacity: 0.5,
      duration: 3 + delay * 0.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: delay
    });
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !glowRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(containerRef.current.querySelector('.canvas-wrapper'), {
      x: x * 40,
      y: y * 40,
      duration: 1,
      ease: "power2.out"
    });
    
    gsap.to(glowRef.current, {
      x: -x * 20,
      y: -y * 20,
      duration: 1.2,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current || !glowRef.current) return;
    gsap.to(containerRef.current.querySelector('.canvas-wrapper'), {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.4)"
    });
    gsap.to(glowRef.current, {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.4)"
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-md aspect-square flex items-center justify-center cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background ambient glow matching the color using radial gradient to avoid blur clipping bounding boxes */}
      <div 
        ref={glowRef}
        className={`absolute -inset-20 ${glowOpacity} mix-blend-screen pointer-events-none transition-colors duration-500`}
        style={{ background: `radial-gradient(circle at center, ${glowColor || colorHex} 0%, transparent 70%)` }}
      />
      
      {/* 3D Canvas wrapper */}
      <div className="canvas-wrapper relative w-full h-full z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={2} color={colorHex} />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
          <GlassShape3D shapeType={shapeType} colorHex={colorHex} transmission={transmission} glassOpacity={glassOpacity} />
          <Environment preset="studio" />
        </Canvas>
      </div>
    </div>
  );
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
