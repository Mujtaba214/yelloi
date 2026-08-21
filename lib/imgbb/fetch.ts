// lib/imgbb/fetch.ts
import imagesData from '@/public/imgbb-images.json';
import { ImageType } from '@/types';

const PAGE_SIZE = 50;

// 🔥 Pre-process images with IDs and placeholders
export function getOptimizedImage(url: string): { url: string; width: number; height: number } {
  // ImgBB doesn't provide dimensions, use default aspect ratios
  return {
    url: url,
    width: 800,
    height: 600,
  };
}

// 🔥 Fetch paginated images
export async function fetchImages(page: number = 1, pageSize: number = PAGE_SIZE): Promise<{
  images: ImageType[];
  total: number;
  hasMore: boolean;
}> {
  const allImages = imagesData.images.map((url: string, index: number) => ({
    id: `img-${String(index + 1).padStart(4, '0')}`,
    url: url,
    prompt: 'AI generated image',
    likes: 0,
    downloads: 0,
    views: 0,
    createdAt: new Date(),
  }));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = allImages.slice(start, end);

  return {
    images: paginated,
    total: allImages.length,
    hasMore: end < allImages.length,
  };
}

// 🔥 Fetch ALL images (for cache)
let cachedImages: ImageType[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export async function fetchAllImages(): Promise<{ images: ImageType[]; total: number }> {
  if (cachedImages && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
    return { images: cachedImages, total: cachedImages.length };
  }

  const images = imagesData.images.map((url: string, index: number) => ({
    id: `img-${String(index + 1).padStart(4, '0')}`,
    url: url,
    prompt: 'AI generated image',
    likes: 0,
    downloads: 0,
    views: 0,
    createdAt: new Date(),
  }));

  cachedImages = images;
  cacheTimestamp = Date.now();
  return { images, total: images.length };
}

export function clearImageCache() {
  cachedImages = null;
  cacheTimestamp = null;
}