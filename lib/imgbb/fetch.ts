// lib/imgbb/fetch.ts
import imagesData from '@/public/imgbb-images.json';
import { ImageType } from '@/types';

// 🔥 Fetch ALL images (no pagination, no limit)
export function fetchAllImagesFromJSON(): ImageType[] {
  return imagesData.images.map((url: string, index: number) => ({
    id: `img-${String(index + 1).padStart(4, '0')}`,
    url: url,
    prompt: 'AI generated image',
    likes: 0,
    downloads: 0,
    views: 0,
    createdAt: new Date(),
  }));
}

// 🔥 Cache for performance
let cachedImages: ImageType[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchAllImages(): Promise<{ images: ImageType[]; total: number }> {
  // Check cache
  if (cachedImages && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
    console.log(`📦 Using cached images: ${cachedImages.length} total`);
    return { images: cachedImages, total: cachedImages.length };
  }

  // 🔥 Fetch ALL images (no pagination)
  const images = fetchAllImagesFromJSON();
  
  cachedImages = images;
  cacheTimestamp = Date.now();

  console.log(`📦 Fetched ALL ${images.length} images from ImgBB JSON`);
  
  return { 
    images, 
    total: images.length 
  };
}

export function clearImageCache() {
  cachedImages = null;
  cacheTimestamp = null;
  console.log('🗑️ Image cache cleared');
}