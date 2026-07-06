import type { BaseEntity, ListParams } from './common.js';

export interface Detection extends BaseEntity {
  tenantId: string;
  assetId?: string;
  ruleId?: string;
  ruleName?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'resolved' | 'false_positive';
  description?: string;
  details?: Record<string, unknown>;
  source?: string;
  timestamp?: string;
  mitreTactics?: string[];
  mitreTechniques?: string[];
}

export interface DetectionListParams extends ListParams {
  tenantId?: string;
  assetId?: string;
  severity?: string[];
  status?: string[];
  ruleId?: string[];
  source?: string[];
  fromDate?: string;
  toDate?: string;
}
