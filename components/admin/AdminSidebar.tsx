"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Image, 
  BarChart3, 
  Settings, 
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/images', label: 'Images', icon: Image },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 z-50 h-full w-64 bg-[#0c0c0c] border-r border-[rgba(255,255,255,0.05)] transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.05)]">
          <Link href="/admin" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold text-white">YELL<span className="text-yellow-400">O</span>I</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-yellow-400/10 text-yellow-400' 
                    : 'text-gray-400 hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgba(255,255,255,0.05)]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Live Visitors</span>
              <span className="text-green-400 font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Today's Views</span>
              <span className="text-blue-400 font-semibold">1,847</span>
            </div>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-40 lg:hidden p-3 rounded-full bg-[#0c0c0c] border border-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
}