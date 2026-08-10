import assert from "node:assert/strict";
import test from "node:test";

test("intentionally fails for CI testing", () => {
  assert.equal("actual", "expected");
});
