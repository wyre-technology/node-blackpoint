import { HttpClient } from '../http.js';
import { PaginatedResponse } from '../pagination.js';
import type {
  CloudOnboarding,
  CloudOnboardingListParams,
  M365Onboarding,
  GoogleOnboarding,
  CiscoOnboarding,
} from '../types/cloud-mdr.js';

export class CloudMdrResource {
  constructor(private readonly httpClient: HttpClient) {}

  async listOnboardings(params?: CloudOnboardingListParams): Promise<PaginatedResponse<CloudOnboarding>> {
    return this.httpClient.request<PaginatedResponse<CloudOnboarding>>('/cloud-mdr/', {
      params,
    });
  }

  async getOnboarding(id: string): Promise<CloudOnboarding> {
    return this.httpClient.request<CloudOnboarding>(`/cloud-mdr/${id}/`);
  }

  // Provider-specific methods
  async listM365Onboardings(params?: CloudOnboardingListParams): Promise<PaginatedResponse<M365Onboarding>> {
    return this.httpClient.request<PaginatedResponse<M365Onboarding>>('/cloud-mdr-m365/', {
      params,
    });
  }

  async listGoogleOnboardings(params?: CloudOnboardingListParams): Promise<PaginatedResponse<GoogleOnboarding>> {
    return this.httpClient.request<PaginatedResponse<GoogleOnboarding>>('/cloud-mdr-google/', {
      params,
    });
  }

  async listCiscoOnboardings(params?: CloudOnboardingListParams): Promise<PaginatedResponse<CiscoOnboarding>> {
    return this.httpClient.request<PaginatedResponse<CiscoOnboarding>>('/cloud-mdr-cisco/', {
      params,
    });
  }
}