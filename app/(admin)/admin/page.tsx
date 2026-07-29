"use client";

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatsCards } from '@/components/admin/StatsCards';
import { VisitorChart } from '@/components/admin/VisitorChart';
import { TopImagesTable } from '@/components/admin/TopImagesTable';
import { RecentActivity } from '@/components/admin/RecentActivity';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/analytics');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <AdminHeader title="Dashboard" />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <AdminHeader title="Dashboard" />
      
      <div className="p-6">
        <StatsCards overview={data?.overview} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <VisitorChart dailyData={data?.dailyData || []} />
          </div>
          <div>
            <RecentActivity activities={data?.recentActivity || []} />
          </div>
        </div>
        
        <div className="mt-6">
          <TopImagesTable images={data?.topImages || []} />
        </div>
      </div>
    </div>
  );
}