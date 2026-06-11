import { ImageType } from "@/types";

export const ITEMS_PER_PAGE = 20;
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
export const SITE_NAME = 'Yelloi';
export const SITE_DESCRIPTION = 'Discover thousands of stunning AI-generated images';

// Sample images - Replace with your actual Cloudinary URLs
export const SAMPLE_IMAGES: ImageType[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  url: `https://picsum.photos/id/${(i % 70) + 1}/800/800`,
  likes: Math.floor(Math.random() * 1000),
  downloads: Math.floor(Math.random() * 500),
  views: Math.floor(Math.random() * 5000),
  createdAt: new Date(),
}));