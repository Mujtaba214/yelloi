"use client";

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VisitorChartProps {
  dailyData: Array<{
    date: string;
    total_visitors: number;
    total_page_views: number;
    total_image_views: number;
    total_likes: number;
    total_downloads: number;
  }>;
}

export function VisitorChart({ dailyData }: VisitorChartProps) {
  const chartRef = useRef<any>(null);

  if (!dailyData || dailyData.length === 0) {
    return (
      <div className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Traffic Overview</h3>
        </div>
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No data available yet. Start tracking visitors!
        </div>
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: '#8a8a8a',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        titleColor: '#ffffff',
        bodyColor: '#8a8a8a',
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.03)',
        },
        ticks: {
          color: '#8a8a8a',
          maxTicksLimit: 12,
        },
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.03)',
        },
        ticks: {
          color: '#8a8a8a',
          beginAtZero: true,
        },
      },
    },
  };

  const data = {
    labels: dailyData.map((d) => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Visitors',
        data: dailyData.map((d) => d.total_visitors),
        borderColor: '#ffd84d',
        backgroundColor: 'rgba(255, 216, 77, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ffd84d',
        pointBorderColor: '#ffd84d',
        pointBorderWidth: 2,
        pointRadius: 3,
      },
      {
        label: 'Page Views',
        data: dailyData.map((d) => d.total_page_views),
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#60a5fa',
        pointBorderColor: '#60a5fa',
        pointBorderWidth: 2,
        pointRadius: 3,
      },
      {
        label: 'Image Views',
        data: dailyData.map((d) => d.total_image_views),
        borderColor: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#34d399',
        pointBorderColor: '#34d399',
        pointBorderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Traffic Overview</h3>
      </div>
      <div className="h-[300px]">
        <Line ref={chartRef} options={options} data={data} />
      </div>
    </div>
  );
}