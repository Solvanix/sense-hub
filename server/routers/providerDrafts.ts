import { ProviderDraftContent } from "../../drizzle/schema";
import * as db from "../db";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const contentSchema = z.object({
  brandName: z.string().trim().max(160),
  tourismSubsector: z.string().trim().max(80),
  serviceCategories: z.array(z.string().trim().max(80)).max(10),
  generalArea: z.string().trim().max(120),
  privateServiceDescription: z.string().trim().max(4000),
  publicServiceStory: z.string().trim().max(1200),
  languages: z.array(z.string().trim().max(40)).max(12),
  bookingUrl: z.string().trim().url().or(z.literal("")),
  operatingSeasonality: z.string().trim().max(120),
  growthPriorities: z.array(z.string().trim().max(160)).max(8),
  businessBarriers: z.array(z.string().trim().max(160)).max(8),
  sustainabilityStatement: z.string().trim().max(1200),
  membershipStatement: z.string().trim().max(1200),
}).strict();

const saveDraftSchema = z.object({
  processingConsent: z.literal(true),
  publicListingConsent: z.boolean(),
  content: contentSchema,
});

export const providerDraftsRouter = router({
  mine: protectedProcedure.query(async ({ ctx }) => {
    const draft = await db.getLatestProviderDraftForOwner(ctx.user.id);
    if (draft && draft.ownerId !== ctx.user.id) {
      console.error("[Provider drafts] ownership mismatch while reading draft", { requesterId: ctx.user.id, draftId: draft.id });
      throw new TRPCError({ code: "FORBIDDEN", message: "لا تملك صلاحية الوصول إلى هذه المسودة." });
    }
    return draft;
  }),

  save: protectedProcedure.input(saveDraftSchema).mutation(async ({ ctx, input }) => {
    try {
      return await db.saveProviderDraftForOwner({
        ownerId: ctx.user.id,
        processingConsent: input.processingConsent,
        publicListingConsent: input.publicListingConsent,
        content: input.content as ProviderDraftContent,
      });
    } catch (error) {
      console.error("[Provider drafts] failed to save private draft", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "تعذر حفظ المسودة حاليًا." });
    }
  }),
});
