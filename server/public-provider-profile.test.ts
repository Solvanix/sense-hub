import { describe, expect, it } from "vitest";
import { projectPublicProviderProfile } from "../shared/provider/publicProfile";

const privateProvider = {
  brandName: "بيت التين الريفي",
  providerType: "إقامة ريفية",
  generalArea: "منطقة عامة",
  publicServiceStory: "إقامة صغيرة وتجربة طبخ محلية بالحجز المسبق.",
  languages: ["العربية", "الإنجليزية"],
  publicLinks: [{ label: "استعلام", url: "https://example.com/contact" }],
  publicListingConsent: true,
  reviewerApproved: true,
  contact: { name: "مقدم خاص", email: "private@example.com", phone: "+000000000" },
  sales: "10000-50000",
  customerCount: "50-100",
  businessBarriers: ["الوصول إلى العملاء"],
  reviewerNotes: "ملاحظة داخلية",
  privateFiles: ["evidence/private.pdf"],
  preciseCoordinates: { latitude: 31.9, longitude: 35.2 },
  claims: [
    { type: "استدامة", value: "تقليل البلاستيك", status: "verified" as const, providerApprovedForPublicDisplay: true },
    { type: "عضوية", value: "جمعية محلية", status: "provider_stated" as const, providerApprovedForPublicDisplay: true },
    { type: "وصول", value: "مدخل مناسب", status: "verified" as const, providerApprovedForPublicDisplay: false },
  ],
};

describe("public provider profile projection", () => {
  it("returns null without independent public consent and reviewer approval", () => {
    expect(projectPublicProviderProfile({ ...privateProvider, publicListingConsent: false })).toBeNull();
    expect(projectPublicProviderProfile({ ...privateProvider, reviewerApproved: false })).toBeNull();
  });

  it("whitelists only public fields and verified provider-approved claims", () => {
    const result = projectPublicProviderProfile(privateProvider);
    expect(result).toEqual({
      displayName: "بيت التين الريفي",
      providerType: "إقامة ريفية",
      generalArea: "منطقة عامة",
      serviceStory: "إقامة صغيرة وتجربة طبخ محلية بالحجز المسبق.",
      languages: ["العربية", "الإنجليزية"],
      links: [{ label: "استعلام", url: "https://example.com/contact" }],
      verifiedClaims: [{ type: "استدامة", value: "تقليل البلاستيك" }],
    });
  });

  it("never exposes contact, performance, barriers, files, reviewer notes, or precise coordinates", () => {
    const result = projectPublicProviderProfile(privateProvider);
    const serialised = JSON.stringify(result);
    ["private@example.com", "+000000000", "10000-50000", "50-100", "الوصول إلى العملاء", "ملاحظة داخلية", "private.pdf", "31.9", "35.2"].forEach(value => {
      expect(serialised).not.toContain(value);
    });
  });
});
