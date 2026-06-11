"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ImageCard } from "./ImageCard";
import { ImageSkeleton } from "./ImageSkeleton";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { SAMPLE_IMAGES, ITEMS_PER_PAGE } from "@/lib/utils/constants";
import { ImageType } from "@/types";
import useLocalStorage from "../../hooks/useLocalStorage";

export function ImageGrid() {
  const [images, setImages] = useState<ImageType[]>(SAMPLE_IMAGES.slice(0, ITEMS_PER_PAGE));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [interactions, setInteractions] = useLocalStorage('yelloi-interactions', {});

  const loadMore = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newImages = SAMPLE_IMAGES.slice(start, end);
    
    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  }, [page]);

  const { loaderRef, loading } = useInfiniteScroll({ loadMore, hasMore });

  const handleLike = (imageId: string, liked: boolean) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, likes: liked ? img.likes + 1 : img.likes - 1 }
        : img
    ));
  };

  const handleDownload = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, downloads: img.downloads + 1 }
        : img
    ));
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-medium text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-400"
          >
            🎨 AI Art Gallery
          </motion.div>
          
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Explore Stunning AI Art
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Scroll through thousands of AI-generated images. Like your favorites and download for inspiration.
          </p>
        </motion.div>

        {/* Image Grid - Responsive: 1 (mobile) → 4 (desktop) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, idx) => (
            <ImageCard
              key={`${image.id}-${idx}`}
              image={image}
              index={idx}
              onLike={handleLike}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Loading & End States */}
        <div ref={loaderRef} className="flex justify-center py-12">
          {loading && (
            <div className="flex flex-col items-center gap-3">
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <ImageSkeleton key={i} />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                <span className="text-sm text-gray-500">Loading more AI art...</span>
              </div>
            </div>
          )}
          
          {!hasMore && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">✨</div>
              <p className="text-gray-400">You've reached the end of our gallery</p>
              <p className="text-sm text-gray-500 mt-1">Check back daily for new AI art!</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}