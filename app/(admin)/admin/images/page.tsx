// app/(admin)/admin/images/page.tsx
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TopImagesTable } from '@/components/admin/TopImagesTable';
import { getTopImages } from '@/lib/db/queries';

export const revalidate = 60;

export default async function ImagesPage() {
  // 🔥 Remove startDate - only pass limit
  const images = await getTopImages(50);

  return (
    <div>
      <AdminHeader title="Image Management" />
      <div className="p-6">
        <div className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] p-6 mb-6">
          <h3 className="text-white font-semibold mb-2">Total Images Tracked</h3>
          <p className="text-3xl font-bold text-white">{images.length || 0}</p>
          <p className="text-sm text-gray-400">Images with engagement data</p>
        </div>
        <TopImagesTable images={images} />
      </div>
    </div>
  );
}