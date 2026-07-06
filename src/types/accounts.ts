import type { BaseEntity, ListParams } from './common.js';

export type AccountBillingVersion = 'v1' | 'v2';
export type AccountPartnershipType = 'partner' | 'direct' | 'reseller';

export interface Account extends BaseEntity {
  name: string;
  partnershipType: AccountPartnershipType;
  billingVersion: AccountBillingVersion;
  createdBy?: string;
  branding?: Record<string, unknown>;
  logo?: string;
}

export interface AccountListParams extends ListParams {
  billingVersion?: AccountBillingVersion;
  partnershipType?: AccountPartnershipType;
  sortBy?: 'id' | 'name' | 'createdBy' | 'partnershipType' | 'billingVersion';
}

export interface AccountGetParams {
  includeBranding?: boolean;
  includeLogo?: boolean;
  [key: string]: unknown;
}
