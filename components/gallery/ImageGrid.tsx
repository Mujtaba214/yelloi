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
  const [totalImages, setTotalImages] = useState(0);
  const [interactions, setInteractions] = useLocalStorage(
    "yelloi-interactions",
    {},
  );

  // 🔥 Load ALL images at once
  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      
      const data = await response.json();
      
      setImages(data.images || []);
      setTotalImages(data.total || 0);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadImages();
  }, []);

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
    <section className="px-4 py-8 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-yellow-400/20 to-yellow-600/20 px-4 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm border border-yellow-500/20"
          >
            🎨 AI Art Gallery
          </motion.div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl text-white">
            Explore Stunning AI Art
          </h2>
          {/* {totalImages > 0 && (
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              {totalImages} AI-generated images from our collection
            </p>
          )} */}
        </motion.div>

        {/* 🔥 Masonry Grid - ALL images displayed at once */}
        <div className="masonry-grid">
          {images.map((image, idx) => (
            <ImageCard
              key={`${image.id}-${idx}`}
              image={image}
              index={idx}
              onLike={handleLike}
              onDownload={handleDownload}
              onViewTracked={handleViewTracked}
            />
          ))}
        </div>

        {/* Loading State */}
        <div className="flex justify-center py-12">
          {/* {loading && (
            <div className="flex flex-col items-center gap-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          )} */}

          {/* {!loading && images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">✨</div>
              <p className="text-gray-400">
                All {totalImages} images loaded
              </p>
            </motion.div>
          )} */}
        </div>
      </div>

      <style jsx>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 0.75rem;
        }
        .masonry-grid > div {
          break-inside: avoid;
          margin-bottom: 0.75rem;
        }
        @media (min-width: 640px) {
          .masonry-grid {
            column-count: 3;
            column-gap: 1rem;
          }
          .masonry-grid > div {
            margin-bottom: 1rem;
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 4;
            column-gap: 1.25rem;
          }
          .masonry-grid > div {
            margin-bottom: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}