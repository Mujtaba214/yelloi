"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Download, Scroll, Shield, ArrowRight } from "lucide-react";
import UserPage from "./(user)/page"; 
export default function AgeGate() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem('yelloi_age_verified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  const handleEnter = () => {
    setIsLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('yelloi_age_verified', 'true');
      setIsVerified(true);
      setIsLoading(false);
    }, 800);
  };

  if (isVerified) {
    return <UserPage />;
  }

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-[700px] h-[700px] left-1/2 top-[-300px] -translate-x-1/2"
          style={{
            background: "radial-gradient(circle, rgba(255,216,77,0.15), transparent 70%)",
          }}
        />
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-yellow-400/30"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0.2 + Math.random() * 0.5,
              scale: 0.5 + Math.random() * 1,
            }}
            animate={{
              y: [null, -100, null],
              opacity: [null, 0, null],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-5xl mb-3"
          >
            ✦
          </motion.div>
          <h1 className="text-5xl font-bold tracking-[0.15em] text-white">
            YELL<span className="text-yellow-400">O</span>I
          </h1>
          <p className="text-xs text-yellow-400/60 mt-2 tracking-widest uppercase">
            Visual Discovery
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8 shadow-2xl"
        >
          {/* 18+ Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-xs font-bold text-white bg-red-500/20 border border-red-500/30 rounded-full">
              18+
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-400">Adults Only</span>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              Welcome to Yelloi <span className="text-yellow-400">🥰</span>
            </p>
            <p className="text-gray-400 text-xs leading-relaxed mt-2">
              This site contains AI images that may be considered 
              <span className="text-yellow-400/80"> 18+</span> or 
              <span className="text-yellow-400/80"> vector-themed</span>.
            </p>
          </div>

          {/* Confirmation */}
          <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 mb-6 border border-[rgba(255,255,255,0.05)]">
            <p className="text-center text-xs text-gray-400">
              By entering, you confirm you are 
              <span className="text-yellow-400 font-semibold"> 18 or older</span>.
            </p>
          </div>

          {/* How to Use */}
          <div className="mb-8">
            <p className="text-xs text-gray-500 text-center mb-3 uppercase tracking-wider">
              How to use:
            </p>
            <div className="flex justify-center items-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                  <Scroll className="h-4 w-4 text-yellow-400" />
                </div>
                <span className="text-[10px] text-gray-500">Scroll</span>
              </div>
              <div className="text-gray-600">→</div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                  <Heart className="h-4 w-4 text-red-400" />
                </div>
                <span className="text-[10px] text-gray-500">Like</span>
              </div>
              <div className="text-gray-600">→</div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                  <Download className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-[10px] text-gray-500">Download</span>
              </div>
            </div>
          </div>

          {/* Enter Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEnter}
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-transparent" />
            ) : (
              <>
                I Am 18+ • Enter
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>

          {/* Footer */}
          <p className="text-[10px] text-gray-600 text-center mt-4">
            Fast. Simple. Endless. ✦
          </p>
        </motion.div>

        {/* Animated Pulse Ring */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -z-10 rounded-full border border-yellow-400/10"
          style={{
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>
    </main>
  );
}