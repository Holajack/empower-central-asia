import { v } from "convex/values";
import { requireIdentity, mutation, query } from "./lib";

export const get = query({
  args: { course: v.string() },
  handler: async (ctx, { course }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const row = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("clerkId", identity.subject).eq("course", course))
      .unique();
    return row ? { data: row.data, updatedAt: row.updatedAt } : null;
  },
});

export const set = mutation({
  args: { course: v.string(), data: v.string() },
  handler: async (ctx, { course, data }) => {
    const identity = await requireIdentity(ctx);
    if (data.length > 50_000) throw new Error("Progress payload too large");
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("clerkId", identity.subject).eq("course", course))
      .unique();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { data, updatedAt: now });
      return existing._id;
    }
    return ctx.db.insert("progress", { clerkId: identity.subject, course, data, updatedAt: now });
  },
});

export const all = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const rows = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("clerkId", identity.subject))
      .collect();
    return rows.map((r) => ({ course: r.course, data: r.data, updatedAt: r.updatedAt }));
  },
});
