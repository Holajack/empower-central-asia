import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Community backend schema.
 *   users     — mirror of Clerk users (name, language, goals) for chat/presence
 *   progress  — one JSON blob per (user, course) so progress follows learners
 *   messages  — course chat, one channel per course
 *   presence  — heartbeat rows; "online" = seen in the last 2 minutes
 */
export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    language: v.string(),
    country: v.string(),
    goals: v.array(v.string()),
    color: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  progress: defineTable({
    clerkId: v.string(),
    course: v.string(),
    data: v.string(),
    updatedAt: v.number(),
  }).index("by_user_course", ["clerkId", "course"]),

  messages: defineTable({
    channel: v.string(),
    clerkId: v.string(),
    senderName: v.string(),
    senderInitial: v.string(),
    senderColor: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_channel", ["channel", "createdAt"]),

  presence: defineTable({
    channel: v.string(),
    clerkId: v.string(),
    firstName: v.string(),
    initial: v.string(),
    color: v.string(),
    weekNum: v.number(),
    dayNum: v.number(),
    lastSeen: v.number(),
  })
    .index("by_channel", ["channel", "lastSeen"])
    .index("by_user_channel", ["clerkId", "channel"]),
});
