// lib/cloudinary/fetch.ts
import { cloudinaryClient } from './client';

export async function fetchCloudinaryImages(
  limit: number = 20,
  cursor?: string
) {
  try {
    // 🔥 Check config before making API call
    const config = cloudinaryClient.config();
    if (!config.cloud_name) {
      throw new Error('Cloudinary cloud_name is not configured. Check your environment variables.');
    }

    console.log('📸 Fetching from Cloudinary (root directory)...');

    // 🔥 IMPORTANT: Use empty prefix for root directory
    const result = await cloudinaryClient.api.resources({
      type: 'upload',
      prefix: '', // Empty = root directory
      max_results: Math.min(limit, 500),
      next_cursor: cursor,
      context: true,
    });

    console.log(`✅ Cloudinary returned ${result.resources?.length || 0} images`);

    const images = (result.resources || []).map((resource: any) => ({
      id: resource.public_id || `img-${Date.now()}`,
      url: resource.secure_url || '',
      prompt: resource.context?.custom?.prompt || 'AI generated image',
      model: resource.context?.custom?.model || '',
      parameters: resource.context?.custom?.parameters || '',
      likes: 0,
      downloads: 0,
      views: 0,
      createdAt: resource.created_at || new Date().toISOString(),
    }));

    return {
      images,
      nextCursor: result.next_cursor || null,
    };
  } catch (error) {
    console.error('❌ Error fetching from Cloudinary:', error);
    return {
      images: [],
      nextCursor: null,
    };
  }
}

export async function fetchAllImages(limit: number = 20, cursor?: string) {
  console.log('🔍 fetchAllImages called with:', { limit, cursor });
  
  try {
    const result = await fetchCloudinaryImages(limit, cursor);
    console.log(`📦 Returned ${result.images.length} images`);
    return result;
  } catch (error) {
    console.error('❌ Error in fetchAllImages:', error);
    return {
      images: [],
      nextCursor: null,
    };
  }
}