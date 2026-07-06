export { CompassOneClient } from './client.js';
export { DEFAULT_CONFIG } from './config.js';
export type { CompassOneConfig } from './config.js';

export {
  ServiceError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
} from './errors.js';

export type {
  BaseEntity,
  CreateParams,
  ListParams,
  SortOrder,
  UpdateParams,
} from './types/common.js';

export type {
  Account,
  AccountBillingVersion,
  AccountGetParams,
  AccountListParams,
  AccountPartnershipType,
} from './types/accounts.js';

export type {
  Asset,
  AssetClass,
  AssetListParams,
  AssetRelationship,
  AssetRelationshipDirection,
  AssetRelationshipListParams,
  AssetStatus,
} from './types/assets.js';

export type { Tenant, TenantListParams } from './types/tenants.js';

export type { Detection, DetectionListParams } from './types/detections.js';

export type {
  CiscoOnboarding,
  CloudOnboarding,
  CloudOnboardingListParams,
  CloudProvider,
  GoogleOnboarding,
  M365Onboarding,
} from './types/cloud-mdr.js';

export type {
  ContactGroup,
  ContactGroupListParams,
  ContactGroupMember,
} from './types/contact-groups.js';

export type {
  EmailChannel,
  NotificationChannel,
  NotificationChannelListParams,
  NotificationChannelType,
  WebhookChannel,
} from './types/notifications.js';

export type { User, UserListParams } from './types/users.js';

export type { Collection, CollectionListParams } from './types/collections.js';

export type {
  DarkWebExposure,
  ExposureListParams,
  ExternalExposure,
  ScanListParams,
  ScanStatus,
  Vulnerability,
  VulnerabilityListParams,
  VulnerabilityScan,
  VulnerabilitySeverity,
  VulnerabilityStatus,
} from './types/vulnerabilities.js';
