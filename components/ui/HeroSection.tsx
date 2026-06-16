"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { YellowStars } from "./YellowStars";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black">
      {/* Yellow Starfield Background */}
      <YellowStars />
      
      {/* Subtle gradient overlay for depth - matching header */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-black/0 to-black/80" />
      
      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="logo font-bold tracking-tight text-white"
          style={{
            fontSize: "clamp(4rem, 15vw, 8rem)",
            fontFamily: "inherit",
          }}
        >
          YELL
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="text-yellow-400 inline-block"
            style={{
              textShadow: "0 0 40px rgba(234, 179, 8, 0.3), 0 0 80px rgba(234, 179, 8, 0.1)",
            }}
          >
            O
          </motion.span>
          I
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 max-w-2xl"
        >
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Explore Stunning AI Art
          </h2>
          <p className="mt-3 text-sm text-gray-400 sm:text-base">
            Scroll through thousands of AI-generated images. Like your favorites and download for inspiration.
          </p>
        </motion.div>

        {/* Animated loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex items-center gap-2 text-xs text-gray-500"
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Discovering more visuals
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            .
          </motion.span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="h-5 w-5 rotate-90 text-yellow-400/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}