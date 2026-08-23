import { describe, expect, it } from "vitest";
import { approvedProviderPublicSummarySchema, publishedCatalogItemSchema } from "../shared/contracts/publication";

describe("publication contracts", () => {
  it("accepts only the explicitly public provider fields", () => {
    const result = approvedProviderPublicSummarySchema.safeParse({
      publicId: "5e5dafda-4c7f-42f2-b9ac-f62042b9b351",
      displayName: "مؤسسة مثال",
      publicDescription: "وصف عام تمت مراجعته.",
      category: "حرفة",
      publicationStatus: "approved",
      publishedAt: "2026-08-23T00:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });

  it("rejects reviewer notes and private contact fields at the publication boundary", () => {
    const result = approvedProviderPublicSummarySchema.safeParse({
      publicId: "5e5dafda-4c7f-42f2-b9ac-f62042b9b351",
      displayName: "مؤسسة مثال",
      publicDescription: "وصف عام تمت مراجعته.",
      category: "حرفة",
      publicationStatus: "approved",
      publishedAt: "2026-08-23T00:00:00.000Z",
      reviewerNotes: "ملاحظة داخلية ممنوع نشرها",
      phone: "+970000000000",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-published catalog item", () => {
    const result = publishedCatalogItemSchema.safeParse({
      publicId: "7063342c-1423-4283-b291-6dc2bfca8354",
      title: "عنصر تجريبي",
      handle: "sample-item",
      publicationStatus: "draft",
      storefrontUrl: "https://example.com/products/sample-item",
      publishedAt: "2026-08-23T00:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });
});
