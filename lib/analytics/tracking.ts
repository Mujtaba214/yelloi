// lib/analytics/tracking.ts
"use client";

// 🔥 Memory-based fallback for when localStorage is blocked
let memoryVisitorId: string | null = null;
let memorySessionId: string | null = null;

export function getVisitorId(): string {
  // Try to get from localStorage first
  try {
    let visitorId = localStorage.getItem('yelloi_visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('yelloi_visitor_id', visitorId);
    }
    return visitorId;
  } catch (error) {
    // 🔥 localStorage is blocked (incognito mode)
    console.log('🔒 localStorage blocked, using memory fallback for visitor ID');
    if (!memoryVisitorId) {
      memoryVisitorId = crypto.randomUUID();
    }
    return memoryVisitorId;
  }
}

export function getSessionId(): string {
  // Try to get from sessionStorage first
  try {
    let sessionId = sessionStorage.getItem('yelloi_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('yelloi_session_id', sessionId);
    }
    return sessionId;
  } catch (error) {
    // 🔥 sessionStorage is blocked (incognito mode)
    console.log('🔒 sessionStorage blocked, using memory fallback for session ID');
    if (!memorySessionId) {
      memorySessionId = crypto.randomUUID();
    }
    return memorySessionId;
  }
}

export async function trackPageView(pageUrl: string) {
  try {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    
    console.log('📄 Tracking page view:', { visitorId, sessionId, pageUrl });
    
    const response = await fetch('/api/analytics/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        sessionId,
        pageUrl,
        referrer: document.referrer || '',
        userAgent: navigator.userAgent || '',
      }),
    });
    
    if (!response.ok) {
      console.error('Tracking failed:', await response.text());
    }
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

export async function trackImageView(imageId: string) {
  try {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    
    console.log('👁️ Tracking image view:', { visitorId, imageId });
    
    const response = await fetch('/api/analytics/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        sessionId,
        imageId,
      }),
    });
    
    if (!response.ok) {
      console.error('Image tracking failed:', await response.text());
    }
  } catch (error) {
    console.error('Failed to track image view:', error);
  }
}

export async function trackInteraction(imageId: string, type: 'like' | 'dislike' | 'download' | 'share') {
  try {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    
    console.log(`🔄 Tracking ${type}:`, { visitorId, imageId });
    
    const response = await fetch('/api/analytics/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        sessionId,
        imageId,
        interactionType: type,
      }),
    });
    
    if (!response.ok) {
      console.error('Interaction tracking failed:', await response.text());
    }
  } catch (error) {
    console.error('Failed to track interaction:', error);
  }
}

export function trackTimeSpent(pageUrl: string) {
  const startTime = Date.now();
  
  const sendTimeSpent = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    if (timeSpent > 3) {
      fetch('/api/analytics/visitors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: getVisitorId(),
          sessionId: getSessionId(),
          pageUrl,
          timeSpent,
        }),
      }).catch(() => {});
    }
  };

  window.addEventListener('beforeunload', sendTimeSpent);
  setTimeout(sendTimeSpent, 30000);
  
  return () => {
    window.removeEventListener('beforeunload', sendTimeSpent);
  };
}