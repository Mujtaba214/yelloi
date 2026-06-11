"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ThumbsDown, Download, Check, Share2 } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";

interface ImageActionsProps {
  imageId: string;
  imageUrl?: string;  // Add this prop
  initialLikes: number;
  onLike?: (liked: boolean) => void;
  onDislike?: (disliked: boolean) => void;
  onDownload?: () => void;
  isMobile?: boolean;
}

export function ImageActions({ 
  imageId, 
  imageUrl,
  initialLikes, 
  onLike, 
  onDislike, 
  onDownload,
  isMobile = false
}: ImageActionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [showCheck, setShowCheck] = useState(false);
  const [checkMessage, setCheckMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [interactions, setInteractions] = useLocalStorage<Record<string, { liked: boolean; disliked: boolean }>>(
    'yelloi-interactions',
    {}
  );
  
  const userInteraction = interactions[imageId];
  const isLiked = userInteraction?.liked || false;
  const isDisliked = userInteraction?.disliked || false;

  const handleLike = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    
    const newLiked = !isLiked;
    const newDisliked = false;
    
    setInteractions(prev => ({
      ...prev,
      [imageId]: { liked: newLiked, disliked: newDisliked }
    }));
    
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.(newLiked);
    
    if (newLiked) {
      setCheckMessage('Liked! ❤️');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    }
  };

  const handleDislike = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    
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
    
    if (newDisliked) {
      setCheckMessage('Noted 👎');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    }
  };

  // Actual download function
  const downloadImage = async (url: string, filename: string) => {
    try {
      setIsDownloading(true);
      
      // Method 1: Using fetch + blob (works for cross-origin images)
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create anchor element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL
      window.URL.revokeObjectURL(blobUrl);
      
      setCheckMessage('Downloaded! 📥');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
      
      onDownload?.();
      
    } catch (error) {
      console.error('Download failed:', error);
      
      // Fallback: Open in new tab
      window.open(url, '_blank');
      setCheckMessage('Opening in new tab 🔗');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownload = async (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    
    if (!imageUrl) {
      console.error('No image URL provided');
      setCheckMessage('Error downloading ❌');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
      return;
    }
    
    // Generate filename from image ID and timestamp
    const filename = `yelloi-${imageId}-${Date.now()}.jpg`;
    
    await downloadImage(imageUrl, filename);
  };

  const handleShare = async (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    
    const shareData = {
      title: 'Yelloi - AI Art',
      text: 'Check out this amazing AI-generated image!',
      url: window.location.href,
    };
    
    if (navigator.share && isMobile) {
      try {
        await navigator.share(shareData);
        setCheckMessage('Shared! ✨');
        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1500);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setCheckMessage('Link copied! 🔗');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    }
  };

  // Larger touch targets for mobile
  const buttonSize = isMobile ? 'p-2.5' : 'p-1.5';
  const iconSize = isMobile ? 'h-5 w-5' : 'h-3.5 w-3.5';

  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-1">
        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          onClick={handleLike}
          disabled={isDownloading}
          className={`relative flex items-center gap-1.5 rounded-full px-3 sm:px-3 py-1.5 sm:py-1.5 text-sm font-medium transition-all touch-manipulation ${
            isLiked
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : 'bg-black/50 text-white backdrop-blur-sm active:bg-red-500/80'
          }`}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`${iconSize} ${isLiked ? 'fill-white' : ''}`} />
          </motion.div>
          <span className="hidden sm:inline text-sm">{likes}</span>
          <span className="sm:hidden text-xs ml-0.5">{likes}</span>
        </motion.button>

        {/* Dislike Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          onClick={handleDislike}
          disabled={isDownloading}
          className={`rounded-full ${buttonSize} transition-all touch-manipulation ${
            isDisliked
              ? 'bg-blue-500 text-white'
              : 'bg-black/50 text-white backdrop-blur-sm active:bg-blue-500/80'
          }`}
        >
          <ThumbsDown className={`${iconSize} ${isDisliked ? 'fill-white' : ''}`} />
        </motion.button>

        {/* Download Button - Now with loading state */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          onClick={handleDownload}
          disabled={isDownloading}
          className={`rounded-full ${buttonSize} bg-black/50 text-white backdrop-blur-sm transition-all active:bg-green-500/80 touch-manipulation ${
            isDownloading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isDownloading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Download className={iconSize} />
          )}
        </motion.button>

        {/* Share Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          onClick={handleShare}
          className={`rounded-full ${buttonSize} bg-black/50 text-white backdrop-blur-sm transition-all active:bg-purple-500/80 touch-manipulation`}
        >
          <Share2 className={iconSize} />
        </motion.button>
      </div>

      {/* Success Toast Message */}
      <AnimatePresence>
        {showCheck && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white shadow-lg z-50"
          >
            {checkMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}