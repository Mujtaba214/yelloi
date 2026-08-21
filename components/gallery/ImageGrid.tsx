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
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [interactions, setInteractions] = useLocalStorage(
    "yelloi-interactions",
    {},
  );
  
  // 🔥 Refs to prevent multiple triggers
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInitialLoadDone = useRef(false);

  // 🔥 Load images with pagination
  const loadImages = useCallback(async (reset: boolean = false) => {
    // 🔥 Prevent multiple simultaneous loads
    if (isLoadingRef.current) return;
    
    try {
      isLoadingRef.current = true;
      setLoading(true);
      
      const currentPage = reset ? 1 : page;
      
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: currentPage,
          pageSize: 30,
        }),
      });
      
      const data = await response.json();
      
      if (reset) {
        setImages(data.images);
        setTotalImages(data.total || 0);
        setPage(2);
        isInitialLoadDone.current = true;
      } else {
        setImages(prev => [...prev, ...data.images]);
        setPage(prev => prev + 1);
      }
      
      const hasMoreData = data.hasMore || false;
      setHasMore(hasMoreData);
      hasMoreRef.current = hasMoreData;
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [page]);

  // 🔥 Initial load - only once
  useEffect(() => {
    if (!isInitialLoadDone.current) {
      loadImages(true);
    }
  }, []);

  // 🔥 Load more when scrolling - with proper cleanup
  const loadMore = useCallback(async () => {
    // 🔥 Check conditions before loading
    if (isLoadingRef.current || !hasMoreRef.current || !hasMore) {
      return;
    }
    await loadImages(false);
  }, [hasMore, loadImages]);

  // 🔥 Setup Intersection Observer - with cleanup
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // 🔥 Don't set up observer if no more images or currently loading
    if (!loaderRef.current || !hasMoreRef.current || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // 🔥 Only trigger when loader becomes visible and conditions are met
        if (entries[0].isIntersecting && hasMoreRef.current && !isLoadingRef.current) {
          console.log('📦 Loading more images...');
          loadMore();
        }
      },
      { 
        rootMargin: "200px",
        threshold: 0.1
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 px-4 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm border border-yellow-500/20"
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

        <div className="flex justify-center py-12">
          {loading && images.length === 0 && (
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
              <p className="text-gray-400">All {totalImages} images loaded</p>
            </motion.div>
          )}
        </div>

        {/* 🔥 Loader trigger - only show if hasMore */}
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