export interface ImageType {
  id: string;
  url: string;
  thumbnailUrl?: string;
  prompt?: string;
  likes: number;
  downloads: number;
  views: number;
  createdAt: Date;
}

export const SAMPLE_IMAGES: ImageType[] = [
  {
    id: '1',
    url: 'https://picsum.photos/id/1/800/800',  // Working URL
    likes: 123,
    downloads: 45,
    views: 1234,
    createdAt: new Date(),
  },
  // ... rest of images
];

export interface UserInteraction {
  imageId: string;
  liked: boolean;
  disliked: boolean;
  downloaded: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}