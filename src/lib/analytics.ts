// Privacy-conscious Analytics Helper for UnitNov
// Strictly complies with GDPR & CCPA:
// Never transmits PII, calculation inputs, dates of birth, or numerical results.

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      action: string,
      params?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

export type EventType =
  | "tool_calculated"
  | "tool_copied"
  | "tool_shared"
  | "tool_downloaded"
  | "affiliate_clicked"
  | "search_performed";

interface SafeEventPayload {
  toolId: string;
  category?: string;
  label?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackSafeEvent(eventType: EventType, payload: SafeEventPayload): void {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  // Filter out any potential sensitive keys
  const safePayload: Record<string, string | number | boolean | undefined> = {
    event_category: payload.category || "Tools",
    tool_id: payload.toolId,
    event_label: payload.label,
  };

  try {
    window.gtag("event", eventType, safePayload);
  } catch {
    // Fail silently without disrupting user interaction
  }
}
