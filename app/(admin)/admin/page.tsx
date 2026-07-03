// app/(admin)/admin/page.tsx
import { Suspense } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatsCards } from '@/components/admin/StatsCards';
import { VisitorChart } from '@/components/admin/VisitorChart';
import { TopImagesTable } from '@/components/admin/TopImagesTable';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { 
  getAnalyticsOverview, 
  getDailyAnalytics, 
  getTopImages, 
  getRecentActivity 
} from '@/lib/db/queries';

export const revalidate = 60;

export default async function AdminDashboard() {
  // 🔥 No arguments needed anymore
  const [overview, dailyData, topImages, recentActivity] = await Promise.all([
    getAnalyticsOverview(),
    getDailyAnalytics(),
    getTopImages(10),
    getRecentActivity(10),
  ]);

  console.log('🔵 Admin Dashboard Data:', { overview, dailyData, topImages, recentActivity });

  return (
    <div className="min-h-screen bg-[#050505]">
      <AdminHeader title="Dashboard" />
      
      <div className="p-6">
        <Suspense fallback={<div className="text-gray-400">Loading stats...</div>}>
          <StatsCards overview={overview} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="text-gray-400">Loading chart...</div>}>
              <VisitorChart dailyData={dailyData} />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<div className="text-gray-400">Loading activity...</div>}>
              <RecentActivity activities={recentActivity} />
            </Suspense>
          </div>
        </div>

        <div className="mt-6">
          <Suspense fallback={<div className="text-gray-400">Loading top images...</div>}>
            <TopImagesTable images={topImages} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}