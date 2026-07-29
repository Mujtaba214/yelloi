"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 pt-10  sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center sm:text-left"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Yelloi. All rights reserved.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-6 text-sm"
          >
            <Link
              href="/about"
              className="text-gray-500 hover:text-yellow-400 transition-colors dark:text-gray-400"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-yellow-400 transition-colors dark:text-gray-400"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-yellow-400 transition-colors dark:text-gray-400"
            >
              Terms
            </Link>
          </motion.div>
          
          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
          >
            Made with
            <Heart className="h-4 w-4 text-red-500" />
            for Art lovers
          </motion.div>
        </div>
      </div>
    </footer>
  );
}