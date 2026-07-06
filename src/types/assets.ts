import type { BaseEntity, ListParams } from './common.js';

export type AssetClass = 'endpoint' | 'server' | 'network' | 'cloud' | 'mobile' | 'iot';
export type AssetRelationshipDirection = 'parent' | 'child' | 'sibling';
export type AssetStatus = 'active' | 'inactive' | 'decommissioned';

export interface Asset extends BaseEntity {
  accountId: string;
  tenantId: string;
  assetClass: AssetClass;
  classification?: string;
  criticality?: string;
  description?: string;
  displayName: string;
  name: string;
  status: AssetStatus;
  summary?: string;
  type?: string;
  foundBy?: string;
  foundOn?: string;
  lastSeenOn?: string;
  agentLastSeenOn?: string;
  agentDeactivatedOn?: string;
  lastLoginOn?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  deletedOn?: string;
}

export interface AssetListParams extends ListParams {
  class: AssetClass;
  withDeleted?: boolean;
  sources?: string[];
  platform?: string[];
  type?: string[];
  foundOn?: string[];
  lastSeenOn?: string[];
  decommissioned?: string[];
  wdStatus?: string[];
  filter?: string;
  sortBy?:
    | 'accountId'
    | 'assetClass'
    | 'classification'
    | 'createdBy'
    | 'createdOn'
    | 'criticality'
    | 'deletedBy'
    | 'deletedOn'
    | 'description'
    | 'displayName'
    | 'foundBy'
    | 'foundOn'
    | 'id'
    | 'lastSeenOn'
    | 'name'
    | 'status'
    | 'summary'
    | 'tenantId'
    | 'type'
    | 'updatedBy'
    | 'updatedOn'
    | 'agentLastSeenOn'
    | 'agentDeactivatedOn'
    | 'lastLoginOn';
}

export interface AssetRelationship extends BaseEntity {
  sourceAssetId: string;
  targetAssetId: string;
  relationshipType: string;
  direction: AssetRelationshipDirection;
}

export interface AssetRelationshipListParams extends ListParams {
  class: AssetClass;
  direction: AssetRelationshipDirection;
  withDeleted?: boolean;
  sortBy?: 'createdOn';
}
