"use client";

import { useState, useEffect } from 'react';
import { HeroSection } from "@/components/ui/HeroSection";
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { Footer } from "@/components/ui/Footer";
import { trackPageView, trackTimeSpent } from "@/lib/analytics/tracking";

export default function UserPage() {
  useEffect(() => {
    console.log('📄 Tracking page view: /');
    trackPageView('/');
    const cleanup = trackTimeSpent('/');
    return cleanup;
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <div className="bg-white dark:bg-black">
        <ImageGrid />
        <Footer />
      </div>
    </main>
  );
}