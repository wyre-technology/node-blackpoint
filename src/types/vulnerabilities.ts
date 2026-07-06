import type { BaseEntity, ListParams } from './common.js';

export type VulnerabilitySeverity = 'low' | 'medium' | 'high' | 'critical';
export type VulnerabilityStatus = 'open' | 'fixed' | 'ignored' | 'false_positive';
export type ScanStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Vulnerability extends BaseEntity {
  assetId: string;
  tenantId: string;
  cveId?: string;
  severity: VulnerabilitySeverity;
  status: VulnerabilityStatus;
  title: string;
  description?: string;
  solution?: string;
  cvssScore?: number;
  publishedDate?: string;
  discoveredDate?: string;
  patchAvailable?: boolean;
  exploitAvailable?: boolean;
}

export interface VulnerabilityScan extends BaseEntity {
  tenantId: string;
  assetIds: string[];
  status: ScanStatus;
  startedAt?: string;
  completedAt?: string;
  vulnerabilityCount?: number;
  error?: string;
}

export interface DarkWebExposure extends BaseEntity {
  tenantId: string;
  exposureType: 'credentials' | 'documents' | 'data_breach' | 'malware';
  severity: VulnerabilitySeverity;
  description: string;
  source?: string;
  discoveredDate?: string;
  affectedAssets?: string[];
}

export interface ExternalExposure extends BaseEntity {
  tenantId: string;
  assetId?: string;
  exposureType: 'open_port' | 'vulnerable_service' | 'certificate_issue' | 'misconfiguration';
  severity: VulnerabilitySeverity;
  description: string;
  remediationSteps?: string[];
  discoveredDate?: string;
}

export interface VulnerabilityListParams extends ListParams {
  assetId?: string;
  tenantId?: string;
  severity?: VulnerabilitySeverity[];
  status?: VulnerabilityStatus[];
  cveId?: string;
  patchAvailable?: boolean;
  exploitAvailable?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface ScanListParams extends ListParams {
  tenantId?: string;
  status?: ScanStatus[];
  assetId?: string;
  fromDate?: string;
  toDate?: string;
}

export interface ExposureListParams extends ListParams {
  tenantId?: string;
  exposureType?: string[];
  severity?: VulnerabilitySeverity[];
  fromDate?: string;
  toDate?: string;
}
