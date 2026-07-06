export interface PaginationParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination?: {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    hasNext?: boolean;
    cursor?: string;
    nextCursor?: string;
  };
}

export function normalizePath(path: string): string {
  // Ensure paths end with trailing slash to avoid redirects that strip auth headers
  const normalized = path.replace(/\/+/g, '/');
  return normalized.endsWith('/') ? normalized : `${normalized}/`;
}

export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.set(key, String(value));
      }
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}