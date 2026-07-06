import { HttpClient } from '../http.js';
import { PaginatedResponse } from '../pagination.js';
import type {
  Vulnerability,
  VulnerabilityScan,
  DarkWebExposure,
  ExternalExposure,
  VulnerabilityListParams,
  ScanListParams,
  ExposureListParams
} from '../types/vulnerabilities.js';

export class VulnerabilitiesResource {
  constructor(private readonly httpClient: HttpClient) {}

  async listVulnerabilities(params?: VulnerabilityListParams): Promise<PaginatedResponse<Vulnerability>> {
    return this.httpClient.request<PaginatedResponse<Vulnerability>>('/vm-vulnerabilities/', {
      params,
    });
  }

  async getVulnerability(id: string): Promise<Vulnerability> {
    return this.httpClient.request<Vulnerability>(`/vm-vulnerabilities/${id}/`);
  }

  async listScans(params?: ScanListParams): Promise<PaginatedResponse<VulnerabilityScan>> {
    return this.httpClient.request<PaginatedResponse<VulnerabilityScan>>('/vm-scans/', {
      params,
    });
  }

  async getScan(id: string): Promise<VulnerabilityScan> {
    return this.httpClient.request<VulnerabilityScan>(`/vm-scans/${id}/`);
  }

  async listDarkWebExposures(params?: ExposureListParams): Promise<PaginatedResponse<DarkWebExposure>> {
    return this.httpClient.request<PaginatedResponse<DarkWebExposure>>('/vm-darkweb/', {
      params,
    });
  }

  async getDarkWebExposure(id: string): Promise<DarkWebExposure> {
    return this.httpClient.request<DarkWebExposure>(`/vm-darkweb/${id}/`);
  }

  async listExternalExposures(params?: ExposureListParams): Promise<PaginatedResponse<ExternalExposure>> {
    return this.httpClient.request<PaginatedResponse<ExternalExposure>>('/vm-external/', {
      params,
    });
  }

  async getExternalExposure(id: string): Promise<ExternalExposure> {
    return this.httpClient.request<ExternalExposure>(`/vm-external/${id}/`);
  }
}