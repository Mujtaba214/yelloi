// lib/cloudinary/fetch.ts
import { getClient, getAllAccounts } from './client';

async function fetchFromAccount(
  account: any,
  limit: number = 500,
  cursor?: string
) {
  try {
    const client = getClient(account.id);
    console.log(`📸 Fetching from ${account.id} (${account.email})...`);
    console.log(`📁 Using folder: "${account.folder}"`);

    // 🔥 Try with and without trailing slash
    const prefixes = [account.folder, `${account.folder}/`, ''];
    let result = null;
    let usedPrefix = '';

    for (const prefix of prefixes) {
      try {
        const testResult = await client.api.resources({
          type: 'upload',
          prefix: prefix,
          max_results: Math.min(limit, 500),
          next_cursor: cursor,
          context: true,
        });
        
        if (testResult.resources && testResult.resources.length > 0) {
          result = testResult;
          usedPrefix = prefix;
          console.log(`✅ Found ${testResult.resources.length} images in "${prefix || 'root'}"`);
          break;
        }
      } catch (e) {
        console.log(`No images in "${prefix || 'root'}"`);
      }
    }

    if (!result) {
      console.log(`⚠️ No images found in ${account.id} for any prefix`);
      return {
        accountId: account.id,
        cloudName: account.cloudName,
        email: account.email,
        images: [],
        nextCursor: null,
      };
    }

    return {
      accountId: account.id,
      cloudName: account.cloudName,
      email: account.email,
      images: (result.resources || []).map((resource: any) => ({
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
      })),
      nextCursor: result.next_cursor || null,
    };
  } catch (error) {
    console.error(`❌ Error fetching from ${account.id}:`, error);
    return {
      accountId: account.id,
      cloudName: account.cloudName,
      email: account.email,
      images: [],
      nextCursor: null,
    };
  }
}

export async function fetchAllImages(limit: number = 20, cursor?: string) {
  const accounts = getAllAccounts();
  console.log(`🔍 Fetching from ${accounts.length} accounts...`);

  let accountCursors: Record<string, string | null> = {};
  if (cursor) {
    try {
      accountCursors = JSON.parse(cursor);
    } catch (e) {
      console.warn('Invalid cursor format, starting fresh');
    }
  }

  // 🔥 Fetch from all accounts in parallel
  const results = await Promise.all(
    accounts.map(account =>
      fetchFromAccount(
        account,
        Math.ceil(limit / accounts.length) + 10,
        accountCursors[account.id] ?? undefined
      )
    )
  );

  // 🔥 Combine images with deduplication
  const combinedImages: any[] = [];
  const nextCursors: Record<string, string | null> = {};
  const seenIds = new Set<string>();

  results.forEach((result) => {
    console.log(`📊 ${result.accountId}: ${result.images.length} images`);
    
    for (const image of result.images) {
      // 🔥 Use originalId or url as deduplication key
      const dedupKey = image.originalId || image.url;
      if (!seenIds.has(dedupKey)) {
        seenIds.add(dedupKey);
        combinedImages.push(image);
      } else {
        console.log(`⏭️ Skipping duplicate: ${dedupKey}`);
      }
    }
    
    if (result.nextCursor) {
      nextCursors[result.accountId] = result.nextCursor;
    }
  });

  // 🔥 Sort by createdAt (newest first)
  combinedImages.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const hasMore = Object.keys(nextCursors).length > 0;

  console.log(`📦 Total unique images: ${combinedImages.length}`);
  console.log(`📦 Returning: ${Math.min(combinedImages.length, limit)} images`);

  return {
    images: combinedImages.slice(0, limit),
    nextCursor: hasMore ? JSON.stringify(nextCursors) : null,
  };
}