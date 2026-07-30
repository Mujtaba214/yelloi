"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageCard } from "./ImageCard";
import { ImageSkeleton } from "./ImageSkeleton";
import { ImageType } from "@/types";
import useLocalStorage from "../../hooks/useLocalStorage";

export function ImageGrid() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [totalImages, setTotalImages] = useState(0);
  const [interactions, setInteractions] = useLocalStorage(
    "yelloi-interactions",
    {},
  );

  const loadImages = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      
      const currentCursor = reset ? undefined : cursor;
      
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          limit: 20,
          cursor: currentCursor,
        }),
      });
      
      const data = await response.json();
      
      if (reset) {
        setImages(data.images);
        setTotalImages(data.total || 0);
      } else {
        setImages(prev => [...prev, ...data.images]);
      }
      
      setCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  }, [cursor]);

  useEffect(() => {
    loadImages(true);
  }, []);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await loadImages(false);
  }, [hasMore, loading, loadImages]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    const loaderElement = document.getElementById('loader-trigger');
    if (loaderElement) {
      observer.observe(loaderElement);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  const handleLike = (imageId: string, liked: boolean) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, likes: liked ? img.likes + 1 : img.likes - 1 }
          : img,
      ),
    );
  };

  const handleDownload = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, downloads: img.downloads + 1 } : img,
      ),
    );
  };

  const handleViewTracked = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, views: (img.views || 0) + 1 }
          : img,
      ),
    );
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
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
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-yellow-400/20 to-yellow-600/20 px-4 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm border border-yellow-500/20"
          >
            🎨 AI Art Gallery
          </motion.div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl text-white">
            Explore Stunning AI Art
          </h2>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, idx) => (
            <ImageCard
              key={`${image.id}-${idx}`}
              image={image}
              index={idx}
              onLike={handleLike}
              onDownload={handleDownload}
              onViewTracked={handleViewTracked} // 🔥 Pass view tracking handler
            />
          ))}
        </div>

        {/* Loading & End States */}
        <div className="flex justify-center py-12">
          {loading && images.length === 0 && (
            <div className="flex flex-col items-center gap-3">
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <ImageSkeleton key={i} />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
                <span className="text-sm text-gray-500">
                  Loading images...
                </span>
              </div>
            </div>
          )}

          {loading && images.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
              <span className="text-sm text-gray-500">Loading more...</span>
            </div>
          )}

          {!hasMore && !loading && images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">✨</div>
              <p className="text-gray-400">You've reached the end of our gallery</p>
              <p className="text-sm text-gray-500 mt-1">
                Total {totalImages} images loaded
              </p>
            </motion.div>
          )}
        </div>

        {/* 🔥 Invisible trigger for infinite scroll */}
        <div id="loader-trigger" className="h-1" />
      </div>
    </section>
  );
}