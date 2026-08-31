'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

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
          resolution={256}
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

const FallbackShape3D = ({ shapeType, colorHex }: { shapeType: 'icosahedron' | 'torus' | 'octahedron', colorHex: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        {shapeType === 'icosahedron' && <icosahedronGeometry args={[1.4, 0]} />}
        {shapeType === 'torus' && <torusGeometry args={[1.1, 0.4, 32, 100]} />}
        {shapeType === 'octahedron' && <octahedronGeometry args={[1.5, 0]} />}
        <meshStandardMaterial color={colorHex} wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
  );
};

export default function Figure3DContainer({ shapeType, colorHex, glowColor, glowOpacity = "opacity-40", transmission = 1, glassOpacity = 1, delay = 0 }: { shapeType: 'icosahedron' | 'torus' | 'octahedron', colorHex: string, glowColor?: string, glowOpacity?: string, transmission?: number, glassOpacity?: number, delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hack to fix WebGL/R3F "blank until tab switch" bug
    const timer1 = setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    const timer2 = setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
    const timer3 = setTimeout(() => window.dispatchEvent(new Event('resize')), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

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
      className="relative w-full max-w-md aspect-square min-h-[300px] flex items-center justify-center cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={glowRef}
        className={`absolute -inset-20 ${glowOpacity} mix-blend-screen pointer-events-none transition-colors duration-500`}
        style={{ background: `radial-gradient(circle at center, ${glowColor || colorHex} 0%, transparent 70%)` }}
      />
      
      <div className="canvas-wrapper relative w-full h-full z-10 pointer-events-none">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={2} color={colorHex} />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
          <React.Suspense fallback={<FallbackShape3D shapeType={shapeType} colorHex={colorHex} />}>
            <GlassShape3D shapeType={shapeType} colorHex={colorHex} transmission={transmission} glassOpacity={glassOpacity} />
            <Environment resolution={256}>
              <group rotation={[-Math.PI / 4, -0.3, 0]}>
                <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
                <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
                <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
              </group>
            </Environment>
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  );
}
