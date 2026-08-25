import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const symora = localFont({
  src: "../fonts/symora.otf",
  variable: "--font-symora",
});

export const metadata: Metadata = {
  title: "Onwe - Landing Page",
  description: "Digitaliza tus procesos con Onwe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${symora.variable} ${poppins.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
