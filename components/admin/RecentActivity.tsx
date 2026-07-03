"use client";

import { motion } from 'framer-motion';
import { Eye, Clock } from 'lucide-react';

interface RecentActivityProps {
  activities: Array<{
    image_id: string;
    created_at: string;
  }>;
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] p-6 h-full">
        <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
        <p className="text-sm text-gray-400 text-center py-8">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] p-6 h-full">
      <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {activities.slice(0, 8).map((activity, index) => (
          <motion.div
            key={`${activity.image_id}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.02)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center flex-shrink-0">
              <Eye className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 truncate">
                Image viewed: <span className="text-gray-400">{activity.image_id.split('/').pop()?.slice(0, 25) || activity.image_id}</span>
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {new Date(activity.created_at).toLocaleString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}