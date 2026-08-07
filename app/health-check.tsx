"use client";

import { useEffect, useState } from "react";

import type { HealthPayload } from "./api/health/health";

type HealthState =
  | { status: "loading" }
  | { status: "success"; data: HealthPayload }
  | { status: "error"; message: string };

export function HealthCheck() {
  const [state, setState] = useState<HealthState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function checkHealth() {
      try {
        const response = await fetch("/api/health", {
          cache: "no-store",
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Health check failed with HTTP ${response.status}`);
        }

        const data = (await response.json()) as HealthPayload;
        setState({ status: "success", data });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          status: "error",
          message: error instanceof Error ? error.message : "Unknown health check error"
        });
      }
    }

    void checkHealth();
    return () => controller.abort();
  }, []);

  if (state.status === "loading") {
    return <div className="healthPanel healthLoading">Contacting the serverless function…</div>;
  }

  if (state.status === "error") {
    return (
      <div className="healthPanel healthError" role="alert">
        <strong>Health check failed</strong>
        <span>{state.message}</span>
      </div>
    );
  }

  const { data } = state;

  return (
    <div className="healthPanel healthSuccess">
      <div className="healthSummary">
        <span className="statusDot" aria-hidden="true" />
        <div>
          <strong>Serverless function is healthy</strong>
          <span>HTTP request completed successfully</span>
        </div>
      </div>
      <dl className="metrics">
        <div><dt>Environment</dt><dd>{data.environment}</dd></div>
        <div><dt>Region</dt><dd>{data.region}</dd></div>
        <div><dt>Runtime</dt><dd>{data.runtime}</dd></div>
        <div><dt>Commit</dt><dd>{data.commitSha ?? "Not available locally"}</dd></div>
        <div className="wideMetric"><dt>Request time</dt><dd>{data.timestamp}</dd></div>
      </dl>
    </div>
  );
}
