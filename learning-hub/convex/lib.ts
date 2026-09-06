import {
  queryGeneric,
  mutationGeneric,
  type QueryBuilder,
  type MutationBuilder,
  type DataModelFromSchemaDefinition,
  type GenericMutationCtx,
  type GenericQueryCtx,
} from "convex/server";
import schema from "./schema";

/**
 * Typed function builders derived from schema.ts — equivalent to what
 * `npx convex codegen` writes into convex/_generated/server, so the backend
 * type-checks before the first deploy.
 */
export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
export const query = queryGeneric as QueryBuilder<DataModel, "public">;
export const mutation = mutationGeneric as MutationBuilder<DataModel, "public">;
export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;

export const AVATAR_COLORS = [
  "bg-[#C9922A]",
  "bg-[#1B2A4A]",
  "bg-emerald-600",
  "bg-sky-600",
  "bg-rose-500",
  "bg-violet-600",
  "bg-amber-600",
  "bg-teal-600",
];

export function colorFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

type Ctx = QueryCtx | MutationCtx;

/** Returns the Clerk user id (JWT `sub`) or throws when not signed in. */
export async function requireIdentity(ctx: Ctx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not signed in");
  return identity;
}
