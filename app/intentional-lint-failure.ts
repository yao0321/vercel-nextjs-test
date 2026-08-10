import { useState } from "react";

export function IntentionalLintFailure() {
  const shouldTriggerLintFailure = true;

  if (shouldTriggerLintFailure) {
    useState(0);
  }

  return null;
}
