import { NextResponse } from 'next/server';
import { 
  getAnalyticsOverview, 
  getDailyAnalytics, 
  getTopImages, 
  getRecentActivity 
} from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [overview, dailyData, topImages, recentActivity] = await Promise.all([
      getAnalyticsOverview(),
      getDailyAnalytics(),
      getTopImages(10),
      getRecentActivity(10),
    ]);

    return NextResponse.json({
      overview,
      dailyData,
      topImages,
      recentActivity,
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { 
        overview: {
          totalVisitors: 0,
          totalPageViews: 0,
          totalImageViews: 0,
          totalLikes: 0,
          totalDownloads: 0,
          totalShares: 0,
          engagementRate: '0',
        },
        dailyData: [],
        topImages: [],
        recentActivity: [],
      },
    )
  }
}