import { v } from "convex/values";
import { colorFor, requireIdentity, mutation, query } from "./lib";

export const list = query({
  args: { channel: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { channel, limit }) => {
    const rows = await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channel", channel))
      .order("desc")
      .take(Math.min(limit ?? 100, 200));
    return rows.reverse().map((m) => ({
      _id: m._id,
      channel: m.channel,
      userId: m.clerkId,
      senderName: m.senderName,
      senderInitial: m.senderInitial,
      senderColor: m.senderColor,
      content: m.content,
      createdAt: m.createdAt,
    }));
  },
});

export const send = mutation({
  args: { channel: v.string(), content: v.string() },
  handler: async (ctx, { channel, content }) => {
    const identity = await requireIdentity(ctx);
    const trimmed = content.trim().slice(0, 500);
    if (!trimmed) throw new Error("Empty message");
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    const firstName = user?.firstName || (identity.givenName as string | undefined) || (identity.name as string | undefined) || "Learner";
    return ctx.db.insert("messages", {
      channel,
      clerkId: identity.subject,
      senderName: firstName,
      senderInitial: firstName.charAt(0).toUpperCase(),
      senderColor: user?.color ?? colorFor(identity.subject),
      content: trimmed,
      createdAt: Date.now(),
    });
  },
});
