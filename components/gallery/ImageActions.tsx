"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ThumbsDown, Download, Check, Share2 } from "lucide-react";
import useLocalStorage from "../../hooks/useLocalStorage";

interface ImageActionsProps {
  imageId: string;
  initialLikes: number;
  onLike?: (liked: boolean) => void;
  onDislike?: (disliked: boolean) => void;
  onDownload?: () => void;
  isHovered?: boolean;
}

export function ImageActions({ 
  imageId, 
  initialLikes, 
  onLike, 
  onDislike, 
  onDownload,
  isHovered 
}: ImageActionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [interactions, setInteractions] = useLocalStorage<Record<string, { liked: boolean; disliked: boolean }>>(
    'yelloi-interactions',
    {}
  );
  
  const userInteraction = interactions[imageId];
  const isLiked = userInteraction?.liked || false;
  const isDisliked = userInteraction?.disliked || false;
  const [showCheck, setShowCheck] = useState(false);

  const handleLike = () => {
    const newLiked = !isLiked;
    const newDisliked = false;
    
    setInteractions(prev => ({
      ...prev,
      [imageId]: { liked: newLiked, disliked: newDisliked }
    }));
    
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.(newLiked);
    
    if (newLiked) {
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1000);
    }
  };

  const handleDislike = () => {
    const newDisliked = !isDisliked;
    const newLiked = false;
    
    setInteractions(prev => ({
      ...prev,
      [imageId]: { liked: newLiked, disliked: newDisliked }
    }));
    
    if (isLiked) {
      setLikes(prev => prev - 1);
    }
    onDislike?.(newDisliked);
  };

  const handleDownload = async () => {
    onDownload?.();
    
    // Animate button
    setShowCheck(true);
    setTimeout(() => setShowCheck(false), 1000);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleLike}
          className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
            isLiked
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : 'bg-black/50 text-white backdrop-blur-sm hover:bg-red-500/80'
          }`}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-white' : ''}`} />
          </motion.div>
          <span className="hidden sm:inline">{likes}</span>
        </motion.button>

        {/* Dislike Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleDislike}
          className={`rounded-full p-1.5 transition-all ${
            isDisliked
              ? 'bg-blue-500 text-white'
              : 'bg-black/50 text-white backdrop-blur-sm hover:bg-blue-500/80'
          }`}
        >
          <ThumbsDown className={`h-3.5 w-3.5 ${isDisliked ? 'fill-white' : ''}`} />
        </motion.button>

        {/* Download Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleDownload}
          className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-green-500/80"
        >
          <Download className="h-3.5 w-3.5" />
        </motion.button>

        {/* Share Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-purple-500/80"
        >
          <Share2 className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Success Checkmark Animation */}
      <AnimatePresence>
        {showCheck && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-2 py-1 text-xs text-white shadow-lg"
          >
            <Check className="inline h-3 w-3 mr-1" />
            {isLiked ? 'Liked!' : 'Downloaded!'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}