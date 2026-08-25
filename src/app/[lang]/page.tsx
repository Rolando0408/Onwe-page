import { getDictionary, Locale, locales } from '@/lib/dictionaries';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';

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
    <div className="relative min-h-screen bg-[#031c17] text-white flex flex-col selection:bg-[#00ff79] selection:text-black">
      <Navbar dict={dict} lang={locale} />
      <main className="flex-1 flex flex-col">
        <Hero dict={dict} />
      </main>
    </div>
  );
}
