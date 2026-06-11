"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ImageActions } from "./ImageActions";
import { ImageType } from "@/types";

interface ImageCardProps {
  image: ImageType;
  index: number;
  onLike?: (imageId: string, liked: boolean) => void;
  onDownload?: (imageId: string) => void;
}

export function ImageCard({ image, index, onLike, onDownload }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 20) * 0.02 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
        )}
        
        <Image
          src={image.url}
          alt={image.prompt || `AI image ${image.id}`}
          fill
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={index < 4}
        />

        {/* Gradient Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        />

        {/* Image Info - Bottom */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          {/* Prompt Preview (if exists) */}
          {image.prompt && (
            <p className="mb-2 line-clamp-2 text-xs text-white/80">
              {image.prompt.substring(0, 80)}...
            </p>
          )}
          
          {/* Action Buttons */}
          <ImageActions
            imageId={image.id}
            initialLikes={image.likes}
            onLike={(liked) => onLike?.(image.id, liked)}
            onDownload={() => onDownload?.(image.id)}
            isHovered={isHovered}
          />
        </motion.div>

        {/* Stats Badge - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
          className="absolute top-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm"
        >
          👁️ {image.views.toLocaleString()}
        </motion.div>
      </div>
    </motion.div>
  );
}