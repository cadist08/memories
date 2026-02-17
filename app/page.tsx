'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, Star, Gift, Video } from 'lucide-react';

// --- KONFIGURASI DATA ---
const DATA = {
  name: "Fana & Nia", 
  startDate: "2024-02-14", 
  // Generate array berisi 19 nama file foto secara otomatis
  // Pastikan di folder public ada: foto1.jpg, foto2.jpg ... sampai foto19.jpg
  gallery: Array.from({ length: 19 }, (_, i) => `/foto${i + 1}.jpeg`),
  
  // Masukkan nama file video kamu di sini (simpan di folder public)
  video: "/video-kita.mp4", 
  
  quiz: [
    { q: "Apa yang paling aku suka?", a: ["Nia", "Seblak", "Es Krim"], correct: 0 },
    { q: "Warna yang paling aku suka<", a: ["Hitam", "Biru", "Putih"], correct: 0 },
    { q: "Apa yang paling aku sayang?<", a: ["gatau", "Upgris", "NIAA"], correct: 2 },
    { q: "Siapa yang ngambekan?<", a: ["Angreani", "NIA", "Latif"], correct: 1 },
    { q: "siapa yang di sayang nia?<", a: ["Gilang", "Nia", "Fana"], correct: 2 },
  ]
};

// --- KOMPONEN BUNGA MEKAR ---
const BloomingFlower = () => {
  const petals = Array.from({ length: 12 });
  return (
    <div className="relative w-64 h-64 flex items-center justify-center mb-8 z-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {petals.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ delay: i * 0.1, duration: 0.8, type: "spring", stiffness: 100 }}
            className="absolute bottom-1/2 left-1/2 w-8 h-24 origin-bottom rounded-full shadow-sm border border-white/20"
            style={{
              rotate: `${i * 30}deg`, 
              x: "-50%",
              background: "linear-gradient(to top, #be185d, #f9a8d4)",
              mixBlendMode: "screen",
            }}
          />
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="absolute w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-300 rounded-full shadow-lg z-10 border-4 border-white/30"
        />
      </motion.div>
      <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full -z-10 animate-pulse" />
    </div>
  );
};

export default function Home() {
  const [days, setDays] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    const diff = Math.floor((new Date().getTime() - new Date(DATA.startDate).getTime()) / (86400000));
    setDays(diff);
  }, []);

  const handleAnswer = (idx: number) => {
    const isCorrect = idx === DATA.quiz[activeQuiz].correct;
    if (isCorrect) {
      setScore(s => s + 1);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 }, colors: ['#f43f5e', '#fb7185'] });
    }
    if (activeQuiz < DATA.quiz.length - 1) {
      setTimeout(() => setActiveQuiz(activeQuiz + 1), 400);
    } else {
      setQuizDone(true);
      if (score + (isCorrect ? 1 : 0) === DATA.quiz.length) {
        setTimeout(() => confetti({ particleCount: 300, spread: 120, origin: { y: 0.6 } }), 500);
      }
    }
  };

  return (
    <main className="min-h-screen font-sans overflow-x-hidden pb-20 selection:bg-rose-200 selection:text-rose-900">
      
      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative">
        <BloomingFlower />

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-3xl max-w-lg w-full relative z-20 shadow-2xl border-t border-white/50"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-4 drop-shadow-sm">
            {DATA.name}
          </h1>
          <p className="text-rose-900/70 text-lg mb-8 italic font-serif">
            "Every love story is beautiful, but ours is my favorite."
          </p>
          
          {/* KODE BARU */}
<div className="inline-block bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm text-rose-600 font-bold border border-rose-200">
  I Love You ❤️
</div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-rose-800/50 text-sm font-bold"
        >
          Scroll ke bawah ↓
        </motion.div>
      </section>

      {/* --- GALLERY SECTION (19 FOTO) --- */}
      <section className="px-6 py-24 bg-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-rose-800 mb-16 flex items-center justify-center gap-3">
            <Camera className="w-8 h-8 text-rose-500" /> Momen Indah ({DATA.gallery.length})
          </h2>
          
          {/* Grid Layout: Responsif dari 2 kolom (HP) ke 3/4 kolom (Laptop) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {DATA.gallery.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                transition={{ duration: 0.5, delay: i * 0.05 }} // Efek muncul berurutan (stagger)
                className="bg-white p-2 md:p-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden rounded-md relative">
                  <img 
                    src={src} 
                    alt={`Kenangan ${i+1}`} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    onError={(e) => {
                        // Fallback jika foto tidak ditemukan
                        (e.target as HTMLImageElement).src = `https://placehold.co/400x400/pink/white?text=Foto+${i+1}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VIDEO SECTION (KHUSUS POTRET/VERTICAL) --- */}
      <section className="px-6 pb-24 pt-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-rose-800 mb-12 flex items-center justify-center gap-3">
            <Video className="w-8 h-8 text-rose-500" /> Video Kita
          </h2>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="glass-card p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50 flex flex-col items-center"
          >
            {/* FRAME HP (Agar video potret terlihat pas) */}
            <div className="relative w-full max-w-[300px] aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20 ring-1 ring-black/5">
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="/thumbnail-video.jpg" // Usahakan thumbnail juga potret
              >
                <source src={DATA.video} type="video/mp4" />
                Browser kamu tidak mendukung pemutaran video.
              </video>
            </div>

            <p className="text-center text-rose-800/60 mt-6 font-serif italic text-sm">
              Putar video untuk melihat kenangan kita 📱
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- QUIZ SECTION --- */}
      <section className="max-w-xl mx-auto px-6 py-32">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="glass-card p-8 md:p-12 rounded-[2rem] text-center shadow-2xl border-t-4 border-rose-400 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-rose-300 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-30"></div>

          <h2 className="text-2xl font-serif font-bold text-rose-800 mb-8 flex items-center justify-center gap-2 relative z-10">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Chemistry Test
          </h2>

          {!quizDone ? (
            <div key={activeQuiz} className="animate-in fade-in zoom-in duration-500 relative z-10">
              <div className="flex justify-between items-center mb-6 text-xs font-bold text-rose-400 tracking-widest uppercase">
                <span>Soal {activeQuiz + 1}</span>
                <span>{DATA.quiz.length} Total</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-snug">
                {DATA.quiz[activeQuiz].q}
              </h3>
              
              <div className="grid gap-3">
                {DATA.quiz[activeQuiz].a.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="group w-full p-4 bg-white/60 hover:bg-rose-500 border border-rose-100 rounded-xl transition-all duration-300 text-left shadow-sm hover:shadow-md flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-white transition-colors">{opt}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-white transition-opacity">➜</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 relative z-10 animate-in zoom-in duration-500">
              <Gift className="w-20 h-20 mx-auto text-rose-500 mb-6 animate-bounce" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Quiz Selesai!</h3>
              <div className="text-6xl font-serif font-bold text-rose-600 my-4">{score}/{DATA.quiz.length}</div>
              <p className="text-gray-600 mb-8">
                {score === DATA.quiz.length 
                  ? "Sempurna! Kamu emang belahan jiwaku! ❤️" 
                  : "Lumayan lah, tapi harus lebih peka lagi ya! 😜"}
              </p>
              <button 
                onClick={() => {
                  setQuizDone(false);
                  setScore(0);
                  setActiveQuiz(0);
                }}
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-rose-500/30 transform hover:-translate-y-1 transition-all"
              >
                Coba Lagi
              </button>
            </div>
          )}
        </motion.div>
      </section>

      <footer className="text-center pb-8 pt-12 text-rose-800/40 text-sm font-medium">
        Dibuat dengan segenap 💖 oleh {DATA.name.split(' ')[0]}
      </footer>
    </main>
  );
}