"use client";

import { useEffect, useState } from 'react';
import { AnalyticsOverview, DailyAnalytics } from '@/types/analytics';

export function useAnalytics(period: string = '7d') {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [dailyData, setDailyData] = useState<DailyAnalytics[]>([]);
  const [topImages, setTopImages] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?period=${period}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      
      const data = await response.json();
      setOverview(data.overview);
      setDailyData(data.dailyData || []);
      setTopImages(data.topImages || []);
      setRecentActivity(data.recentActivity || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  return {
    overview,
    dailyData,
    topImages,
    recentActivity,
    loading,
    error,
    refresh: fetchData,
  };
}