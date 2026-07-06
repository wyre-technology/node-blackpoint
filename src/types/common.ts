export interface BaseEntity {
  id: string;
  created?: string;
  updated?: string;
  deleted?: string;
}

export type SortOrder = 'asc' | 'desc';

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  [key: string]: unknown;
}

export interface CreateParams {
  [key: string]: unknown;
}

export interface UpdateParams {
  [key: string]: unknown;
}
