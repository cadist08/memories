import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";

// Load Font
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-playfair',
  display: 'swap',
});

const nunito = Nunito({ 
  subsets: ["latin"], 
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kisah Kita",
  description: "Sebuah halaman kecil untukmu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${playfair.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}