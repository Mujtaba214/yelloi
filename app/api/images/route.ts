import { NextResponse } from 'next/server';
import { getClient, getAllAccounts } from '@/lib/cloudinary/client';

export const dynamic = 'force-dynamic';

async function fetchAllFromAccount(client: any, accountId: string, cloudName: string) {
  let allImages: any[] = [];
  let nextCursor: string | null = null;
  
  const prefixes = ['', 'yelloi', 'yelloi/'];
  let foundPrefix = '';
  
  for (const prefix of prefixes) {
    try {
      const result = await client.api.resources({
        type: 'upload',
        prefix: prefix,
        max_results: 500, 
        context: true,
      });
      
      if (result.resources?.length > 0) {
        foundPrefix = prefix;
        allImages = result.resources.map((resource: any) => ({
          id: resource.public_id,
          url: resource.secure_url,
          accountId: accountId,
          cloudName: cloudName,
          prompt: resource.context?.custom?.prompt || 'AI generated image',
          likes: 0,
          downloads: 0,
          views: 0,
          createdAt: resource.created_at || new Date().toISOString(),
        }));
        nextCursor = result.next_cursor || null;
        break;
      }
    } catch (e) {
      console.log(`No images in "${prefix || 'root'}" for ${accountId}`);
    }
  }
  
  if (allImages.length > 0 && nextCursor) {
    let cursor = nextCursor;
    while (cursor) {
      try {
        const result = await client.api.resources({
          type: 'upload',
          prefix: foundPrefix,
          max_results: 500,
          next_cursor: cursor,
          context: true,
        });
        
        const newImages = result.resources.map((resource: any) => ({
          id: resource.public_id,
          url: resource.secure_url,
          accountId: accountId,
          cloudName: cloudName,
          prompt: resource.context?.custom?.prompt || 'AI generated image',
          likes: 0,
          downloads: 0,
          views: 0,
          createdAt: resource.created_at || new Date().toISOString(),
        }));
        
        allImages = allImages.concat(newImages);
        cursor = result.next_cursor || null;
      } catch (e) {
        console.log(`Error fetching more from ${accountId}:`, e);
        break;
      }
    }
  }
  
  return allImages;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { limit = 20, cursor } = body;
    
    const accounts = getAllAccounts();
    const allImages: any[] = [];
    let nextCursor: string | null = null;

    for (const account of accounts) {
      const client = getClient(account.id);
      const images = await fetchAllFromAccount(client, account.id, account.cloudName);
      console.log(`✅ ${account.id} found ${images.length} images`);
      allImages.push(...images);
    }

    allImages.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    console.log(`📦 Total images found across all accounts: ${allImages.length}`);

    const startIndex = cursor ? parseInt(cursor) : 0;
    const endIndex = startIndex + limit;
    const paginatedImages = allImages.slice(startIndex, endIndex);
    const hasMore = endIndex < allImages.length;

    return NextResponse.json({
      images: paginatedImages,
      nextCursor: hasMore ? String(endIndex) : null,
      total: allImages.length,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}