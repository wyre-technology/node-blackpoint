import type { BaseEntity, ListParams } from './common.js';

export interface Collection extends BaseEntity {
  name: string;
  description?: string;
  tenantId: string;
  assetIds: string[];
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface CollectionListParams extends ListParams {
  tenantId?: string;
  tags?: string[];
  sortBy?: 'id' | 'name' | 'tenantId' | 'created' | 'updated';
}
