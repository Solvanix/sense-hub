import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("publication manifest", () => {
  it("documents only the explicit public fields", async () => {
    const caller = appRouter.createCaller({ user: null } as TrpcContext);
    const manifest = await caller.publications.contractManifest();

    expect(manifest.mode).toBe("publication-only");
    expect(manifest.resources.approvedProviderPublicSummary.allowedFields).not.toContain("reviewerNotes");
    expect(manifest.resources.publishedCatalogItem.excludedFields).toContain("customerData");
  });
});
