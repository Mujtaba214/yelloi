"use client";

import { HeroSection } from "@/components/ui/HeroSection";
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <ImageGrid />
        <Footer />
      </div>
    </main>
  );
}