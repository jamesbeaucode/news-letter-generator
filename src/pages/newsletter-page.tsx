import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { EmailPreviewModal } from "@/components/email-preview-modal";
import { NewsletterCard } from "@/components/newsletter-card";
import type { SavedNewsletter } from "@/stores/newslettersStore";

type NewsletterPageProps = {
  onCreateNewsletter: () => void;
  onEditNewsletter: (newsletterId: SavedNewsletter["_id"]) => void;
};

export function NewsletterPage({
  onCreateNewsletter,
  onEditNewsletter,
}: NewsletterPageProps) {
  const newsletters = useQuery(api.newsletters.list);
  const removeNewsletter = useMutation(api.newsletters.remove);

  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("Email Preview");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<SavedNewsletter["_id"] | null>(
    null,
  );

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

  const handleDelete = async (newsletter: SavedNewsletter) => {
    if (deletingId) return;

    setDeletingId(newsletter._id);
    try {
      await removeNewsletter({ id: newsletter._id });
    } finally {
      setDeletingId(null);
    }
  };

  const isLoading = newsletters === undefined;

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

        {isLoading ? (
          <div className="flex min-h-[320px] flex-1 items-center justify-center rounded-xl border border-border bg-muted/30 px-6 py-16">
            <p className="text-sm text-muted-foreground">Loading newsletters...</p>
          </div>
        ) : newsletters.length === 0 ? (
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
                key={newsletter._id}
                newsletter={newsletter}
                isDeleting={deletingId === newsletter._id}
                onPreview={() => openPreview(newsletter)}
                onEdit={() => onEditNewsletter(newsletter._id)}
                onCopy={() =>
                  copyHtml(newsletter.html, `Copied ${newsletter.title}`)
                }
                onDelete={() => handleDelete(newsletter)}
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
