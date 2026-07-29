"use client";

import { motion } from "framer-motion";
import { Sparkles, Image, Zap, Users, Heart, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-[#050505]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 px-4 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm border border-yellow-500/20 mb-4">
            <Sparkles className="h-4 w-4" />
            About Yelloi
          </div>
          <h1 className="text-4xl font-bold sm:text-5xl text-white">
            YELL<span className="text-yellow-400">O</span>I
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Discover, explore, and get inspired by thousands of AI-generated images.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Our Mission
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Yelloi is a visual discovery platform dedicated to showcasing the 
              best AI-generated art from around the world. Our mission is to 
              make AI art accessible, inspiring, and easy to explore for everyone 
              — from casual browsers to professional creators.
            </p>
          </motion.div>

          {/* What We Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Image className="h-5 w-5 text-yellow-400" />
              What We Offer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Image,
                  title: "AI Art Gallery",
                  desc: "Thousands of AI-generated images from models like Midjourney, DALL-E, Flux, and more.",
                },
                {
                  icon: Zap,
                  title: "Visual Discovery",
                  desc: "Scroll infinitely through stunning visuals and find inspiration for your next project.",
                },
                {
                  icon: Heart,
                  title: "Save Favorites",
                  desc: "Like and save images you love to build your own personal collection.",
                },
                {
                  icon: Shield,
                  title: "Free Access",
                  desc: "Completely free to browse, explore, and download inspiration for your creative work.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 border border-[rgba(255,255,255,0.05)]"
                >
                  <item.icon className="h-5 w-5 text-yellow-400 mb-2" />
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-yellow-400" />
              By the Numbers
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: "AI Images", value: "30,000+" },
                { label: "Daily Updates", value: "100+" },
                { label: "Models Supported", value: "15+" },
                { label: "Free Access", value: "100%" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4">
                  <p className="text-2xl font-bold text-yellow-400">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
            >
              ← Back to Gallery
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}