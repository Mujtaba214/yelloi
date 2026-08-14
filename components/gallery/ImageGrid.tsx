"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
  
  // 🔥 Add refs to prevent multiple triggers
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadImages = useCallback(async (reset: boolean = false) => {
    // 🔥 Prevent multiple simultaneous loads
    if (isLoadingRef.current) return;
    
    try {
      isLoadingRef.current = true;
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
      const hasMoreData = !!data.nextCursor;
      setHasMore(hasMoreData);
      hasMoreRef.current = hasMoreData;
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [cursor]);

  // Initial load
  useEffect(() => {
    loadImages(true);
  }, []);

  // 🔥 Load more with debounce
  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMoreRef.current) return;
    await loadImages(false);
  }, [loadImages]);

  // 🔥 Setup Intersection Observer with proper cleanup
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!loaderRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 🔥 Only trigger once when loader becomes visible
        if (entries[0].isIntersecting && hasMoreRef.current && !isLoadingRef.current) {
          console.log('📦 Loading more images...');
          loadMore();
        }
      },
      { 
        rootMargin: "200px",
        threshold: 0.1 // 🔥 Lower threshold for smoother loading
      }
    );

    observer.observe(loaderRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
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
        </motion.div>

        {/* 🔥 MASONRY GRID */}
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

        {/* 🔥 Loading & End States */}
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

          {/* {!hasMore && !loading && images.length > 0 && (
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
          )} */}
        </div>

        {/* {hasMore && (
          <div 
            ref={loaderRef} 
            className="h-4 w-full flex items-center justify-center"
            style={{ minHeight: '20px' }}
          >
            <span className="text-xs text-gray-600">Loading more...</span>
          </div>
        )} */}
      </div>

      <style jsx>{`
        .masonry-grid {
          column-count: 4;
          column-gap: 1.5rem;
        }

        .masonry-grid > div {
          break-inside: avoid;
          margin-bottom: 1rem;
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
            margin-bottom: 0.75rem;
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