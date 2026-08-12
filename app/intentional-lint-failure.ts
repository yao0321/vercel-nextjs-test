import { useState } from "react";

export function IntentionalLintFailure() {
  const keepLintFailureActive = true;

  if (keepLintFailureActive) {
    useState(0);
  }

  return null;
}
