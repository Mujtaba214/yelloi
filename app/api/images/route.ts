// app/api/images/route.ts
import { NextResponse } from 'next/server';
import { fetchImages, fetchAllImages, clearImageCache } from '@/lib/imgbb/fetch';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page = 1, pageSize = 50, refresh = false } = body;

    if (refresh) {
      clearImageCache();
    }

    // 🔥 Paginated fetch for faster initial load
    const result = await fetchImages(page, pageSize);

    return NextResponse.json({
      images: result.images || [],
      total: result.total || 0,
      hasMore: result.hasMore || false,
    });
  } catch (error) {
    console.error('❌ Image fetch error:', error);
    return NextResponse.json(
      { 
        images: [],
        total: 0,
        hasMore: false,
        error: error instanceof Error ? error.message : 'Failed to fetch images'
      },
      { status: 500 }
    );
  }
}