// types/index.ts
export interface ImageType {
  id: string;
  url: string;
  prompt: string;
  likes: number;
  downloads: number;
  views: number;
  createdAt: Date;
  // 🔥 If you want to track which account it came from (optional)
  accountId?: string;
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