import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  newsletterDocument,
  newsletterInput,
} from "./lib/newsletterValidators";

export const list = query({
  args: {},
  returns: v.array(newsletterDocument),
  handler: async (ctx) => {
    return await ctx.db
      .query("newsletters")
      .withIndex("by_updated")
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("newsletters") },
  returns: v.union(newsletterDocument, v.null()),
  handler: async (ctx, args) => {
    return await ctx.db.get("newsletters", args.id);
  },
});

export const create = mutation({
  args: { newsletter: newsletterInput },
  returns: v.id("newsletters"),
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("newsletters", {
      ...args.newsletter,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("newsletters"),
    newsletter: newsletterInput,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db.get("newsletters", args.id);
    if (!existing) {
      throw new Error("Newsletter not found");
    }

    await ctx.db.patch("newsletters", args.id, {
      ...args.newsletter,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("newsletters") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db.get("newsletters", args.id);
    if (!existing) {
      throw new Error("Newsletter not found");
    }

    await ctx.db.delete("newsletters", args.id);
    return null;
  },
});
