import fs from 'node:fs';
import path from 'node:path';
import exampleAffiliates from '../data/affiliates.example.json';

export interface AffiliateItem {
  bannerUrl: string;
  imageUrl?: string;
  imageAlt?: string;
  textUrl?: string;
  textLabel?: string;
}

export interface ProductAffiliates {
  rakuten?: AffiliateItem;
  amazon?: AffiliateItem;
  yahoo?: AffiliateItem;
  official?: AffiliateItem;
  [key: string]: AffiliateItem | undefined;
}

export type AffiliatesData = Record<string, ProductAffiliates>;

let loadedAffiliates: AffiliatesData = exampleAffiliates as AffiliatesData;

const secretPath = path.resolve(process.cwd(), 'src/data/affiliates.secret.json');

try {
  if (fs.existsSync(secretPath)) {
    const raw = fs.readFileSync(secretPath, 'utf-8');
    const parsed = JSON.parse(raw);
    loadedAffiliates = { ...exampleAffiliates, ...parsed };
  }
} catch (e) {
  console.warn('[affiliate] Could not load affiliates.secret.json, using fallback example.', e);
}

export const affiliates: AffiliatesData = loadedAffiliates;

export function getProductAffiliate(productKey: string): ProductAffiliates {
  return affiliates[productKey] || {};
}
