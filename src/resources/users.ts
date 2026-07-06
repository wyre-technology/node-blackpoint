import { HttpClient } from '../http.js';
import { PaginatedResponse } from '../pagination.js';
import type { User, UserListParams } from '../types/users.js';

export class UsersResource {
  constructor(private readonly httpClient: HttpClient) {}

  async list(params?: UserListParams): Promise<PaginatedResponse<User>> {
    return this.httpClient.request<PaginatedResponse<User>>('/users/', {
      params,
    });
  }

  async get(id: string): Promise<User> {
    return this.httpClient.request<User>(`/users/${id}/`);
  }
}