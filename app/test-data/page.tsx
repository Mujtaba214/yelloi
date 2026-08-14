"use client";

import { useState } from 'react';

export default function TestSimple() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔵 Testing API...');
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 5 }),
      });
      
      console.log('📊 Response status:', response.status);
      console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
      
      const text = await response.text();
      console.log('📊 Response text:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
      }
      
      setResult(data);
      console.log('📊 API Response:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('❌ Error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 text-white min-h-screen bg-[#050505]">
      <h1 className="text-2xl font-bold mb-4">🧪 Simple API Test</h1>
      
      <button 
        onClick={testAPI}
        className="px-4 py-2 bg-yellow-400 text-black rounded font-medium"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Test API'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded">
          <p className="text-red-400">❌ Error: {error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4">
          <div className="bg-[#0c0c0c] p-4 rounded border border-[rgba(255,255,255,0.05)]">
            <p className="text-gray-300">Images: <span className="text-white font-bold">{result.images?.length || 0}</span></p>
            <p className="text-gray-300">Next Cursor: <span className="text-white font-bold">{result.nextCursor ? '✅ Has more' : '❌ End'}</span></p>
          </div>
          
          {result.images && result.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {result.images.slice(0, 4).map((img: any, i: number) => (
                <img 
                  key={i} 
                  src={img.url} 
                  alt={img.id}
                  className="w-full aspect-square object-cover rounded"
                />
              ))}
            </div>
          )}
          
          {result.images && result.images.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <p className="text-yellow-400">⚠️ No images found. Check your Cloudinary folder.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}