import affiliatesData from '../data/affiliates.json';

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

export const affiliates: AffiliatesData = affiliatesData as AffiliatesData;

export function getProductAffiliate(productKey: string): ProductAffiliates {
  return affiliates[productKey] || {};
}

