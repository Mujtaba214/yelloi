// lib/cloudinary/client.ts
import { v2 as cloudinary } from 'cloudinary';

// 🔥 Force load environment variables
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const apiKey = process.env.CLOUDINARY_API_KEY || '';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '';

console.log('📸 Cloudinary Config Debug:');
console.log('  cloud_name:', cloudName || '❌ MISSING');
console.log('  api_key:', apiKey ? '✅ SET' : '❌ MISSING');
console.log('  api_secret:', apiSecret ? '✅ SET' : '❌ MISSING');

// Configure Cloudinary with explicit values
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// Verify configuration
const config = cloudinary.config();
console.log('✅ Cloudinary configured:', {
  cloud_name: config.cloud_name || '❌',
});

export const cloudinaryClient = cloudinary;