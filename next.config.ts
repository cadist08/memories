import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Wajib untuk GitHub Pages agar menghasilkan folder 'out'
  
  // Ganti '/love-story' dengan '/' + nama repository kamu di GitHub
  // Contoh: Jika repo-mu namanya 'kado-nia', tulis '/kado-nia'
  basePath: '/memories', 
  
  images: {
    unoptimized: true, // Karena GitHub Pages tidak mendukung fitur optimasi gambar otomatis Next.js
  },
};

export default nextConfig;