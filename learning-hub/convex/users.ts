import { v } from "convex/values";
import { colorFor, requireIdentity, mutation, query } from "./lib";

export const upsert = mutation({
  args: {
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    language: v.string(),
    country: v.string(),
    goals: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const clerkId = identity.subject;
    const now = Date.now();
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: now });
      return existing._id;
    }
    return ctx.db.insert("users", { clerkId, ...args, color: colorFor(clerkId), createdAt: now, updatedAt: now });
  },
});

export const me = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

/** Simple language breakdown for the admin dashboard / exports. */
export const languageCounts = query({
  args: {},
  handler: async (ctx) => {
    await requireIdentity(ctx);
    const users = await ctx.db.query("users").collect();
    const counts: Record<string, number> = {};
    for (const u of users) counts[u.language] = (counts[u.language] ?? 0) + 1;
    return { total: users.length, counts };
  },
});
