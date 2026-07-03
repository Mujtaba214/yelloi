"use client";

import { motion } from 'framer-motion';
import { Eye, ThumbsUp, Download, TrendingUp } from 'lucide-react';

interface TopImagesTableProps {
  images: Array<{
    imageId: string;
    likes: number;
    downloads: number;
    views: number;
    totalEngagement: number;
  }>;
}

export function TopImagesTable({ images }: TopImagesTableProps) {
  if (!images || images.length === 0) {
    return (
      <div className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] p-6 text-center">
        <p className="text-gray-400">No image data yet. Start uploading images to see analytics!</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] overflow-hidden">
      <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
        <h3 className="text-white font-semibold">Top Performing Images</h3>
        <p className="text-sm text-gray-400">Based on total engagement (views + likes + downloads)</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.05)]">
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Rank</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Image ID</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Views</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Likes</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Downloads</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <motion.tr
                key={image.imageId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${
                    index === 0 ? 'text-yellow-400' :
                    index === 1 ? 'text-gray-300' :
                    index === 2 ? 'text-amber-600' :
                    'text-gray-400'
                  }`}>
                    #{index + 1}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-300">
                    {image.imageId.split('/').pop()?.slice(0, 30) || image.imageId}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-sm text-gray-300">
                    <Eye className="h-4 w-4 text-blue-400" />
                    {image.views?.toLocaleString() || 0}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-sm text-gray-300">
                    <ThumbsUp className="h-4 w-4 text-red-400" />
                    {image.likes?.toLocaleString() || 0}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-sm text-gray-300">
                    <Download className="h-4 w-4 text-purple-400" />
                    {image.downloads?.toLocaleString() || 0}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-sm font-medium text-white">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    {image.totalEngagement?.toLocaleString() || 0}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}