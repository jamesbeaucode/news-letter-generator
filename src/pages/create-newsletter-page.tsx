import { render } from "react-email";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/NewsletterForm";
import { EmailPreviewModal } from "@/components/email-preview-modal";
import { getEmailTemplateOrDefault } from "@/lib/email-templates";
import {
  createEmptyData,
  hasPopulatedData,
  useNewsLetterStore,
} from "@/stores/newsLetterStore";

type CreateNewsletterPageProps = {
  templateId: string;
  newsletterId?: Id<"newsletters">;
  onSaved: () => void;
  onCancel: () => void;
};

function getNewsletterTitle(
  data: ReturnType<typeof useNewsLetterStore.getState>["data"],
) {
  return (
    data.heroTitle?.trim() ||
    data.mainArticle.title?.trim() ||
    "Untitled Newsletter"
  );
}

export function CreateNewsletterPage({
  templateId,
  newsletterId,
  onSaved,
  onCancel,
}: CreateNewsletterPageProps) {
  const isEditing = Boolean(newsletterId);
  const existingNewsletter = useQuery(
    api.newsletters.get,
    newsletterId ? { id: newsletterId } : "skip",
  );
  const createNewsletter = useMutation(api.newsletters.create);
  const updateNewsletter = useMutation(api.newsletters.update);

  const resolvedTemplateId =
    isEditing && existingNewsletter
      ? existingNewsletter.templateId
      : templateId;
  const template = getEmailTemplateOrDefault(resolvedTemplateId);
  const TemplateComponent = template.component;

  const data = useNewsLetterStore((state) => state.data);
  const setData = useNewsLetterStore((state) => state.setData);
  const clearData = useNewsLetterStore((state) => state.clearData);

  const canSave = hasPopulatedData(data);
  const [isSaving, setIsSaving] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const loadedNewsletterIdRef = useRef<Id<"newsletters"> | null>(null);

  useEffect(() => {
    if (!newsletterId) {
      loadedNewsletterIdRef.current = null;
      return;
    }
    if (!existingNewsletter) return;
    if (loadedNewsletterIdRef.current === newsletterId) return;

    loadedNewsletterIdRef.current = newsletterId;
    setData(structuredClone(existingNewsletter.data));
  }, [existingNewsletter, newsletterId, setData]);

  const saveNewsletter = async () => {
    if (!canSave || isSaving) return;

    setIsSaving(true);
    setSaveError(null);
    try {
      const currentData = useNewsLetterStore.getState().data;
      const html = await render(<TemplateComponent data={currentData} />);
      const payload = {
        title: getNewsletterTitle(currentData),
        html,
        data: currentData,
        templateId: template.id as "ascend-newsletter" | "template-two",
      };

      if (newsletterId) {
        await updateNewsletter({ id: newsletterId, newsletter: payload });
      } else {
        await createNewsletter({ newsletter: payload });
      }

      clearData();
      onSaved();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Failed to save newsletter",
      );
    } finally {
      setIsSaving(false);
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

  if (isEditing && existingNewsletter === undefined) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Loading newsletter...</p>
      </div>
    );
  }

  if (isEditing && existingNewsletter === null) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
        <p className="text-sm text-muted-foreground">Newsletter not found.</p>
        <Button type="button" variant="outline" onClick={onCancel}>
          Back to newsletters
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col overflow-hidden p-4">
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div>
              <h2 className="text-base font-medium">
                {isEditing ? "Edit newsletter" : "Create newsletter"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Using {template.name} ({template.source})
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {saveError && (
                <span className="text-xs text-destructive">{saveError}</span>
              )}
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={previewNewsletter}
                disabled={!canSave}
              >
                Preview
              </Button>
              <Button type="button" variant="outline" onClick={handleClear}>
                Clear form
              </Button>
              <Button
                type="button"
                onClick={saveNewsletter}
                disabled={!canSave || isSaving}
              >
                {isSaving
                  ? "Saving..."
                  : isEditing
                    ? "Save Newsletter"
                    : "Create Newsletter"}
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

export function loadNewsletterForEdit(
  data: ReturnType<typeof useNewsLetterStore.getState>["data"],
) {
  useNewsLetterStore.setState({ data: structuredClone(data) });
}
