interface TokenBucket {
  tokens: number;
  lastRefill: number;
  capacity: number;
  refillRate: number; // tokens per second
}

export class RateLimiter {
  private bucket: TokenBucket;

  constructor(capacity: number = 60, refillRate: number = 1) {
    this.bucket = {
      tokens: capacity,
      lastRefill: Date.now(),
      capacity,
      refillRate,
    };
  }

  async acquire(tokens: number = 1): Promise<void> {
    this.refill();

    if (this.bucket.tokens >= tokens) {
      this.bucket.tokens -= tokens;
      return;
    }

    // Wait for tokens to refill
    const tokensNeeded = tokens - this.bucket.tokens;
    const waitTime = Math.ceil(tokensNeeded / this.bucket.refillRate) * 1000;

    await new Promise(resolve => setTimeout(resolve, waitTime));
    return this.acquire(tokens);
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = (now - this.bucket.lastRefill) / 1000;
    const tokensToAdd = Math.floor(timePassed * this.bucket.refillRate);

    this.bucket.tokens = Math.min(
      this.bucket.capacity,
      this.bucket.tokens + tokensToAdd
    );
    this.bucket.lastRefill = now;
  }

  getAvailableTokens(): number {
    this.refill();
    return this.bucket.tokens;
  }
}