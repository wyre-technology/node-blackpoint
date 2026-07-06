import type { BaseEntity, ListParams } from './common.js';

export interface Tenant extends BaseEntity {
  accountId: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'suspended';
  settings?: Record<string, unknown>;
  billingInfo?: Record<string, unknown>;
}

export interface TenantListParams extends ListParams {
  accountId?: string;
  status?: string[];
  sortBy?: 'id' | 'name' | 'status' | 'created' | 'updated';
}
