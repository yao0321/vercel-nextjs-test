import { useState } from "react";

export function IntentionalLintFailure() {
  if (true) {
    useState(0);
  }

  return null;
}
