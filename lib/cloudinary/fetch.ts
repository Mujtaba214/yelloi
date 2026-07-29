import { getClient, getAllAccounts } from './client';

async function fetchFromAccount(
  account: any,
  limit: number = 500,
  cursor?: string
) {
  try {
    const client = getClient(account.id);
    console.log(`📸 Fetching from ${account.id} (${account.email})...`);

    const result = await client.api.resources({
      type: 'upload',
      prefix: account.folder || '',
      max_results: Math.min(limit, 500),
      next_cursor: cursor,
      context: true,
    });

    console.log(`✅ ${account.id} returned ${result.resources?.length || 0} images`);

    return {
      accountId: account.id,
      cloudName: account.cloudName,
      email: account.email,
      images: (result.resources || []).map((resource: any) => ({
        id: resource.public_id,
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

  const results = await Promise.all(
    accounts.map(account =>
      fetchFromAccount(
        account,
        Math.ceil(limit / accounts.length) + 5,
        accountCursors[account.id] ?? undefined
      )
    )
  );

  const combinedImages: any[] = [];
  const nextCursors: Record<string, string | null> = {};

  results.forEach((result) => {
    combinedImages.push(...result.images);
    if (result.nextCursor) {
      nextCursors[result.accountId] = result.nextCursor;
    }
  });

  combinedImages.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const hasMore = Object.keys(nextCursors).length > 0;

  console.log(`📦 Combined: ${combinedImages.slice(0, limit).length} images`);

  return {
    images: combinedImages.slice(0, limit),
    nextCursor: hasMore ? JSON.stringify(nextCursors) : null,
  };
}

export async function getTotalImageCount() {
  try {
    const accounts = getAllAccounts();
    let total = 0;

    for (const account of accounts) {
      const client = getClient(account.id);
      const result = await client.api.resources({
        type: 'upload',
        max_results: 1,
      });
      total += result.resources?.length || 0;
    }

    return total;
  } catch (error) {
    console.error('Error getting total image count:', error);
    return 0;
  }
}