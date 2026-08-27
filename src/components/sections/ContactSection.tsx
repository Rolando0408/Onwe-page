'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ContactSectionProps {
  dict?: {
    contact?: {
      title?: string;
      subtitle?: string;
      form?: {
        name?: string;
        company?: string;
        email?: string;
        message?: string;
        submit?: string;
      };
    };
    footer?: {
      address_l1?: string;
      address_l2?: string;
    };
  };
}

export default function ContactSection({ dict }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    // Simulate server response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  useGSAP(() => {
    // Reveal left column
    gsap.fromTo(leftColRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Reveal right column (Form)
    gsap.fromTo(rightColRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="relative w-full py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Copy & Direct Contact */}
          <div ref={leftColRef} className="w-full lg:w-1/2 lg:ml-20 lg:mb-10">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-symora leading-tight">
              {dict?.contact?.title || 'Hagamos que suceda.'}
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-12">
              {dict?.contact?.subtitle || 'Déjanos tus datos y nos pondremos en contacto contigo en menos de 24 horas para discutir tu proyecto.'}
            </p>

            <div className="space-y-6">
              <a href="mailto:hello@onwe.com" className="inline-flex items-center gap-4 text-slate-300 hover:text-[#00ff79] transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#00ff79]/50 group-hover:text-[#00ff79] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium group-hover:text-[#00ff79] transition-colors">hello@onwe.com</span>
              </a>
              
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">{dict?.footer?.address_l1 || 'Caracas, Venezuela'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphism Form */}
          <div ref={rightColRef} className="w-full lg:w-1/2">
            <div className="relative p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
              {/* Subtle top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00ff79]/50 to-transparent" />
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 block">
                      {dict?.contact?.form?.name || 'Nombre completo'}
                    </label>
                    <input 
                      type="text" 
                      required
                      disabled={isSubmitted || isSubmitting}
                      className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00ff79]/50 focus:ring-1 focus:ring-[#00ff79]/50 focus-visible:ring-2 focus-visible:ring-[#00ff79] transition-all shadow-inner disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  {/* Company Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 block">
                      {dict?.contact?.form?.company || 'Empresa'}
                    </label>
                    <input 
                      type="text" 
                      disabled={isSubmitted || isSubmitting}
                      className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00ff79]/50 focus:ring-1 focus:ring-[#00ff79]/50 focus-visible:ring-2 focus-visible:ring-[#00ff79] transition-all shadow-inner disabled:opacity-50"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 block">
                    {dict?.contact?.form?.email || 'Correo electrónico'}
                  </label>
                  <input 
                    type="email" 
                    required
                    disabled={isSubmitted || isSubmitting}
                    className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00ff79]/50 focus:ring-1 focus:ring-[#00ff79]/50 focus-visible:ring-2 focus-visible:ring-[#00ff79] transition-all shadow-inner disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 block">
                    {dict?.contact?.form?.message || 'Mensaje'}
                  </label>
                  <textarea 
                    rows={4}
                    required
                    disabled={isSubmitted || isSubmitting}
                    className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00ff79]/50 focus:ring-1 focus:ring-[#00ff79]/50 focus-visible:ring-2 focus-visible:ring-[#00ff79] transition-all resize-none shadow-inner disabled:opacity-50"
                    placeholder="..."
                  />
                </div>

                {/* Submit Button & Feedback */}
                {isSubmitted ? (
                  <div className="w-full py-4 rounded-xl bg-[#00ff79]/15 border border-[#00ff79]/40 text-[#00ff79] font-bold text-center flex items-center justify-center gap-2 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 text-[#00ff79]" />
                    <span>¡Mensaje enviado con éxito! Te contactaremos pronto.</span>
                  </div>
                ) : (
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="relative group overflow-hidden w-full flex items-center justify-center gap-2.5 py-4 text-base font-bold text-[#010907] bg-[#00ff79] hover:bg-[#00e06a] rounded-full shadow-[0_0_20px_rgba(0,255,121,0.4)] hover:shadow-[0_0_40px_rgba(0,255,121,0.6)] focus-visible:ring-2 focus-visible:ring-white transition-all duration-300 active:scale-95 disabled:opacity-75 cursor-pointer mt-4"
                  >
                    {/* Shine Sweep Effect */}
                    <span className="absolute top-0 -left-full w-full h-full skew-x-[-35deg] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none z-0" />
                    
                    {isSubmitting ? (
                      <>
                        <Loader2 className="relative z-10 w-5 h-5 animate-spin text-[#010907]" />
                        <span className="relative z-10">Enviando...</span>
                      </>
                    ) : (
                      <span className="relative z-10">{dict?.contact?.form?.submit || 'Enviar Mensaje'}</span>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff79]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
