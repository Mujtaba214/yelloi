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