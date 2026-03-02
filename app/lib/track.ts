export {};

declare global {
  interface Window {
    va?: (event: "event", payload: { name: string; data?: Record<string, unknown> }) => void;
  }
}

export const trackPlanClick = (
  plan: string,
  company: string,
  role: string,
  atsScore: number,
) => {
  if (typeof window === "undefined") return;

  const analytics = window.va;
  if (!analytics) return;

  analytics("event", {
    name: "plan_click",
    data: {
      plan,
      company,
      role,
      atsScore,
    },
  });
};
