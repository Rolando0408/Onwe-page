'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  onClick?: () => void;
}

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'power2.out',
  inactiveTransition = 'elastic.out(1, 0.3)',
  wrapperClassName = '',
  innerClassName = '',
  onClick,
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const magnetElement = magnetRef.current;
    if (!magnetElement) return;

    const xTo = gsap.quickTo(magnetElement, 'x', {
      duration: 0.8,
      ease: activeTransition,
    });
    const yTo = gsap.quickTo(magnetElement, 'y', {
      duration: 0.8,
      ease: activeTransition,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = magnetElement.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - clientX);
      const distY = Math.abs(centerY - clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        xTo((clientX - centerX) / magnetStrength);
        yTo((clientY - centerY) / magnetStrength);
      } else {
        gsap.to(magnetElement, {
          x: 0,
          y: 0,
          duration: 1,
          ease: inactiveTransition,
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(magnetElement, {
        x: 0,
        y: 0,
        duration: 1,
        ease: inactiveTransition,
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    magnetElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      magnetElement.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(magnetElement);
    };
  }, [disabled, padding, magnetStrength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={magnetRef}
      className={`inline-block transition-transform will-change-transform ${wrapperClassName}`}
      onClick={onClick}
    >
      <div className={innerClassName}>{children}</div>
    </div>
  );
}
