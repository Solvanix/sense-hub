import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, ProviderDraftContent, providerDrafts, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getLatestProviderDraftForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(providerDrafts)
    .where(eq(providerDrafts.ownerId, ownerId))
    .orderBy(desc(providerDrafts.updatedAt))
    .limit(1);

  return result[0];
}

export async function saveProviderDraftForOwner(input: {
  ownerId: number;
  processingConsent: boolean;
  publicListingConsent: boolean;
  content: ProviderDraftContent;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const latest = await getLatestProviderDraftForOwner(input.ownerId);
  const values = {
    processingConsent: input.processingConsent ? 1 : 0,
    publicListingConsent: input.publicListingConsent ? 1 : 0,
    content: input.content,
  };

  if (latest) {
    await db.update(providerDrafts).set(values).where(eq(providerDrafts.id, latest.id));
    return { ...latest, ...values, updatedAt: new Date() };
  }

  const result = await db.insert(providerDrafts).values({ ownerId: input.ownerId, ...values });
  return { id: Number(result[0].insertId), ownerId: input.ownerId, status: "draft" as const, ...values, createdAt: new Date(), updatedAt: new Date() };
}
