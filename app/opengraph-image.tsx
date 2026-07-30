// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Yelloi - AI Image Prompt Discovery';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Background Glow */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255,216,77,0.15), transparent 70%)',
          }}
        />
        
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '0.15em',
            }}
          >
            YELL<span style={{ color: '#FFD84D' }}>O</span>I
          </span>
        </div>
        
        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#8a8a8a',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Visual Discovery
        </div>
        
        {/* Description */}
        <div
          style={{
            fontSize: '18px',
            color: '#666',
            maxWidth: '600px',
            textAlign: 'center',
            lineHeight: '1.6',
          }}
        >
          Discover thousands of stunning AI-generated images. Find inspiration for Midjourney, Flux, DALL-E, and more.
        </div>
        
        {/* Decorative Star */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            fontSize: '32px',
            color: '#FFD84D',
            opacity: 0.6,
          }}
        >
          ✦
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}