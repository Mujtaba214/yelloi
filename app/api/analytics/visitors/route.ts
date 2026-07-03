import { NextResponse } from 'next/server';
import { trackVisitor } from '@/lib/analytics/database';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { visitorId, sessionId, pageUrl, referrer, userAgent } = body;

    if (!visitorId || !pageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await trackVisitor({
      visitorId,
      sessionId,
      pageUrl,
      referrer: referrer || '',
      userAgent: userAgent || '',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { visitorId, sessionId, pageUrl, timeSpent } = body;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track time spent' },
      { status: 500 }
    );
  }
}