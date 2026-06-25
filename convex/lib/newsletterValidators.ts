import { v } from "convex/values";

/** Nullable string fields used throughout the newsletter form. */
export const nullableString = v.union(v.string(), v.null());

export const newsletterArticle = v.object({
  image: nullableString,
  category: nullableString,
  title: nullableString,
  description: nullableString,
  link: nullableString,
});

export const newsletterMainArticle = v.object({
  subTitle: nullableString,
  title: nullableString,
  description: nullableString,
});

export const newsletterSpotlight = v.object({
  image: nullableString,
  title: nullableString,
  description: nullableString,
  link: nullableString,
});

export const newsletterSubBlog = v.object({
  title: nullableString,
  description: nullableString,
});

export const newsletterBlog = v.object({
  title: nullableString,
  image: nullableString,
  description: nullableString,
  link: nullableString,
  subBlog: newsletterSubBlog,
});

export const newsletterSideLines = v.object({
  title: nullableString,
  link: nullableString,
  image: nullableString,
});

export const newsletterWhatNext = v.object({
  title: nullableString,
  description: nullableString,
});

/**
 * Full newsletter form/content payload matching `NewsletterFormData`
 * in `src/stores/newsLetterStore.ts`.
 */
export const newsletterFormData = v.object({
  heroImage: nullableString,
  heroTitle: nullableString,
  heroSubtitle: nullableString,
  mainArticle: newsletterMainArticle,
  spotlight: newsletterSpotlight,
  blog: newsletterBlog,
  articles: v.array(newsletterArticle),
  sideLines: newsletterSideLines,
  whatNext: newsletterWhatNext,
});

/** Known email templates from `emails/`. */
export const emailTemplateId = v.union(
  v.literal("ascend-newsletter"),
  v.literal("template-two"),
);

/** Payload for creating or updating a newsletter. */
export const newsletterInput = v.object({
  title: v.string(),
  html: v.string(),
  data: newsletterFormData,
  templateId: emailTemplateId,
});

/** Stored newsletter document returned from queries. */
export const newsletterDocument = v.object({
  _id: v.id("newsletters"),
  _creationTime: v.number(),
  title: v.string(),
  html: v.string(),
  data: newsletterFormData,
  templateId: emailTemplateId,
  createdAt: v.number(),
  updatedAt: v.number(),
});
