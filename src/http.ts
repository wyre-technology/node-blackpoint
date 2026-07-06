import { CompassOneConfig, DEFAULT_CONFIG } from './config.js';
import { RateLimiter } from './rate-limiter.js';
import { buildQueryString, normalizePath } from './pagination.js';
import {
  ServiceError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
} from './errors.js';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
}

export class HttpClient {
  private readonly config: Required<CompassOneConfig>;
  private readonly rateLimiter: RateLimiter;

  constructor(config: CompassOneConfig) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    // Conservative rate limit: 60 requests per minute (1 per second)
    this.rateLimiter = new RateLimiter(60, 1);
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    await this.rateLimiter.acquire();

    const url = this.buildUrl(endpoint, options.params);
    const requestOptions: RequestInit = {
      method: options.method || 'GET',
      headers: this.buildHeaders(options.headers),
      signal: AbortSignal.timeout(options.timeout || this.config.timeout),
    };

    if (options.body && options.method !== 'GET') {
      requestOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, requestOptions);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ServiceError('Request timeout', 408, null);
      }
      throw error;
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
    const normalizedEndpoint = normalizePath(endpoint);
    const baseUrl = this.config.baseUrl.endsWith('/')
      ? this.config.baseUrl.slice(0, -1)
      : this.config.baseUrl;

    const url = `${baseUrl}${normalizedEndpoint}`;
    const queryString = params ? buildQueryString(params) : '';

    return `${url}${queryString}`;
  }

  private buildHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.config.apiToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': this.config.userAgent,
      ...additionalHeaders,
    };
  }

  // CRITICAL: Read body as text first, then parse JSON to avoid "Body already read" error
  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      if (response.status === 204) {
        return {} as T;
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          return await response.json() as T;
        } catch (error) {
          throw new ServiceError('Invalid JSON response', response.status, null);
        }
      }

      return {} as T;
    }

    // SAFE: Read text once, then try JSON.parse
    let responseBody: unknown;
    const rawText = await response.text();
    try {
      responseBody = JSON.parse(rawText);
    } catch {
      responseBody = rawText;
    }

    const message = this.extractErrorMessage(responseBody) || response.statusText || 'Unknown error';

    switch (response.status) {
      case 401:
        throw new AuthenticationError(message, responseBody);
      case 403:
        throw new ForbiddenError(message, responseBody);
      case 404:
        throw new NotFoundError(message, responseBody);
      case 400:
        const errors = this.extractValidationErrors(responseBody);
        throw new ValidationError(message, errors, responseBody);
      case 429:
        const retryAfter = this.extractRetryAfter(response);
        if (retryAfter > 0) {
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          // Retry once after rate limit delay
          return this.request(response.url.replace(this.config.baseUrl, ''));
        }
        throw new RateLimitError(message, retryAfter, responseBody);
      default:
        if (response.status >= 500) {
          throw new ServerError(message, response.status, responseBody);
        }
        throw new ServiceError(message, response.status, responseBody);
    }
  }

  private extractErrorMessage(responseBody: unknown): string | null {
    if (typeof responseBody === 'string') {
      return responseBody;
    }

    if (typeof responseBody === 'object' && responseBody !== null) {
      const obj = responseBody as Record<string, unknown>;
      return (obj.message || obj.error || obj.detail) as string;
    }

    return null;
  }

  private extractValidationErrors(responseBody: unknown): Array<{ field: string; message: string }> {
    if (typeof responseBody === 'object' && responseBody !== null) {
      const obj = responseBody as Record<string, unknown>;
      if (Array.isArray(obj.errors)) {
        return obj.errors;
      }
      if (obj.errors && typeof obj.errors === 'object') {
        return Object.entries(obj.errors).map(([field, message]) => ({
          field,
          message: String(message),
        }));
      }
    }
    return [];
  }

  private extractRetryAfter(response: Response): number {
    const retryAfter = response.headers.get('Retry-After');
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      return isNaN(seconds) ? 60 : seconds;
    }
    return 60; // Default 1 minute backoff
  }
}