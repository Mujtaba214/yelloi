"use client";

import { motion } from "framer-motion";
import { FileText, AlertCircle, CheckCircle, Shield, Scale, Globe, Image } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
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
            <FileText className="h-4 w-4" />
            Terms & Conditions
          </div>
          <h1 className="text-4xl font-bold sm:text-5xl text-white">
            Terms & <span className="text-yellow-400">Conditions</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using Yelloi.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {/* Acceptance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-yellow-400" />
              Acceptance of Terms
            </h2>
            <p className="text-gray-400 leading-relaxed">
              By accessing and using Yelloi, you agree to be bound by these 
              Terms & Conditions. If you do not agree with any part of these 
              terms, please do not use our platform.
            </p>
          </motion.div>

          {/* Use of Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Image className="h-5 w-5 text-yellow-400" />
              Use of Content
            </h2>
            <ul className="space-y-2 text-gray-400 list-disc list-inside">
              <li>All images on Yelloi are AI-generated and shared for inspiration</li>
              <li>Images are provided "as is" for personal, non-commercial use</li>
              <li>You may download images for personal reference and inspiration</li>
              <li>Commercial use of images may require additional rights from the creator</li>
              <li>We do not claim ownership of the images displayed on our platform</li>
            </ul>
          </motion.div>

          {/* User Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              User Responsibilities
            </h2>
            <ul className="space-y-2 text-gray-400 list-disc list-inside">
              <li>Use the platform responsibly and respectfully</li>
              <li>Do not misuse or abuse the platform or its content</li>
              <li>Respect copyright and intellectual property rights</li>
              <li>Do not attempt to hack, disrupt, or compromise the platform</li>
              <li>Report any issues or violations to us promptly</li>
            </ul>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-yellow-400" />
              Disclaimer of Warranties
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Yelloi is provided on an "as is" and "as available" basis. We 
              make no warranties, express or implied, about the accuracy, 
              reliability, or availability of the platform. We are not 
              responsible for the content or quality of AI-generated images 
              displayed on our site.
            </p>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-400" />
              Limitation of Liability
            </h2>
            <p className="text-gray-400 leading-relaxed">
              To the fullest extent permitted by law, Yelloi and its operators 
              shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of 
              or inability to use the platform.
            </p>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#0c0c0c] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-yellow-400" />
              Changes to Terms
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right to update these terms at any time. We will 
              notify you of any changes by posting the new terms on this page. 
              Continued use of the platform after changes constitutes your 
              acceptance of the revised terms.
            </p>
          </motion.div>


          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
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