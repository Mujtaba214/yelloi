"use client";

import { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Yelloi',
    siteDescription: 'Visual Discovery - Explore stunning AI art',
    itemsPerPage: 20,
    enableAnalytics: true,
    enableLikes: true,
    enableDownloads: true,
  });

  const handleSave = () => {
    alert('Settings saved! (Demo)');
  };

  return (
    <div>
      <AdminHeader title="Settings" />
      <div className="p-6 max-w-3xl">
        <div className="bg-[#0c0c0c] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
          <h3 className="text-white font-semibold mb-6">General Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white focus:outline-none focus:border-yellow-400/50 resize-none h-20"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Items Per Page</label>
              <input
                type="number"
                value={settings.itemsPerPage}
                onChange={(e) => setSettings({ ...settings, itemsPerPage: parseInt(e.target.value) })}
                className="w-32 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white focus:outline-none focus:border-yellow-400/50"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.enableAnalytics}
                onChange={(e) => setSettings({ ...settings, enableAnalytics: e.target.checked })}
                className="w-4 h-4 accent-yellow-400"
              />
              <label className="text-sm text-gray-300">Enable Analytics</label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.enableLikes}
                onChange={(e) => setSettings({ ...settings, enableLikes: e.target.checked })}
                className="w-4 h-4 accent-yellow-400"
              />
              <label className="text-sm text-gray-300">Enable Likes</label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.enableDownloads}
                onChange={(e) => setSettings({ ...settings, enableDownloads: e.target.checked })}
                className="w-4 h-4 accent-yellow-400"
              />
              <label className="text-sm text-gray-300">Enable Downloads</label>
            </div>

            <button
              onClick={handleSave}
              className="mt-4 px-6 py-2 rounded-full bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}