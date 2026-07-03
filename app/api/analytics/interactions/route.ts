// app/api/analytics/interactions/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db/index';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { visitorId, sessionId, imageId, interactionType } = body;

    // Validate required fields
    if (!visitorId || !imageId || !interactionType) {
      console.error('Missing fields:', { visitorId, imageId, interactionType });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log what we're inserting
    const insertData = {
      visitor_id: visitorId,
      session_id: sessionId || null,
      image_id: imageId,
      interaction_type: interactionType,
      created_at: new Date().toISOString(),
    };
    console.log('Inserting data:', insertData);

    // 🔥 Insert into Supabase with direct admin client
    const { data, error } = await supabaseAdmin
      .from('image_interactions')
      .insert(insertData)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Interaction inserted:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to track interaction' },
      { status: 500 }
    );
  }
}