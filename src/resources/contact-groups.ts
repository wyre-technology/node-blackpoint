import { HttpClient } from '../http.js';
import { PaginatedResponse } from '../pagination.js';
import type { ContactGroup, ContactGroupListParams } from '../types/contact-groups.js';

export class ContactGroupsResource {
  constructor(private readonly httpClient: HttpClient) {}

  async list(params?: ContactGroupListParams): Promise<PaginatedResponse<ContactGroup>> {
    return this.httpClient.request<PaginatedResponse<ContactGroup>>('/contact-groups/', {
      params,
    });
  }

  async get(id: string): Promise<ContactGroup> {
    return this.httpClient.request<ContactGroup>(`/contact-groups/${id}/`);
  }
}