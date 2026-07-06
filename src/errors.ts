export class ServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response: unknown
  ) {
    super(message);
    this.name = 'ServiceError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class AuthenticationError extends ServiceError {
  constructor(message: string, response: unknown) {
    super(message, 401, response);
    this.name = 'AuthenticationError';
  }
}

export class ForbiddenError extends ServiceError {
  constructor(message: string, response: unknown) {
    super(message, 403, response);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ServiceError {
  constructor(message: string, response: unknown) {
    super(message, 404, response);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends ServiceError {
  constructor(
    message: string,
    public errors: Array<{ field: string; message: string }>,
    response: unknown
  ) {
    super(message, 400, response);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends ServiceError {
  constructor(
    message: string,
    public retryAfter: number,
    response: unknown
  ) {
    super(message, 429, response);
    this.name = 'RateLimitError';
  }
}

export class ServerError extends ServiceError {
  constructor(message: string, statusCode: number, response: unknown) {
    super(message, statusCode, response);
    this.name = 'ServerError';
  }
}