"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  BarChart3,
  Settings,
  Sparkles,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
];

export function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavigation = (href: string) => {
    if (isMobile) {
      setOpen(false);
    }
    router.push(href);
  };

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-[#0c0c0c] border-r border-[rgba(255,255,255,0.05)] transition-transform duration-300 ease-in-out overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.05)]">
          <Link
            href="/admin"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => isMobile && setOpen(false)}
          >
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold text-white">
              YELL<span className="text-yellow-400">O</span>I
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-yellow-400/10 text-yellow-400"
                    : "text-gray-400 hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                }`}
                aria-label={`Navigate to ${item.label}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgba(255,255,255,0.05)] bg-[#0c0c0c]">
          {/* Live Stats */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Live Visitors</span>
              <span className="text-green-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                12
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Today's Views</span>
              <span className="text-blue-400 font-semibold">1,847</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-40 lg:hidden p-3 rounded-full bg-[#0c0c0c] border border-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 shadow-lg hover:shadow-xl"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Keyboard shortcut hint (desktop only) */}
      <div className="hidden lg:block fixed bottom-4 left-4 z-40 text-xs text-gray-600">
        <kbd className="px-2 py-1 rounded bg-[#0c0c0c] border border-[rgba(255,255,255,0.05)] text-gray-500">
          Ctrl
        </kbd>
        <span className="mx-1 text-gray-600">+</span>
        <kbd className="px-2 py-1 rounded bg-[#0c0c0c] border border-[rgba(255,255,255,0.05)] text-gray-500">
          B
        </kbd>
        <span className="ml-2 text-gray-600">to toggle</span>
      </div>
    </>
  );
}
