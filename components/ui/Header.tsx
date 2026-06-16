"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl tracking-wider font-bold text-white">
              YELL<span className="text-yellow-400">O</span>I
            </span>
          </motion.div>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}