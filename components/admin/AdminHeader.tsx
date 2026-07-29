"use client";

import { useTheme } from 'next-themes';
import { Moon, Sun, Bell, Settings, LogOut, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-[#0c0c0c] border-b border-[rgba(255,255,255,0.05)] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white hidden sm:block">{title}</h1>
          <h1 className="text-lg font-bold text-white sm:hidden">{title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          
          
          <Link href="/admin/settings">
            <button className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
          </Link>
          
        </div>
      </div>
    </header>
  );
}