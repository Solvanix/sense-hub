import { z } from "zod";

/**
 * These schemas are the only allowed cross-application payloads. They intentionally
 * exclude report evidence, reviewer notes, direct contact details, roles, and sessions.
 */
export const approvedProviderPublicSummarySchema = z.object({
  publicId: z.string().uuid(),
  displayName: z.string().min(1).max(120),
  publicDescription: z.string().min(1).max(800),
  category: z.string().min(1).max(80),
  publicationStatus: z.literal("approved"),
  publishedAt: z.string().datetime(),
}).strict();

export const publishedCatalogItemSchema = z.object({
  publicId: z.string().uuid(),
  title: z.string().min(1).max(160),
  handle: z.string().min(1).max(180),
  publicationStatus: z.literal("published"),
  storefrontUrl: z.string().url(),
  publishedAt: z.string().datetime(),
}).strict();

export type ApprovedProviderPublicSummary = z.infer<typeof approvedProviderPublicSummarySchema>;
export type PublishedCatalogItem = z.infer<typeof publishedCatalogItemSchema>;
