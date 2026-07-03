import { Suspense } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatsCards } from '@/components/admin/StatsCards';
import { VisitorChart } from '@/components/admin/VisitorChart';
import { TopImagesTable } from '@/components/admin/TopImagesTable';
import { getAnalyticsOverview, getDailyAnalytics, getTopImages } from '@/lib/db/queries';

export const revalidate = 60;

export default async function AnalyticsPage() {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const [overview, dailyData, topImages] = await Promise.all([
    getAnalyticsOverview(startDate),
    getDailyAnalytics(startDate),
    getTopImages(startDate, 20),
  ]);

  return (
    <div>
      <AdminHeader title="Analytics" />
      <div className="p-6">
        <StatsCards overview={overview} />
        <div className="mt-6">
          <VisitorChart dailyData={dailyData} />
        </div>
        <div className="mt-6">
          <TopImagesTable images={topImages} />
        </div>
      </div>
    </div>
  );
}