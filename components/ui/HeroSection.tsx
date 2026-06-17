"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-[#050505] px-5 overflow-hidden">
      {/* Background Glow - from HTML */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-[700px] h-[700px] left-1/2 top-[-300px] -translate-x-1/2"
          style={{
            background: "radial-gradient(circle, rgba(255,216,77,0.15), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#ffd84d] text-[28px] inline-block mb-3"
          style={{
            animation: "float 4s ease-in-out infinite",
            textShadow: "0 0 20px rgba(255,216,77,0.8), 0 0 40px rgba(255,216,77,0.4)",
          }}
        >
          ✦
        </motion.div>

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[56px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-extrabold tracking-[0.3em] text-white leading-[1.1]"
        >
          YELL<span className="text-[#ffd84d]">O</span>I
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-[#8a8a8a] text-sm sm:text-base tracking-[0.3em] uppercase font-light"
        >
          VISUAL DISCOVERY
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}