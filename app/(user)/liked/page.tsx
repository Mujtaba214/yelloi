"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageCard } from "@/components/gallery/ImageCard";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ImageType } from "@/types";

export default function LikedPage() {
  const [interactions] = useLocalStorage<Record<string, { liked: boolean }>>(
    'yelloi-interactions', 
    {}
  );
  const [likedImages, setLikedImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all images and filter liked ones
  useEffect(() => {
    const fetchLikedImages = async () => {
      try {
        setLoading(true);
        
        // Get all image IDs that are liked
        const likedIds = Object.entries(interactions)
          .filter(([_, value]) => value.liked)
          .map(([id]) => id);

        if (likedIds.length === 0) {
          setLikedImages([]);
          setLoading(false);
          return;
        }

        // Fetch images from Cloudinary API
        const response = await fetch('/api/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            limit: 500, // Get enough images to cover likes
            cursor: undefined,
          }),
        });

        const data = await response.json();
        
        // Filter only liked images
        const filtered = data.images.filter((img: ImageType) => 
          likedIds.includes(img.id)
        );
        
        setLikedImages(filtered);
      } catch (error) {
        console.error('Error fetching liked images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedImages();
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
              <p className="text-sm text-gray-500">Loading your liked images...</p>
            </div>
          </div>
        )}

        {/* Grid */}
        {!loading && likedImages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {likedImages.map((image, idx) => (
              <ImageCard 
                key={image.id} 
                image={image} 
                index={idx}
                onLike={() => {}} 
                onDownload={() => {}}
              />
            ))}
          </div>
        ) : !loading && likedImages.length === 0 ? (
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
              <button className="mt-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 text-black font-medium hover:from-yellow-500 hover:to-yellow-600 transition-colors">
                Explore Gallery
              </button>
            </Link>
          </motion.div>
        ) : null}
      </div>
    </main>
  );
}