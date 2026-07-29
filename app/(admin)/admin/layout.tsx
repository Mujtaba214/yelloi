"use client";

import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-[#050505]">
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div 
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'lg:ml-72' : 'ml-0'
          }`}
        >
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}