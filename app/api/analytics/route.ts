import { NextResponse } from 'next/server';
import { getAnalyticsOverview, getDailyAnalytics, getTopImages, getRecentActivity } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    
    const startDate = new Date();
    switch (period) {
      case '24h': startDate.setHours(startDate.getHours() - 24); break;
      case '7d': startDate.setDate(startDate.getDate() - 7); break;
      case '30d': startDate.setDate(startDate.getDate() - 30); break;
      case '90d': startDate.setDate(startDate.getDate() - 90); break;
      default: startDate.setDate(startDate.getDate() - 7);
    }

    const [overview, dailyData, topImages, recentActivity] = await Promise.all([
      getAnalyticsOverview(startDate),
      getDailyAnalytics(startDate),
      getTopImages(startDate, 10),
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