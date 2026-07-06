import type { BaseEntity, ListParams } from './common.js';

export type NotificationChannelType = 'email' | 'webhook' | 'sms';

export interface NotificationChannel extends BaseEntity {
  name: string;
  type: NotificationChannelType;
  configuration: Record<string, unknown>;
  enabled: boolean;
}

export interface EmailChannel extends NotificationChannel {
  type: 'email';
  configuration: {
    email: string;
    smtpSettings?: Record<string, unknown>;
  };
}

export interface WebhookChannel extends NotificationChannel {
  type: 'webhook';
  configuration: {
    url: string;
    method?: 'POST' | 'PUT';
    headers?: Record<string, string>;
    retrySettings?: Record<string, unknown>;
  };
}

export interface NotificationChannelListParams extends ListParams {
  type?: NotificationChannelType;
  enabled?: boolean;
  sortBy?: 'id' | 'name' | 'type' | 'created' | 'updated';
}
