import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { EmailPreviewModal } from "@/components/email-preview-modal";
import { NewsletterCard } from "@/components/newsletter-card";
import {
  useNewslettersStore,
  type SavedNewsletter,
} from "@/stores/newslettersStore";

type NewsletterPageProps = {
  onCreateNewsletter: () => void;
};

export function NewsletterPage({ onCreateNewsletter }: NewsletterPageProps) {
  const newsletters = useNewslettersStore((state) => state.newsletters);
  const removeNewsletter = useNewslettersStore((state) => state.removeNewsletter);

  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("Email Preview");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const openPreview = (newsletter: SavedNewsletter) => {
    setPreviewTitle(newsletter.title);
    setPreviewHtml(newsletter.html);
  };

  const copyHtml = async (html: string, label: string) => {
    try {
      await navigator.clipboard.writeText(html);
      setCopyStatus(label);
      setTimeout(() => setCopyStatus(null), 2000);
    } catch {
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-medium">All newsletters</h2>
            <p className="text-xs text-muted-foreground">
              Saved newsletters with HTML previews.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {copyStatus && (
              <span className="text-xs text-muted-foreground">{copyStatus}</span>
            )}
            <Button type="button" size="sm" onClick={onCreateNewsletter}>
              <PlusIcon />
              Create Newsletter
            </Button>
          </div>
        </div>

        {newsletters.length === 0 ? (
          <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              No newsletters yet. Create your first one to get started.
            </p>
            <Button type="button" onClick={onCreateNewsletter}>
              <PlusIcon />
              Create Newsletter
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {newsletters.map((newsletter) => (
              <NewsletterCard
                key={newsletter.id}
                newsletter={newsletter}
                onPreview={() => openPreview(newsletter)}
                onCopy={() =>
                  copyHtml(newsletter.html, `Copied ${newsletter.title}`)
                }
                onDelete={() => removeNewsletter(newsletter.id)}
              />
            ))}
          </div>
        )}
      </div>

      <EmailPreviewModal
        html={previewHtml ?? ""}
        title={previewTitle}
        open={Boolean(previewHtml)}
        onClose={() => setPreviewHtml(null)}
      />
    </>
  );
}
