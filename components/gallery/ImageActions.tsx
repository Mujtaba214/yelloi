"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ThumbsDown, Download, Check, Share2 } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { trackInteraction } from "@/lib/analytics/tracking";

interface ImageActionsProps {
  imageId: string;
  imageUrl?: string;
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

  const handleLike = async (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    
    const newLiked = !isLiked;
    const newDisliked = false;
    
    setInteractions(prev => ({
      ...prev,
      [imageId]: { liked: newLiked, disliked: newDisliked }
    }));
    
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.(newLiked);
    
    // 🔥 ONLY TRACK WHEN USER IS LIKING (NOT UNLIKING)
    if (newLiked) {
      console.log('❤️ Tracking like for image:', imageId);
      await trackInteraction(imageId, 'like');
      setCheckMessage('Liked! ❤️');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    } else {
      // User unliked - don't track, just show a message
      console.log('💔 User unliked image:', imageId);
      setCheckMessage('Unliked 💔');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    }
  };

  const handleDislike = async (e?: React.MouseEvent | React.TouchEvent) => {
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
    
    // 🔥 ONLY TRACK WHEN USER IS DISLIKING (NOT UNDISLIKING)
    if (newDisliked) {
      console.log('👎 Tracking dislike for image:', imageId);
      await trackInteraction(imageId, 'dislike');
      setCheckMessage('Noted 👎');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    } else {
      console.log('👍 User removed dislike for image:', imageId);
      setCheckMessage('Dislike removed 👍');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    }
  };

  const handleDownload = async (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    
    if (!imageUrl) return;
    
    // 🔥 TRACK DOWNLOAD (always counts as a download)
    console.log('📥 Tracking download for image:', imageId);
    await trackInteraction(imageId, 'download');
    
    setIsDownloading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `yelloi-${imageId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      setCheckMessage('Downloaded! 📥');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
      onDownload?.();
    } catch (error) {
      console.error('Download error:', error);
      window.open(imageUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    
    // 🔥 TRACK SHARE (always counts as a share)
    console.log('🔗 Tracking share for image:', imageId);
    await trackInteraction(imageId, 'share');
    
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: 'Yelloi - AI Art',
          text: 'Check out this amazing AI-generated image!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCheckMessage('Link copied! 🔗');
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    }
  };

  const buttonSize = isMobile ? 'p-2.5' : 'p-1.5';
  const iconSize = isMobile ? 'h-5 w-5' : 'h-3.5 w-3.5';

  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-1">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          onClick={handleLike}
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

        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          onClick={handleDislike}
          className={`rounded-full ${buttonSize} transition-all touch-manipulation ${
            isDisliked
              ? 'bg-blue-500 text-white'
              : 'bg-black/50 text-white backdrop-blur-sm active:bg-blue-500/80'
          }`}
        >
          <ThumbsDown className={`${iconSize} ${isDisliked ? 'fill-white' : ''}`} />
        </motion.button>

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
            <div className={`${iconSize} animate-spin rounded-full border-2 border-white border-t-transparent`} />
          ) : (
            <Download className={iconSize} />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          onClick={handleShare}
          className={`rounded-full ${buttonSize} bg-black/50 text-white backdrop-blur-sm transition-all active:bg-purple-500/80 touch-manipulation`}
        >
          <Share2 className={iconSize} />
        </motion.button>
      </div>

      <AnimatePresence>
        {showCheck && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg z-50"
            style={{
              backgroundColor: checkMessage.includes('❤️') || checkMessage.includes('👍') 
                ? '#22c55e'  // green
                : checkMessage.includes('💔') || checkMessage.includes('👎')
                ? '#ef4444'  // red
                : '#22c55e'  // default green
            }}
          >
            {checkMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}