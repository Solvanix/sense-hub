import { describe, expect, it } from "vitest";
import { canPublishProviderProfile, providerIntakeStages } from "../shared/provider/intake";

describe("provider intake boundary", () => {
  it("keeps diagnostic growth data outside the publishable stages", () => {
    const growthStage = providerIntakeStages.find(stage => stage.id === "growth");
    expect(growthStage?.classification).toBe("تشخيص خاص");
  });

  it("requires independent consent, approval, and verified claims before publication", () => {
    expect(canPublishProviderProfile({ reviewConsent: true, publicListingConsent: true, reviewerApproved: true, allPublicClaimsVerified: false })).toBe(false);
    expect(canPublishProviderProfile({ reviewConsent: true, publicListingConsent: true, reviewerApproved: true, allPublicClaimsVerified: true })).toBe(true);
  });
});
