import { getDictionary } from '@/lib/dictionaries';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';

export default async function RootPage() {
  const dict = await getDictionary('es');

  return (
    <div className="relative min-h-screen bg-[#031c17] text-white flex flex-col selection:bg-[#00ff79] selection:text-black">
      <Navbar dict={dict} lang="es" />
      <main className="flex-1 flex flex-col">
        <Hero dict={dict} />
      </main>
    </div>
  );
}
