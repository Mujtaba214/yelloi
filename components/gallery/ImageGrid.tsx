"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageCard } from "./ImageCard";
import { ImageSkeleton } from "./ImageSkeleton";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { ITEMS_PER_PAGE } from "@/lib/utils/constants";
import { ImageType } from "@/types";
import useLocalStorage from "../../hooks/useLocalStorage";

export function ImageGrid() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [interactions, setInteractions] = useLocalStorage(
    "yelloi-interactions",
    {},
  );

  // Load images from Cloudinary API
  const loadImages = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      
      const currentCursor = reset ? undefined : cursor || undefined;
      
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          limit: ITEMS_PER_PAGE,
          cursor: currentCursor,
        }),
      });
      
      const data = await response.json();
      
      if (reset) {
        setImages(data.images);
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

  // Initial load
  useEffect(() => {
    loadImages(true);
  }, []);

  // Load more for infinite scroll
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await loadImages(false);
  }, [hasMore, loading, loadImages]);

  const { loaderRef, loading: scrollLoading } = useInfiniteScroll({ 
    loadMore, 
    hasMore 
  });

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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 px-4 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm border border-yellow-500/20"
          >
            🎨 AI Art Gallery
          </motion.div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl text-white">
            Explore Stunning AI Art
          </h2>
          {/* <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Scroll through {images.length} AI-generated images from our collection
          </p> */}
        </motion.div>

        {/* 🔥 MASONRY GRID - CSS Columns with 10px margin-bottom */}
        <div className="masonry-grid">
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
                  Loading images from Cloudinary...
                </span>
              </div>
            </div>
          )}

          {scrollLoading && images.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
              <span className="text-sm text-gray-500">
                Loading more AI art...
              </span>
            </div>
          )}

          {!hasMore && !loading && images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">✨</div>
              <p className="text-gray-400">
                You've reached the end of our gallery
              </p>
              {/* <p className="text-sm text-gray-500 mt-1">
                Total {images.length} images loaded
              </p> */}
            </motion.div>
          )}
        </div>
      </div>

      {/* 🔥 MASONRY GRID STYLES WITH 10px MARGIN-BOTTOM */}
      <style jsx>{`
        .masonry-grid {
          column-count: 4;
          column-gap: 1.5rem;
        }

        .masonry-grid > div {
          break-inside: avoid;
          margin-bottom: 10px; /* 🔥 10px gap between images */
        }

        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 3;
          }
        }

        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2;
            column-gap: 1rem;
          }
          .masonry-grid > div {
            margin-bottom: 10px;
          }
        }

        @media (max-width: 480px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
    </section>
  );
}