import { describe, expect, it, vi } from "vitest";
import { recordAuditEvent } from "./audit";

describe("audit boundary", () => {
  it("records a safe structured event", () => {
    const auditSpy = vi.spyOn(console, "info").mockImplementation(() => undefined);
    const event = recordAuditEvent({
      eventType: "publication_contract_manifest_read",
      resource: "publication-contracts",
      outcome: "allowed",
      occurredAt: "2026-08-23T00:00:00.000Z",
      metadata: { contractVersion: "2026-08-23.1" },
    });
    expect(event.outcome).toBe("allowed");
    expect(auditSpy).toHaveBeenCalledOnce();
    auditSpy.mockRestore();
  });

  it("rejects sensitive metadata before it can reach runtime logs", () => {
    expect(() => recordAuditEvent({
      eventType: "publication_contract_manifest_read",
      resource: "publication-contracts",
      outcome: "allowed",
      occurredAt: "2026-08-23T00:00:00.000Z",
      metadata: { email: "private@example.com" },
    })).toThrow("Sensitive audit metadata");
  });
});
