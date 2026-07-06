import { HttpClient } from '../http.js';
import { PaginatedResponse } from '../pagination.js';
import type { Detection, DetectionListParams } from '../types/detections.js';

export class DetectionsResource {
  constructor(private readonly httpClient: HttpClient) {}

  async list(params?: DetectionListParams): Promise<PaginatedResponse<Detection>> {
    return this.httpClient.request<PaginatedResponse<Detection>>('/detections/', {
      params,
    });
  }

  async get(id: string): Promise<Detection> {
    return this.httpClient.request<Detection>(`/detections/${id}/`);
  }
}