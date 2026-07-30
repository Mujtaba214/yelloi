import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryAccount {
  id: string;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
  email: string;
}

export const CLOUDINARY_ACCOUNTS: CloudinaryAccount[] = [
  {
    id: 'account1',
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT1_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_ACCOUNT1_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_ACCOUNT1_API_SECRET || '',
    folder: 'yelloi',
    email: 'danikhaana111@gmail.com',
  },
  {
    id: 'account2',
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT2_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_ACCOUNT2_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_ACCOUNT2_API_SECRET || '',
    folder: 'yelloi',
    email: 'vicky.vulgar@gmail.com',
  },
  {
    id: 'account3',
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT3_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_ACCOUNT3_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_ACCOUNT3_API_SECRET || '',
    folder: 'yelloi',
    email: 'zeerakchingari@gmail.com',
  }
].filter(acc => acc.cloudName && acc.apiKey && acc.apiSecret);

const clients: Record<string, any> = {};

CLOUDINARY_ACCOUNTS.forEach(account => {
  cloudinary.config({
    cloud_name: account.cloudName,
    api_key: account.apiKey,
    api_secret: account.apiSecret,
  });
  clients[account.id] = cloudinary;
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

export function getAccountById(accountId: string) {
  return CLOUDINARY_ACCOUNTS.find(acc => acc.id === accountId);
}