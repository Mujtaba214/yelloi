// lib/cloudinary/fetch.ts
import { getClient, getAllAccounts } from './client';

// 🔥 Fetch ALL images from ALL accounts (NO DEDUPLICATION)
export async function fetchAllImagesFromAllAccounts() {
  const accounts = getAllAccounts();
  console.log(`🔍 Fetching ALL images from ${accounts.length} accounts...`);

  const allImages: any[] = [];

  for (const account of accounts) {
    const client = getClient(account.id);
    console.log(`📸 Fetching from ${account.id} (${account.email})...`);

    let cursor: string | undefined = undefined;
    let hasMore = true;
    let batchCount = 0;

    while (hasMore) {
      try {
        // Try root first
        let result:any = await client.api.resources({
          type: 'upload',
          max_results: 500,
          next_cursor: cursor,
          context: true,
        });

        // If no images in root, try yelloi folder
        if (!result.resources || result.resources.length === 0) {
          result = await client.api.resources({
            type: 'upload',
            prefix: 'yelloi',
            max_results: 500,
            next_cursor: cursor,
            context: true,
          });
        }

        if (!result.resources || result.resources.length === 0) {
          console.log(`⚠️ No images found in ${account.id}`);
          break;
        }

        // 🔥 Add ALL images (NO deduplication)
        for (const resource of result.resources) {
          allImages.push({
            id: `${account.id}_${resource.public_id}`,
            originalId: resource.public_id,
            url: resource.secure_url,
            accountId: account.id,
            cloudName: account.cloudName,
            prompt: resource.context?.custom?.prompt || 'AI generated image',
            model: resource.context?.custom?.model || '',
            parameters: resource.context?.custom?.parameters || '',
            likes: 0,
            downloads: 0,
            views: 0,
            createdAt: resource.created_at || new Date().toISOString(),
          });
        }

        cursor = result.next_cursor || undefined;
        hasMore = !!result.next_cursor;
        batchCount++;
        console.log(`📊 ${account.id} batch ${batchCount}: ${result.resources.length} images (${allImages.length} total so far)`);

        if (batchCount > 100) break;
      } catch (error) {
        console.error(`❌ Error fetching from ${account.id}:`, error);
        hasMore = false;
      }
    }

    console.log(`✅ ${account.id} complete: ${allImages.filter(img => img.accountId === account.id).length} images`);
  }

  // 🔥 Sort: Account 1 first, then Account 2, then Account 3
  const accountOrder = ['account1', 'account2', 'account3'];
  allImages.sort((a, b) => {
    const aIndex = accountOrder.indexOf(a.accountId);
    const bIndex = accountOrder.indexOf(b.accountId);
    if (aIndex !== bIndex) return aIndex - bIndex;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  console.log(`📦 TOTAL images across all accounts: ${allImages.length}`);
  console.log(`📊 Account distribution:`, {
    account1: allImages.filter(img => img.accountId === 'account1').length,
    account2: allImages.filter(img => img.accountId === 'account2').length,
    account3: allImages.filter(img => img.accountId === 'account3').length,
  });

  return allImages;
}

// 🔥 Cache all images in memory
let cachedImages: any[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// 🔥 Get ALL images (NO pagination, NO limit)
export async function fetchAllImages() {
  // Check cache
  if (cachedImages && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
    console.log(`📦 Using cached images: ${cachedImages.length} total`);
    return {
      images: cachedImages,
      total: cachedImages.length,
    };
  }

  // Fetch fresh images
  const allImages = await fetchAllImagesFromAllAccounts();
  cachedImages = allImages;
  cacheTimestamp = Date.now();

  console.log(`📦 Returning ALL ${allImages.length} images (no pagination)`);

  return {
    images: allImages,
    total: allImages.length,
  };
}

export async function getTotalImageCount() {
  if (cachedImages) {
    return cachedImages.length;
  }
  
  const allImages = await fetchAllImagesFromAllAccounts();
  cachedImages = allImages;
  cacheTimestamp = Date.now();
  return allImages.length;
}

export function clearImageCache() {
  cachedImages = null;
  cacheTimestamp = null;
  console.log('🗑️ Image cache cleared');
}