import type { BaseEntity, ListParams } from './common.js';

export type CloudProvider = 'm365' | 'google' | 'cisco';

export interface CloudOnboarding extends BaseEntity {
  tenantId: string;
  provider: CloudProvider;
  status: 'pending' | 'active' | 'error' | 'disabled';
  configuration?: Record<string, unknown>;
  lastSync?: string;
  error?: string;
}

export interface M365Onboarding extends CloudOnboarding {
  provider: 'm365';
  configuration?: {
    tenantId?: string;
    applicationId?: string;
    directoryId?: string;
  };
}

export interface GoogleOnboarding extends CloudOnboarding {
  provider: 'google';
  configuration?: {
    projectId?: string;
    organizationId?: string;
    adminEmail?: string;
  };
}

export interface CiscoOnboarding extends CloudOnboarding {
  provider: 'cisco';
  configuration?: {
    apiKey?: string;
    apiSecret?: string;
    integrationKey?: string;
  };
}

export interface CloudOnboardingListParams extends ListParams {
  provider?: CloudProvider;
  status?: string[];
  tenantId?: string;
}
