import { index, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type ProviderDraftContent = {
  brandName: string;
  tourismSubsector: string;
  serviceCategories: string[];
  generalArea: string;
  privateServiceDescription: string;
  publicServiceStory: string;
  languages: string[];
  bookingUrl: string;
  operatingSeasonality: string;
  growthPriorities: string[];
  businessBarriers: string[];
  sustainabilityStatement: string;
  membershipStatement: string;
};

export const providerDrafts = mysqlTable("providerDrafts", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  status: mysqlEnum("status", ["draft"]).default("draft").notNull(),
  processingConsent: int("processingConsent").default(0).notNull(),
  publicListingConsent: int("publicListingConsent").default(0).notNull(),
  content: json("content").$type<ProviderDraftContent>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => [index("providerDrafts_ownerId_idx").on(table.ownerId)]);

export type ProviderDraft = typeof providerDrafts.$inferSelect;
export type InsertProviderDraft = typeof providerDrafts.$inferInsert;
