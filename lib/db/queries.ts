// lib/db/queries.ts
import { supabaseAdmin } from './index';

// Remove date filtering for testing
export async function getAnalyticsOverview() {
  try {
    // Get ALL visitors (no date filter)
    const { count: totalVisitors } = await supabaseAdmin
      .from('visitors')
      .select('*', { count: 'exact', head: true });

    // Get ALL page views
    const { count: totalPageViews } = await supabaseAdmin
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    // Get ALL image views
    const { count: totalImageViews } = await supabaseAdmin
      .from('image_views')
      .select('*', { count: 'exact', head: true });

    // Get ALL interactions
    const { data: interactions } = await supabaseAdmin
      .from('image_interactions')
      .select('interaction_type');

    const likes = interactions?.filter(i => i.interaction_type === 'like').length || 0;
    const downloads = interactions?.filter(i => i.interaction_type === 'download').length || 0;
    const shares = interactions?.filter(i => i.interaction_type === 'share').length || 0;
    const dislikes = interactions?.filter(i => i.interaction_type === 'dislike').length || 0;

    const totalEngagement = likes + downloads + shares;
    const engagementRate = totalVisitors > 0 
      ? ((totalEngagement / totalVisitors) * 100).toFixed(1) 
      : '0';

    console.log('📊 Dashboard data:', {
      totalVisitors,
      totalPageViews,
      totalImageViews,
      likes,
      downloads,
      shares,
      engagementRate
    });

    return {
      totalVisitors: totalVisitors || 0,
      totalPageViews: totalPageViews || 0,
      totalImageViews: totalImageViews || 0,
      totalLikes: likes,
      totalDownloads: downloads,
      totalShares: shares,
      engagementRate,
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      totalVisitors: 0,
      totalPageViews: 0,
      totalImageViews: 0,
      totalLikes: 0,
      totalDownloads: 0,
      totalShares: 0,
      engagementRate: '0',
    };
  }
}

// For the chart
export async function getDailyAnalytics() {
  try {
    const { data } = await supabaseAdmin
      .from('daily_analytics')
      .select('*')
      .order('date', { ascending: true })
      .limit(30);
    
    return data || [];
  } catch (error) {
    console.error('Error fetching daily analytics:', error);
    return [];
  }
}

// For top images
export async function getTopImages(limit: number = 10) {
  try {
    const { data: interactions } = await supabaseAdmin
      .from('image_interactions')
      .select('image_id, interaction_type');

    const { data: views } = await supabaseAdmin
      .from('image_views')
      .select('image_id');

    const imageStats: Record<string, { likes: number; downloads: number; views: number }> = {};
    
    interactions?.forEach(item => {
      if (!imageStats[item.image_id]) {
        imageStats[item.image_id] = { likes: 0, downloads: 0, views: 0 };
      }
      if (item.interaction_type === 'like') imageStats[item.image_id].likes++;
      else if (item.interaction_type === 'download') imageStats[item.image_id].downloads++;
    });

    views?.forEach(item => {
      if (!imageStats[item.image_id]) {
        imageStats[item.image_id] = { likes: 0, downloads: 0, views: 0 };
      }
      imageStats[item.image_id].views++;
    });

    return Object.entries(imageStats)
      .map(([imageId, stats]) => ({
        imageId,
        ...stats,
        totalEngagement: stats.likes + stats.downloads + stats.views,
      }))
      .sort((a, b) => b.totalEngagement - a.totalEngagement)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching top images:', error);
    return [];
  }
}

export async function getRecentActivity(limit: number = 10) {
  try {
    const { data } = await supabaseAdmin
      .from('image_views')
      .select('image_id, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    return data || [];
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
}