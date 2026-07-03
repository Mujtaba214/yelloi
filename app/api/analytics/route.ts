// app/api/analytics/route.ts
import { NextResponse } from 'next/server';
import { 
  getAnalyticsOverview, 
  getDailyAnalytics, 
  getTopImages, 
  getRecentActivity 
} from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    
    // 🔥 No date filtering - get ALL data
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
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}