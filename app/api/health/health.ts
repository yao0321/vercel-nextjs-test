export interface HealthPayload {
  ok: true;
  runtime: "nodejs";
  environment: string;
  region: string;
  commitSha: string | null;
  timestamp: string;
}

export interface DeploymentEnvironment {
  VERCEL_ENV?: string;
  VERCEL_REGION?: string;
  VERCEL_GIT_COMMIT_SHA?: string;
}

export function createHealthPayload(
  env: DeploymentEnvironment,
  now: () => Date = () => new Date()
): HealthPayload {
  return {
    ok: true,
    runtime: "nodejs",
    environment: env.VERCEL_ENV ?? "local",
    region: env.VERCEL_REGION ?? "local",
    commitSha: env.VERCEL_GIT_COMMIT_SHA ?? null,
    timestamp: now().toISOString()
  };
}
