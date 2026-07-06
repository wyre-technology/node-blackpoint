import type { BaseEntity, ListParams } from './common.js';

export interface User extends BaseEntity {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  permissions?: string[];
  tenantIds: string[];
  enabled: boolean;
  lastLogin?: string;
}

export interface UserListParams extends ListParams {
  tenantId?: string;
  role?: string;
  enabled?: boolean;
  sortBy?: 'id' | 'username' | 'email' | 'role' | 'created' | 'lastLogin';
}
