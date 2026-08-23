import { TRPCError } from "@trpc/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";
import { projectPublicProviderProfile } from "../shared/provider/publicProfile";

const dbMocks = vi.hoisted(() => ({
  getLatestProviderDraftForOwner: vi.fn(),
  saveProviderDraftForOwner: vi.fn(),
}));

vi.mock("./db", () => dbMocks);

import { appRouter } from "./routers";

const content = {
  brandName: "تجربة ريفية",
  tourismSubsector: "سياحة ريفية",
  serviceCategories: ["إقامة"],
  generalArea: "منطقة عامة",
  privateServiceDescription: "وصف خاص",
  publicServiceStory: "ملخص للمراجعة",
  languages: ["العربية"],
  bookingUrl: "",
  operatingSeasonality: "حسب الحجز",
  growthPriorities: ["تدريب"],
  businessBarriers: ["الوصول إلى العملاء"],
  sustainabilityStatement: "تصريح أولي",
  membershipStatement: "",
};

function context(ownerId: number): TrpcContext {
  return {
    user: { id: ownerId, openId: `provider-${ownerId}`, name: "Provider", email: null, loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

function anonymousContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("provider draft ownership boundary", () => {
  beforeEach(() => vi.clearAllMocks());

  it("does not return a draft if a persistence-layer mismatch points to another owner", async () => {
    dbMocks.getLatestProviderDraftForOwner.mockResolvedValue({ id: 41, ownerId: 77, content, processingConsent: 1, publicListingConsent: 0 });
    const caller = appRouter.createCaller(context(11));
    await expect(caller.providerDrafts.mine()).rejects.toMatchObject<Partial<TRPCError>>({ code: "FORBIDDEN" });
    expect(dbMocks.getLatestProviderDraftForOwner).toHaveBeenCalledWith(11);
  });

  it("binds every save to the authenticated owner and accepts no caller-controlled owner id", async () => {
    dbMocks.saveProviderDraftForOwner.mockResolvedValue({ id: 9, ownerId: 11, content, processingConsent: 1, publicListingConsent: 0, status: "draft" });
    const caller = appRouter.createCaller(context(11));
    await caller.providerDrafts.save({ processingConsent: true, publicListingConsent: false, content });
    expect(dbMocks.saveProviderDraftForOwner).toHaveBeenCalledWith(expect.objectContaining({ ownerId: 11, content }));
    expect(dbMocks.saveProviderDraftForOwner.mock.calls[0]?.[0]).not.toHaveProperty("requestedOwnerId");
  });

  it("does not touch a stored draft when a public caller attempts a read", async () => {
    dbMocks.getLatestProviderDraftForOwner.mockResolvedValue({ id: 41, ownerId: 11, content, processingConsent: 1, publicListingConsent: 0 });
    const caller = appRouter.createCaller(anonymousContext());
    await expect(caller.providerDrafts.mine()).rejects.toMatchObject<Partial<TRPCError>>({ code: "UNAUTHORIZED" });
    expect(dbMocks.getLatestProviderDraftForOwner).not.toHaveBeenCalled();
  });

  it("creates public output only through a separate whitelist projection of reviewed fields", () => {
    const privateDraft = {
      ...content,
      privateServiceDescription: "لا تنشر: يحتاج المشروع إلى تمويل وموقعه الدقيق حساس.",
      growthPriorities: ["تمويل"],
      businessBarriers: ["الوصول إلى العملاء"],
    };
    const publicProfile = projectPublicProviderProfile({
      brandName: privateDraft.brandName,
      providerType: privateDraft.tourismSubsector,
      generalArea: privateDraft.generalArea,
      publicServiceStory: privateDraft.publicServiceStory,
      languages: privateDraft.languages,
      publicLinks: [],
      publicListingConsent: true,
      reviewerApproved: true,
      contact: { name: "اسم خاص", email: "private@example.com", phone: "+000" },
      sales: "10000",
      businessBarriers: privateDraft.businessBarriers,
      reviewerNotes: "ملاحظة مراجعة خاصة",
      privateFiles: ["private.pdf"],
      preciseCoordinates: { latitude: 31.9, longitude: 35.2 },
      claims: [],
    });
    const serialised = JSON.stringify(publicProfile);
    [privateDraft.privateServiceDescription, "تمويل", "الوصول إلى العملاء", "private@example.com", "private.pdf", "31.9"].forEach(value => {
      expect(serialised).not.toContain(value);
    });
    expect(publicProfile).toMatchObject({ displayName: "تجربة ريفية", serviceStory: "ملخص للمراجعة" });
  });

  it("exposes no public provider-draft route through the root router", () => {
    const routeNames = Object.keys((appRouter as unknown as { _def: { record: Record<string, unknown> } })._def.record);
    expect(routeNames).toContain("providerDrafts");
    expect(routeNames).not.toContain("publicProviderDrafts");
  });
});
