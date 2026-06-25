import { render } from "react-email";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/NewsletterForm";
import { EmailPreviewModal } from "@/components/email-preview-modal";
import { getEmailTemplateOrDefault } from "@/lib/email-templates";
import {
  createEmptyData,
  hasPopulatedData,
  useNewsLetterStore,
} from "@/stores/newsLetterStore";
import { useNewslettersStore } from "@/stores/newslettersStore";

type CreateNewsletterPageProps = {
  templateId: string;
  onCreated: () => void;
  onCancel: () => void;
};

export function CreateNewsletterPage({
  templateId,
  onCreated,
  onCancel,
}: CreateNewsletterPageProps) {
  const template = getEmailTemplateOrDefault(templateId);
  const TemplateComponent = template.component;

  const data = useNewsLetterStore((state) => state.data);
  const clearData = useNewsLetterStore((state) => state.clearData);
  const addNewsletter = useNewslettersStore((state) => state.addNewsletter);

  const canCreate = hasPopulatedData(data);
  const [isCreating, setIsCreating] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const createNewsletter = async () => {
    if (!canCreate || isCreating) return;

    setIsCreating(true);
    try {
      const currentData = useNewsLetterStore.getState().data;
      const html = await render(<TemplateComponent data={currentData} />);
      const title =
        currentData.heroTitle?.trim() ||
        currentData.mainArticle.title?.trim() ||
        "Untitled Newsletter";

      addNewsletter({
        title,
        html,
        data: currentData,
        templateId: template.id,
      });
      clearData();
      onCreated();
    } finally {
      setIsCreating(false);
    }
  };

  const previewNewsletter = async () => {
    const currentData = useNewsLetterStore.getState().data;
    const html = await render(<TemplateComponent data={currentData} />);
    setPreviewHtml(html);
  };

  const handleClear = () => {
    clearData();
  };

  return (
    <>
      <div className="flex flex-1 flex-col overflow-hidden p-4">
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div>
              <h2 className="text-base font-medium">Create newsletter</h2>
              <p className="text-xs text-muted-foreground">
                Using {template.name} ({template.source})
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={previewNewsletter}
                disabled={!canCreate}
              >
                Preview
              </Button>
              <Button type="button" variant="outline" onClick={handleClear}>
                Clear form
              </Button>
              <Button
                type="button"
                onClick={createNewsletter}
                disabled={!canCreate || isCreating}
              >
                {isCreating ? "Creating..." : "Create Newsletter"}
              </Button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <NewsletterForm />
          </div>
        </section>
      </div>

      <EmailPreviewModal
        html={previewHtml ?? ""}
        title={`${template.name} preview`}
        open={Boolean(previewHtml)}
        onClose={() => setPreviewHtml(null)}
      />
    </>
  );
}

export function resetCreateNewsletterForm() {
  useNewsLetterStore.setState({ data: createEmptyData() });
}
