"use client";

import { motion } from 'framer-motion';
import { Users, Eye, Download, ThumbsUp, Share2, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  overview: {
    totalVisitors: number;
    totalPageViews: number;
    totalImageViews: number;
    totalLikes: number;
    totalDownloads: number;
    totalShares: number;
    engagementRate: string;
  };
}

const stats = [
  {
    id: 'visitors',
    label: 'Total Visitors',
    key: 'totalVisitors',
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    id: 'views',
    label: 'Image Views',
    key: 'totalImageViews',
    icon: Eye,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    id: 'likes',
    label: 'Likes',
    key: 'totalLikes',
    icon: ThumbsUp,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
  },
  {
    id: 'downloads',
    label: 'Downloads',
    key: 'totalDownloads',
    icon: Download,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    id: 'shares',
    label: 'Shares',
    key: 'totalShares',
    icon: Share2,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    id: 'engagement',
    label: 'Engagement Rate',
    key: 'engagementRate',
    icon: TrendingUp,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    suffix: '%',
  },
];

export function StatsCards({ overview }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const value = overview[stat.key as keyof typeof overview];
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] p-4 hover:border-[rgba(255,255,255,0.1)] transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                  {stat.suffix}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}