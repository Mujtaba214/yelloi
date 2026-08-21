// app/api/images/route.ts
import { NextResponse } from 'next/server';
import { fetchAllImages, clearImageCache } from '@/lib/imgbb/fetch';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refresh = false } = body;

    if (refresh) {
      clearImageCache();
    }

    // 🔥 Fetch ALL images (no pagination)
    const result = await fetchAllImages();

    return NextResponse.json({
      images: result.images || [],
      total: result.total || 0,
    });
  } catch (error) {
    console.error('❌ Image fetch error:', error);
    return NextResponse.json(
      { 
        images: [],
        total: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch images'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh') === 'true';

    if (refresh) {
      clearImageCache();
    }

    const result = await fetchAllImages();

    return NextResponse.json({
      images: result.images || [],
      total: result.total || 0,
    });
  } catch (error) {
    console.error('❌ Image fetch error:', error);
    return NextResponse.json(
      { 
        images: [],
        total: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch images'
      },
      { status: 500 }
    );
  }
}