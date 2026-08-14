// lib/cloudinary/client.ts
import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryAccount {
  id: string;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
  email: string;
}

// 🔥 All 3 accounts with correct folder
export const CLOUDINARY_ACCOUNTS: CloudinaryAccount[] = [
  {
    id: 'account1',
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT1_CLOUD_NAME || 'hqmclxks',
    apiKey: process.env.CLOUDINARY_ACCOUNT1_API_KEY || '987674361558843',
    apiSecret: process.env.CLOUDINARY_ACCOUNT1_API_SECRET || 'iJFIf4--NLhIdOufcd3EttnWA5w',
    folder: 'yelloi', // 🔥 Just the folder name, no slash
    email: 'danikhaana111@gmail.com',
  },
  {
    id: 'account2',
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT2_CLOUD_NAME || 'dejbblcx',
    apiKey: process.env.CLOUDINARY_ACCOUNT2_API_KEY || '632961289596975',
    apiSecret: process.env.CLOUDINARY_ACCOUNT2_API_SECRET || 'J4-ag4hSVwtgr2JmI7ecZ4PBp7k',
    folder: 'yelloi',
    email: 'vicky.vulgar@gmail.com',
  },
  {
    id: 'account3',
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT3_CLOUD_NAME || 'wn7cgvsu',
    apiKey: process.env.CLOUDINARY_ACCOUNT3_API_KEY || '592544786585729',
    apiSecret: process.env.CLOUDINARY_ACCOUNT3_API_SECRET || 'DgpHiumCPeGSoscAzcVXPj-KGXY',
    folder: 'yelloi',
    email: 'zeerakchingari@gmail.com',
  },
].filter(acc => acc.cloudName && acc.apiKey && acc.apiSecret);

// 🔥 Create clients for all accounts
const clients: Record<string, any> = {};

CLOUDINARY_ACCOUNTS.forEach(account => {
  const client = cloudinary;
  client.config({
    cloud_name: account.cloudName,
    api_key: account.apiKey,
    api_secret: account.apiSecret,
  });
  clients[account.id] = client;
  console.log(`✅ Cloudinary configured: ${account.id} (${account.email})`);
});

export function getClient(accountId: string) {
  const client = clients[accountId];
  if (!client) {
    throw new Error(`Cloudinary client not found for account: ${accountId}`);
  }
  return client;
}

export function getAllAccounts() {
  return CLOUDINARY_ACCOUNTS;
}