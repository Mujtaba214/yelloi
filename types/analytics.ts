export interface Visitor {
  id: string;
  visitorId: string;
  userAgent?: string;
  ipAddress?: string;
  country?: string;
  city?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  firstVisit: Date;
  lastVisit: Date;
  visitCount: number;
}

export interface PageView {
  id: string;
  visitorId: string;
  pageUrl: string;
  referrer?: string;
  sessionId?: string;
  timeSpent?: number;
  createdAt: Date;
}

export interface ImageView {
  id: string;
  imageId: string;
  visitorId: string;
  sessionId?: string;
  viewDuration?: number;
  createdAt: Date;
}

export interface ImageInteraction {
  id: string;
  imageId: string;
  visitorId: string;
  interactionType: 'like' | 'dislike' | 'download' | 'share';
  sessionId?: string;
  createdAt: Date;
}

export interface DailyAnalytics {
  date: string;
  totalVisitors: number;
  totalPageViews: number;
  totalImageViews: number;
  totalLikes: number;
  totalDownloads: number;
  totalShares: number;
  avgSessionDuration: number;
}

export interface AnalyticsOverview {
  totalVisitors: number;
  totalPageViews: number;
  totalImageViews: number;
  totalLikes: number;
  totalDownloads: number;
  totalShares: number;
  engagementRate: string;
}