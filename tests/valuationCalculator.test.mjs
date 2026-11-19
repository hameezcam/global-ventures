import test, { describe, it } from "node:test";
import assert from "node:assert";

function calculateIndicativeEV(revenue, marginPercent, multipleMin, multipleMax) {
  const ebitda = revenue * (marginPercent / 100);
  const minEV = Number((ebitda * multipleMin).toFixed(1));
  const maxEV = Number((ebitda * multipleMax).toFixed(1));
  return { ebitda, minEV, maxEV };
}

describe("Valuation Formula & Multiple Calculations", () => {
  it("should calculate correct EBITDA and multiple ranges for tech SaaS profile", () => {
    // AED 30M Revenue, 20% Margin, Tech 6.5x – 9.5x
    const res = calculateIndicativeEV(30, 20, 6.5, 9.5);
    assert.strictEqual(res.ebitda, 6.0); // AED 6M EBITDA
    assert.strictEqual(res.minEV, 39.0); // 6 * 6.5 = 39.0M
    assert.strictEqual(res.maxEV, 57.0); // 6 * 9.5 = 57.0M
  });

  it("should calculate correct EV for healthcare specialty hospital", () => {
    // AED 50M Revenue, 25% Margin, Healthcare 7.0x – 10.0x
    const res = calculateIndicativeEV(50, 25, 7.0, 10.0);
    assert.strictEqual(res.ebitda, 12.5); // AED 12.5M EBITDA
    assert.strictEqual(res.minEV, 87.5);  // 12.5 * 7.0 = 87.5M
    assert.strictEqual(res.maxEV, 125.0); // 12.5 * 10.0 = 125.0M
  });

  it("should handle low margin manufacturing scenario gracefully", () => {
    // AED 100M Revenue, 10% Margin, Manufacturing 4.5x – 6.5x
    const res = calculateIndicativeEV(100, 10, 4.5, 6.5);
    assert.strictEqual(res.ebitda, 10.0);
    assert.strictEqual(res.minEV, 45.0);
    assert.strictEqual(res.maxEV, 65.0);
  });
});
