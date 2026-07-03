// app/api/images/route.ts
import { NextResponse } from 'next/server';
import { fetchAllImages } from '@/lib/cloudinary/fetch';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const cursor = searchParams.get('cursor') || undefined;

    console.log('📥 GET /api/images called:', { limit, cursor });

    const { images, nextCursor } = await fetchAllImages(limit, cursor);

    console.log('📤 GET response:', { 
      imageCount: images.length, 
      hasNextCursor: !!nextCursor 
    });

    return NextResponse.json({
      images,
      nextCursor,
    });
  } catch (error) {
    console.error('❌ Image fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { limit = 20, cursor } = body;

    console.log('📥 POST /api/images called:', { limit, cursor });

    const { images, nextCursor } = await fetchAllImages(limit, cursor);

    console.log('📤 POST response:', { 
      imageCount: images.length, 
      hasNextCursor: !!nextCursor 
    });

    return NextResponse.json({
      images,
      nextCursor,
    });
  } catch (error) {
    console.error('❌ Image fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}