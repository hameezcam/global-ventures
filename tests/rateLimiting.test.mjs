import test, { describe, it } from "node:test";
import assert from "node:assert";

function createRateLimiter(maxRequests = 5, windowMs = 1000) {
  const map = new Map();
  return function check(ip) {
    const now = Date.now();
    const threshold = now - windowMs;
    const record = map.get(ip) || { timestamps: [] };
    const active = record.timestamps.filter((t) => t > threshold);

    if (active.length >= maxRequests) {
      return { success: false, remaining: 0 };
    }
    active.push(now);
    map.set(ip, { timestamps: active });
    return { success: true, remaining: maxRequests - active.length };
  };
}

describe("Rate Limiter Sliding Window", () => {
  it("should permit requests within quota", () => {
    const limiter = createRateLimiter(3, 10000);
    const r1 = limiter("192.168.1.1");
    const r2 = limiter("192.168.1.1");
    assert.strictEqual(r1.success, true);
    assert.strictEqual(r2.success, true);
  });

  it("should block requests exceeding threshold", () => {
    const limiter = createRateLimiter(3, 10000);
    limiter("10.0.0.1");
    limiter("10.0.0.1");
    limiter("10.0.0.1");
    const r4 = limiter("10.0.0.1");
    assert.strictEqual(r4.success, false);
    assert.strictEqual(r4.remaining, 0);
  });

  it("should track distinct IPs independently", () => {
    const limiter = createRateLimiter(2, 10000);
    limiter("1.1.1.1");
    limiter("1.1.1.1");
    const blocked1 = limiter("1.1.1.1");
    const allowed2 = limiter("2.2.2.2");
    assert.strictEqual(blocked1.success, false);
    assert.strictEqual(allowed2.success, true);
  });
});
