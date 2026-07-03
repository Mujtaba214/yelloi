"use client";

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-[#050505]">
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}