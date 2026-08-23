type AuditEventType = "publication_contract_manifest_read";

export type AuditEvent = {
  eventType: AuditEventType;
  resource: "publication-contracts";
  outcome: "allowed" | "denied";
  occurredAt: string;
  metadata?: Record<string, string>;
};

const forbiddenAuditKeys = new Set(["token", "authorization", "email", "phone", "session", "cookie", "cartId"]);

/**
 * Runtime audit seam for public-boundary events. It uses the managed runtime
 * log and rejects sensitive metadata rather than duplicating application data.
 */
export function recordAuditEvent(event: AuditEvent): AuditEvent {
  for (const key of Object.keys(event.metadata ?? {})) {
    if (forbiddenAuditKeys.has(key.toLowerCase())) {
      throw new Error(`Sensitive audit metadata is not permitted: ${key}`);
    }
  }

  console.info("[SENSE audit]", JSON.stringify(event));
  return event;
}
