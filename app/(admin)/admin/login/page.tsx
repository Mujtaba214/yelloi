"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === process.env.ADMIN_PASSWORD) {
      // Set cookie
      document.cookie = 'admin_session=true; path=/; max-age=86400';
      router.push('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="bg-[#0c0c0c] p-8 rounded-xl border border-[rgba(255,255,255,0.05)] w-96">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          YELL<span className="text-yellow-400">O</span>I Admin
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white focus:outline-none focus:border-yellow-400/50"
              placeholder="Enter admin password"
            />
          </div>
          
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition-colors"
          >
            Login
          </button>
        </form>
        
      </div>
    </div>
  );
}