import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meeti - Next",
  description: "Proyecto Meeti Next.js con DrizzleORM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full bg-white">
      <body className={`${outfit.variable} antialiased`}>
        {children}
        <Toaster
        position="top-right"//Para que se coloque hasta arriba 
        />
      </body>
    </html>
  );
}