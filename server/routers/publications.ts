import { router, publicProcedure } from "../_core/trpc";
import { recordAuditEvent } from "../audit";

/**
 * A discovery-only public API contract. It describes the narrow payloads that
 * an independently deployed service may publish after its own approval flow.
 * It intentionally contains no source-system reads and no private identifiers.
 */
export const publicationsRouter = router({
  contractManifest: publicProcedure.query(() => {
    recordAuditEvent({
      eventType: "publication_contract_manifest_read",
      resource: "publication-contracts",
      outcome: "allowed",
      occurredAt: new Date().toISOString(),
      metadata: { contractVersion: "2026-08-23.1" },
    });

    return {
      version: "2026-08-23.1",
      mode: "publication-only" as const,
      resources: {
        approvedProviderPublicSummary: {
          allowedFields: [
            "publicId",
            "displayName",
            "publicDescription",
            "category",
            "publicationStatus",
            "publishedAt",
          ],
          excludedFields: ["reviewerNotes", "phone", "email", "identity", "session", "privateFiles"],
        },
        publishedCatalogItem: {
          allowedFields: ["publicId", "title", "handle", "publicationStatus", "storefrontUrl", "publishedAt"],
          excludedFields: ["inventoryCost", "supplierNotes", "paymentDetails", "customerData"],
        },
      },
    };
  }),
});
