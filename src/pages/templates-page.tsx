import { render } from "react-email";
import { useEffect, useState } from "react";
import { EmailPreviewModal } from "@/components/email-preview-modal";
import { TemplateCard } from "@/components/template-card";
import {
  emailTemplates,
  type EmailTemplateDefinition,
} from "@/lib/email-templates";

type TemplatesPageProps = {
  onCreateNewsletter: (templateId: string) => void;
};

type TemplatePreview = {
  template: EmailTemplateDefinition;
  html: string;
};

export function TemplatesPage({ onCreateNewsletter }: TemplatesPageProps) {
  const [previews, setPreviews] = useState<TemplatePreview[]>([]);
  const [modalPreview, setModalPreview] = useState<TemplatePreview | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      emailTemplates.map(async (template) => {
        const html = await render(
          <template.component data={template.previewData} />,
        );
        return { template, html };
      }),
    ).then((results) => {
      if (!cancelled) setPreviews(results);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h2 className="text-base font-medium">Templates</h2>
          <p className="text-xs text-muted-foreground">
            Email layouts from the <code className="text-foreground">emails/</code>{" "}
            folder.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {emailTemplates.map((template) => {
            const preview = previews.find(
              (item) => item.template.id === template.id,
            );

            return (
              <TemplateCard
                key={template.id}
                template={template}
                previewReady={Boolean(preview?.html)}
                onPreview={() => {
                  if (preview) setModalPreview(preview);
                }}
                onCreate={() => onCreateNewsletter(template.id)}
              />
            );
          })}
        </div>
      </div>

      <EmailPreviewModal
        html={modalPreview?.html ?? ""}
        title={modalPreview?.template.name ?? "Template preview"}
        open={Boolean(modalPreview)}
        onClose={() => setModalPreview(null)}
      />
    </>
  );
}
