// app/api/images/route.ts
import { NextResponse } from 'next/server';
import { fetchAllImages } from '@/lib/cloudinary/fetch';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { limit = 20, cursor } = body;

    console.log('📥 POST /api/images called:', { limit, cursor });

    const result = await fetchAllImages(limit, cursor);

    return NextResponse.json({
      images: result.images || [],
      nextCursor: result.nextCursor || null,
    });
  } catch (error) {
    console.error('❌ Image fetch error:', error);
    return NextResponse.json(
      { 
        images: [],
        nextCursor: null,
        error: error instanceof Error ? error.message : 'Failed to fetch images'
      },
      { status: 500 }
    );
  }
}