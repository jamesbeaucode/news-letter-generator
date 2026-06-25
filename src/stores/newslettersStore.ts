import type { Doc, Id } from "../../convex/_generated/dataModel";

export type SavedNewsletter = Doc<"newsletters">;
export type NewsletterId = Id<"newsletters">;

export type NewsletterInput = Pick<
  SavedNewsletter,
  "title" | "html" | "data" | "templateId"
>;
