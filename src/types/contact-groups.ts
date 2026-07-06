import type { BaseEntity, ListParams } from './common.js';

export interface ContactGroupMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

export interface ContactGroup extends BaseEntity {
  name: string;
  description?: string;
  tenantIds: string[];
  members: ContactGroupMember[];
  enabled: boolean;
}

export interface ContactGroupListParams extends ListParams {
  tenantId?: string;
  enabled?: boolean;
  sortBy?: 'id' | 'name' | 'created' | 'updated';
}
