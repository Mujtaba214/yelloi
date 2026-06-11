"use client";

import { motion } from "framer-motion";
import { Sparkles, Image, Zap, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-24 lg:py-32">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/20 dark:via-black dark:to-pink-950/20" />
      
      {/* Animated Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300/20 dark:bg-purple-500/10 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-pink-300/20 dark:bg-pink-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Discover AI Art
            <Zap className="h-4 w-4 text-yellow-500" />
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Yelloi
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400 sm:text-xl"
        >
          Discover thousands of stunning AI-generated images. Get inspired by the best prompts for Midjourney, Flux, DALL-E, and more.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-12 flex max-w-md flex-wrap justify-center gap-8"
        >
          {[
            { label: "AI Images", value: "30,000+", icon: Image },
            { label: "Daily Updates", value: "100+", icon: Sparkles },
            { label: "Free Access", value: "100%", icon: Zap },
          ].map((stat, idx) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-2 h-6 w-6 text-purple-500" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform lg:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="h-6 w-6 rotate-90 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}