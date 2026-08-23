import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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

function context(user: TrpcContext["user"]): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("provider drafts router", () => {
  it("rejects draft reads without an authenticated owner", async () => {
    const caller = appRouter.createCaller(context(null));
    await expect(caller.providerDrafts.mine()).rejects.toMatchObject<Partial<TRPCError>>({ code: "UNAUTHORIZED" });
  });

  it("rejects saving without private-draft processing consent before database access", async () => {
    const caller = appRouter.createCaller(context({ id: 9, openId: "provider-9", name: "Provider", email: null, loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }));
    await expect(caller.providerDrafts.save({ processingConsent: false, publicListingConsent: false, content })).rejects.toMatchObject<Partial<TRPCError>>({ code: "BAD_REQUEST" });
  });

  it("rejects precise-location fields not defined by the private draft contract", async () => {
    const caller = appRouter.createCaller(context({ id: 9, openId: "provider-9", name: "Provider", email: null, loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }));
    await expect(caller.providerDrafts.save({ processingConsent: true, publicListingConsent: false, content: { ...content, preciseCoordinates: { latitude: 31.9, longitude: 35.2 } } })).rejects.toMatchObject<Partial<TRPCError>>({ code: "BAD_REQUEST" });
  });
});
