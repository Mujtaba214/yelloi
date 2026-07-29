"use client";

import { Footer } from "@/components/ui/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Mail, Cookie } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
            <Shield className="h-4 w-4" />
            Privacy Policy
          </div>
          <h1 className="text-4xl font-bold sm:text-5xl text-white">
            Privacy <span className="text-yellow-400">Policy</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            How we protect and handle your data at Yelloi.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <p className="text-gray-400 leading-relaxed">
              At Yelloi, we take your privacy seriously. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information 
              when you visit our website. Please read this policy carefully.
            </p>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-yellow-400" />
              Information We Collect
            </h2>
            <ul className="space-y-3 text-gray-400">
              {[
                {
                  icon: Eye,
                  text: "Usage Data: Pages visited, images viewed, time spent on site."
                },
                {
                  icon: Cookie,
                  text: "Cookies: We use local storage to remember your preferences and liked images."
                },
                {
                  icon: Mail,
                  text: "Contact Information: If you contact us, we may store your email and message."
                },
                {
                  icon: Lock,
                  text: "Device Information: Browser type, operating system, and device type for analytics."
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <item.icon className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* How We Use Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-yellow-400" />
              How We Use Your Data
            </h2>
            <ul className="space-y-2 text-gray-400 list-disc list-inside">
              <li>To improve and personalize your browsing experience</li>
              <li>To track engagement and popular images in our gallery</li>
              <li>To remember your liked images and preferences</li>
              <li>To analyze usage patterns and optimize our platform</li>
              <li>To respond to your inquiries and support requests</li>
            </ul>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-yellow-400" />
              Data Security
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We implement appropriate technical and organizational measures to 
              protect your data. However, no method of transmission over the 
              internet is 100% secure. While we strive to protect your information, 
              we cannot guarantee its absolute security.
            </p>
          </motion.div>

          {/* Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-yellow-400" />
              Cookies & Local Storage
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Yelloi uses local storage (not traditional cookies) to remember 
              your liked images and preferences. This data stays on your device 
              and is not shared with third parties. You can clear this data at 
              any time through your browser settings.
            </p>
          </motion.div>

          {/* Contact */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-yellow-400" />
              Contact Us
            </h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please 
              reach out to us at:{' '}
              <a 
                href="mailto:privacy@yelloi.com" 
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                privacy@yelloi.com
              </a>
            </p>
          </motion.div> */}

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-4 pb-12"
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
      <Footer />
    </main>
  );
}