// app/test-data/page.tsx (temporary)
"use client";

import { trackPageView, trackImageView, trackInteraction } from '@/lib/analytics/tracking';

export default function TestData() {
  const generateTestData = async () => {
    // Simulate page view
    await trackPageView('/test');
    console.log('✅ Page view tracked');
    
    // Simulate image views
    const imageIds = ['img-1', 'img-2', 'img-3'];
    for (const id of imageIds) {
      await trackImageView(id);
      console.log(`✅ Image view tracked: ${id}`);
    }
    
    // Simulate likes
    await trackInteraction('img-1', 'like');
    await trackInteraction('img-2', 'like');
    console.log('✅ Likes tracked');
    
    // Simulate download
    await trackInteraction('img-1', 'download');
    console.log('✅ Download tracked');
    
    // Simulate share
    await trackInteraction('img-3', 'share');
    console.log('✅ Share tracked');
    
    alert('Test data generated! Check your admin dashboard.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-8">
      <div className="bg-[#0c0c0c] p-8 rounded-xl border border-[rgba(255,255,255,0.05)] max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Generate Test Data</h1>
        <p className="text-gray-400 mb-6 text-sm">
          Click the button below to generate sample analytics data.
        </p>
        <button
          onClick={generateTestData}
          className="px-6 py-3 rounded-full bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition-colors hover:cursor-pointer"
        >
          Generate Test Data
        </button>
        <p className="text-xs text-gray-500 mt-4">
          After clicking, check your admin dashboard at /admin
        </p>
      </div>
    </div>
  );
}