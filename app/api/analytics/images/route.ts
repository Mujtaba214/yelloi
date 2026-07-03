import { NextResponse } from 'next/server';
import { trackImageView } from '@/lib/analytics/database';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { visitorId, sessionId, imageId } = body;

    if (!visitorId || !imageId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await trackImageView({
      visitorId,
      sessionId,
      imageId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Image view tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track image view' },
      { status: 500 }
    );
  }
}