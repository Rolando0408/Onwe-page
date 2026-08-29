'use client';

import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // Check initial scroll position
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-[#031c17]/80 backdrop-blur-md border border-[#00ff79]/40 text-[#00ff79] shadow-lg shadow-black/50 hover:bg-[#00ff79] hover:text-black hover:scale-110 hover:shadow-[0_0_25px_rgba(0,255,121,0.6)] active:scale-95 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#00ff79] focus:ring-offset-2 focus:ring-offset-black ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <ChevronUp className="w-6 h-6 stroke-[2.5]" />
    </button>
  );
}
