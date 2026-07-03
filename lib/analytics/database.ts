import { supabase } from '@/lib/db/index';

export async function trackVisitor(data: {
  visitorId: string;
  sessionId: string;
  pageUrl: string;
  referrer: string;
  userAgent: string;
}) {
  const { visitorId, sessionId, pageUrl, referrer, userAgent } = data;
  
  // Get or create visitor
  const { data: existingVisitor } = await supabase
    .from('visitors')
    .select('*')
    .eq('visitor_id', visitorId)
    .single();

  if (existingVisitor) {
    await supabase
      .from('visitors')
      .update({
        last_visit: new Date().toISOString(),
        visit_count: existingVisitor.visit_count + 1,
      })
      .eq('visitor_id', visitorId);
  } else {
    const deviceInfo = parseUserAgent(userAgent);
    await supabase
      .from('visitors')
      .insert({
        visitor_id: visitorId,
        user_agent: userAgent,
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        first_visit: new Date().toISOString(),
        last_visit: new Date().toISOString(),
        visit_count: 1,
      });
  }

  await supabase
    .from('page_views')
    .insert({
      visitor_id: visitorId,
      session_id: sessionId,
      page_url: pageUrl,
      referrer: referrer || '',
      created_at: new Date().toISOString(),
    });
}

export async function trackImageView(data: {
  visitorId: string;
  sessionId: string;
  imageId: string;
}) {
  const { visitorId, sessionId, imageId } = data;
  await supabase
    .from('image_views')
    .insert({
      visitor_id: visitorId,
      session_id: sessionId,
      image_id: imageId,
      created_at: new Date().toISOString(),
    });
}

export async function trackInteraction(data: {
  visitorId: string;
  sessionId: string;
  imageId: string;
  interactionType: 'like' | 'dislike' | 'download' | 'share';
}) {
  const { visitorId, sessionId, imageId, interactionType } = data;
  
  // 🔥 Insert into Supabase
  const { error } = await supabase
    .from('image_interactions')
    .insert({
      visitor_id: visitorId,
      session_id: sessionId,
      image_id: imageId,
      interaction_type: interactionType, // 'download'
      created_at: new Date().toISOString(),
    });
  
  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }
}

function parseUserAgent(userAgent: string) {
  const isMobile = /mobile/i.test(userAgent);
  const isTablet = /tablet/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (isMobile) deviceType = 'mobile';
  if (isTablet) deviceType = 'tablet';
  
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  let os = 'Unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  return { deviceType, browser, os };
}