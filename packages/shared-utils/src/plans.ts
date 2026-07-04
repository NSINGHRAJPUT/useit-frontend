import type { PlanLimit } from "@toolkit-pro/shared-types";

export const planLimits: Record<"FREE" | "PRO" | "BUSINESS", PlanLimit> = {
  FREE: { plan: "FREE", maxUploadMb: 25, dailyConversions: 10, priorityProcessing: false },
  PRO: { plan: "PRO", maxUploadMb: 100, dailyConversions: 100, priorityProcessing: true },
  BUSINESS: { plan: "BUSINESS", maxUploadMb: 250, dailyConversions: null, priorityProcessing: true },
};
