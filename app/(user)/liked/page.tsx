"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageCard } from "@/components/gallery/ImageCard";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";
import { SAMPLE_IMAGES } from "@/lib/utils/constants";

export default function LikedPage() {
  const [interactions] = useLocalStorage<Record<string, { liked: boolean }>>('yelloi-interactions', {});
  const [likedImages, setLikedImages] = useState<(typeof SAMPLE_IMAGES)[number][]>([]);

  useEffect(() => {
    const likedIds = Object.entries(interactions)
      .filter(([_, value]) => value.liked)
      .map(([id]) => id);
    
    const images = SAMPLE_IMAGES.filter(img => likedIds.includes(img.id));
    setLikedImages(images);
  }, [interactions]);

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          <Link href="/">
            <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              Liked Images
            </h1>
            <p className="text-gray-500 mt-1">
              {likedImages.length} images you've loved
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        {likedImages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {likedImages.map((image, idx) => (
              <ImageCard key={image.id} image={image} index={idx} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Heart className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
            <h2 className="text-xl font-semibold">No liked images yet</h2>
            <p className="text-gray-500 mt-2">
              Start liking images and they'll appear here
            </p>
            <Link href="/">
              <button className="mt-6 rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 transition-colors">
                Explore Gallery
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}