import { HttpClient } from '../http.js';
import { PaginatedResponse } from '../pagination.js';
import type { Asset, AssetListParams, AssetRelationship, AssetRelationshipListParams } from '../types/assets.js';

export class AssetsResource {
  constructor(private readonly httpClient: HttpClient) {}

  async list(params: AssetListParams): Promise<PaginatedResponse<Asset>> {
    return this.httpClient.request<PaginatedResponse<Asset>>('/assets/', {
      params,
    });
  }

  async get(id: string): Promise<Asset> {
    return this.httpClient.request<Asset>(`/assets/${id}/`);
  }

  async listRelationships(
    assetId: string,
    params: AssetRelationshipListParams
  ): Promise<PaginatedResponse<AssetRelationship>> {
    return this.httpClient.request<PaginatedResponse<AssetRelationship>>(
      `/asset/${assetId}/relationships/`,
      { params }
    );
  }
}