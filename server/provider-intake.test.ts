import { describe, expect, it } from "vitest";
import { canPublishProviderProfile, providerIntakeStages } from "../shared/provider/intake";
import { prohibitedPublicProviderFields, ruralTourismSurveyTrace } from "../shared/provider/surveyTrace";

describe("provider intake boundary", () => {
  it("keeps diagnostic growth data outside the publishable stages", () => {
    const growthStage = providerIntakeStages.find(stage => stage.id === "growth");
    expect(growthStage?.classification).toBe("تشخيص خاص");
  });

  it("requires independent consent, approval, and verified claims before publication", () => {
    expect(canPublishProviderProfile({ reviewConsent: true, publicListingConsent: true, reviewerApproved: true, allPublicClaimsVerified: false })).toBe(false);
    expect(canPublishProviderProfile({ reviewConsent: true, publicListingConsent: true, reviewerApproved: true, allPublicClaimsVerified: true })).toBe(true);
  });

  it("retains the traced rural-survey decisions instead of flattening them into one public form", () => {
    expect(ruralTourismSurveyTrace).toHaveLength(23);
    expect(ruralTourismSurveyTrace.find(item => item.source === "س12 الاستدامة")?.treatment).toBe("ادعاء يحتاج دليلًا");
    expect(ruralTourismSurveyTrace.find(item => item.source === "س8–9 النمو والعوائق")?.treatment).toBe("تشخيص خاص");
    expect(ruralTourismSurveyTrace.find(item => item.source === "س5–7 حجم وأداء")?.treatment).toBe("تشخيص خاص");
  });

  it("blocks contact, performance, reviewer, and location-sensitive fields from the public profile", () => {
    expect(prohibitedPublicProviderFields).toEqual(expect.arrayContaining([
      "contact.phone",
      "contact.email",
      "sales",
      "customer_count",
      "business_barriers",
      "reviewer_notes",
      "private_files",
      "precise_coordinates",
    ]));
  });
});
