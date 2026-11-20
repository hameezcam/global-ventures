import { describe, it } from "node:test";
import assert from "node:assert";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Each photograph should appear in only one place on the site. Photo ids are
// written once in the source (src/data/homepage.ts PHOTOS, or a data file for
// sector and article images); this test fails if an id is written twice.
function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : /\.(tsx?|mjs)$/.test(name) ? [p] : [];
  });
}

describe("Photographs", () => {
  it("are each used once", () => {
    const seen = new Map();
    for (const file of files("src")) {
      for (const [id] of readFileSync(file, "utf8").matchAll(/photo-\d+-[0-9a-f]{12}/g)) {
        seen.set(id, [...(seen.get(id) ?? []), file]);
      }
    }
    const repeated = [...seen].filter(([, where]) => where.length > 1);
    assert.deepStrictEqual(repeated, [], `Repeated photos: ${JSON.stringify(repeated, null, 2)}`);
  });
});
