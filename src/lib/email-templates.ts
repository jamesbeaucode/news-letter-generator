import type { ComponentType } from "react";
import Email from "../../emails/email";
import { sampleData, type NewsletterFormData } from "@/stores/newsLetterStore";

export type EmailTemplateDefinition = {
  id: string;
  name: string;
  source: string;
  description: string;
  cardColor: string;
  component: ComponentType<{ data?: NewsletterFormData }>;
  previewData: NewsletterFormData;
};

export const DEFAULT_EMAIL_TEMPLATE_ID = "ascend-newsletter";

export const emailTemplates: EmailTemplateDefinition[] = [
  {
    id: DEFAULT_EMAIL_TEMPLATE_ID,
    name: "Ascend Newsletter",
    source: "emails/email.tsx",
    description: "Primary newsletter layout used when creating campaigns.",
    cardColor: "#E63027",
    component: Email,
    previewData: sampleData,
  },
];

export function getEmailTemplate(id: string) {
  return emailTemplates.find((template) => template.id === id);
}

export function getEmailTemplateOrDefault(id: string) {
  return getEmailTemplate(id) ?? emailTemplates[0];
}
