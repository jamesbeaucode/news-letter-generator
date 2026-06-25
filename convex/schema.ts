import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  emailTemplateId,
  newsletterFormData,
} from "./lib/newsletterValidators";

export default defineSchema({
  /**
   * Saved newsletters generated from an email template.
   * Embeds the full form/content payload used to render HTML.
   */
  newsletters: defineTable({
    title: v.string(),
    html: v.string(),
    data: newsletterFormData,
    templateId: emailTemplateId,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_created", ["createdAt"])
    .index("by_updated", ["updatedAt"])
    .index("by_template", ["templateId"])
    .index("by_template_and_updated", ["templateId", "updatedAt"]),

  /**
   * Email template metadata from `emails/` and `src/lib/email-templates.ts`.
   * Sample/preview content uses the same shape as newsletter form data.
   */
  emailTemplates: defineTable({
    templateId: emailTemplateId,
    name: v.string(),
    source: v.string(),
    description: v.string(),
    cardColor: v.string(),
    previewData: newsletterFormData,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_template_id", ["templateId"])
    .index("by_name", ["name"]),
});
