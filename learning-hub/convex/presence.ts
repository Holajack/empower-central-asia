import { v } from "convex/values";
import { colorFor, requireIdentity, mutation, query } from "./lib";

const ONLINE_WINDOW_MS = 2 * 60 * 1000;

export const heartbeat = mutation({
  args: { channel: v.string(), weekNum: v.number(), dayNum: v.number() },
  handler: async (ctx, { channel, weekNum, dayNum }) => {
    const identity = await requireIdentity(ctx);
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    const firstName = user?.firstName || (identity.givenName as string | undefined) || "Learner";
    const existing = await ctx.db
      .query("presence")
      .withIndex("by_user_channel", (q) => q.eq("clerkId", identity.subject).eq("channel", channel))
      .unique();
    const row = {
      channel,
      clerkId: identity.subject,
      firstName,
      initial: firstName.charAt(0).toUpperCase(),
      color: user?.color ?? colorFor(identity.subject),
      weekNum,
      dayNum,
      lastSeen: Date.now(),
    };
    if (existing) {
      await ctx.db.patch(existing._id, row);
      return existing._id;
    }
    return ctx.db.insert("presence", row);
  },
});

export const list = query({
  args: { channel: v.string() },
  handler: async (ctx, { channel }) => {
    const since = Date.now() - ONLINE_WINDOW_MS;
    const rows = await ctx.db
      .query("presence")
      .withIndex("by_channel", (q) => q.eq("channel", channel).gte("lastSeen", since))
      .collect();
    return rows.map((r) => ({
      userId: r.clerkId,
      firstName: r.firstName,
      initial: r.initial,
      color: r.color,
      weekNum: r.weekNum,
      dayNum: r.dayNum,
    }));
  },
});
