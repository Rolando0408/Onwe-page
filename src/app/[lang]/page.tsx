import { getDictionary, Locale, locales } from '@/lib/dictionaries';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';

import NarrativeTransition from '@/components/sections/NarrativeTransition';
import WhyOnweCircuits from '@/components/sections/WhyOnweCircuits';
import BentoMarquee from '@/components/sections/BentoMarquee';
import TeamHologram from '@/components/sections/TeamHologram';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import Grainient from '@/components/ui/Grainient';
import ScrollToTop from '@/components/ui/ScrollToTop';
import MissionVision from '@/components/sections/MissionVision';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : 'es') as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="relative min-h-screen text-white flex flex-col selection:bg-[#00ff79] selection:text-black">
      {/* Global Background Grainient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Grainient
          color1="#39d5ac"
          color2="#031c17"
          color3="#c2ffdb"
          timeSpeed={1.1}
          colorBalance={0}
          warpStrength={0.95}
          warpFrequency={5.6}
          warpSpeed={1.6}
          warpAmplitude={59}
          blendAngle={32}
          blendSoftness={0.3}
          rotationAmount={480}
          noiseScale={1.4}
          grainAmount={0.04}
          grainScale={0.2}
          grainAnimated={false}
          contrast={1.7}
          gamma={0.75}
          saturation={1.55}
          centerX={0}
          centerY={0}
          zoom={0.85}
        />
        {/* Dark overlay gradients for contrast */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#031c17]/90 via-[#031c17]/50 to-[#031c17]/90 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-[#031c17]/40 pointer-events-none" />
      </div>

      <Navbar dict={dict} lang={locale} />
      <main className="flex-1 relative z-10">
        <Hero dict={dict} />
        <NarrativeTransition dict={dict} />
        <WhyOnweCircuits dict={dict} />
        <MissionVision dict={dict} />
        <BentoMarquee dict={dict} />
        {/* <TeamHologram dict={dict} /> */}
        <ContactSection dict={dict} />
      </main>
      <Footer dict={dict} />
      <ScrollToTop />
    </div>
  );
}
