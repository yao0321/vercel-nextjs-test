import assert from "node:assert/strict";
import test from "node:test";

import { createHealthPayload } from "./health";

const fixedDate = new Date("2026-08-07T00:00:00.000Z");

test("uses local defaults when Vercel metadata is unavailable", () => {
  assert.deepEqual(createHealthPayload({}, () => fixedDate), {
    ok: true,
    runtime: "nodejs",
    environment: "local",
    region: "local",
    commitSha: null,
    timestamp: "2026-08-07T00:00:00.000Z"
  });
});

test("preserves Vercel deployment metadata", () => {
  assert.deepEqual(
    createHealthPayload(
      {
        VERCEL_ENV: "preview",
        VERCEL_REGION: "hkg1",
        VERCEL_GIT_COMMIT_SHA: "abc123"
      },
      () => fixedDate
    ),
    {
      ok: true,
      runtime: "nodejs",
      environment: "preview",
      region: "hkg1",
      commitSha: "abc123",
      timestamp: "2026-08-07T00:00:00.000Z"
    }
  );
});
