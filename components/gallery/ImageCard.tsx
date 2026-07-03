"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ImageActions } from "./ImageActions";
import { ImageType } from "@/types";
import { trackImageView } from "@/lib/analytics/tracking";

interface ImageCardProps {
  image: ImageType;
  index: number;
  onLike?: (imageId: string, liked: boolean) => void;
  onDislike?: (imageId: string, disliked: boolean) => void;
  onDownload?: (imageId: string) => void;
  onClick?: () => void;
}

export function ImageCard({ 
  image, 
  index, 
  onLike, 
  onDislike, 
  onDownload,
  onClick 
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track image view when visible
  useEffect(() => {
    if (!cardRef.current || hasTrackedView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView) {
            console.log('👁️ Image visible, tracking view:', image.id);
            trackImageView(image.id);
            setHasTrackedView(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, [image.id, hasTrackedView]);

  // Auto-hide actions after 3 seconds on mobile
  useEffect(() => {
    if (showActions) {
      const timer = setTimeout(() => setShowActions(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showActions]);

  const handleTap = () => {
    if (isMobile) {
      setShowActions(!showActions);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 20) * 0.02 }}
      whileHover={!isMobile ? { y: -4 } : {}}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={() => {
        handleTap();
        if (onClick) onClick();
      }}
      className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      style={{ marginBottom: '10px' }} // 🔥 Applied directly to the card!
    >
      {/* Image Container - FULL WIDTH, NATURAL HEIGHT */}
      <div className="relative w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
        )}
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={image.prompt || `AI image ${image.id}`}
          className={`w-full h-auto transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${!isMobile && isHovered ? 'scale-105' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          loading={index < 4 ? 'eager' : 'lazy'}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
        />

        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: (isMobile && showActions) || (!isMobile && isHovered) ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
        />

        {/* Actions Container */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 pointer-events-none">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: ((!isMobile && isHovered) || (isMobile && showActions)) ? 0 : 20,
              opacity: ((!isMobile && isHovered) || (isMobile && showActions)) ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto"
          >
            {/* Prompt Preview
            {image.prompt && (
              <p className="mb-2 line-clamp-2 text-[10px] sm:text-xs text-white/80">
                {image.prompt.substring(0, 60)}...
              </p>
            )} */}
            
            {/* Action Buttons */}
            <ImageActions
              imageId={image.id}
              imageUrl={image.url}
              initialLikes={image.likes}
              onLike={(liked) => onLike?.(image.id, liked)}
              onDislike={(disliked) => onDislike?.(image.id, disliked)}
              onDownload={() => onDownload?.(image.id)}
              isMobile={isMobile}
            />
          </motion.div>

          {/* Mobile Hint */}
          {isMobile && !showActions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center pointer-events-auto"
            >
              <div className="rounded-full bg-black/50 px-3 py-1 text-[10px] text-white backdrop-blur-sm">
                👆 Tap for actions
              </div>
            </motion.div>
          )}
        </div>

        {/* Stats Badge */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ 
            opacity: (isMobile || isHovered) ? 1 : 0,
            x: (isMobile || isHovered) ? 0 : 10
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs text-white backdrop-blur-sm pointer-events-none"
        >
          👁️ {image.views?.toLocaleString() || 0}
        </motion.div>
      </div>
    </motion.div>
  );
}