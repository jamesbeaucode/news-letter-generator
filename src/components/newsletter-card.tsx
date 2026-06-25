import { CopyIcon, EyeIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { getEmailTemplateOrDefault } from "@/lib/email-templates";
import type { SavedNewsletter } from "@/stores/newslettersStore";

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

type NewsletterCardProps = {
  newsletter: SavedNewsletter;
  isDeleting?: boolean;
  onPreview: () => void;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

export function NewsletterCard({
  newsletter,
  isDeleting = false,
  onPreview,
  onEdit,
  onCopy,
  onDelete,
}: NewsletterCardProps) {
  const template = getEmailTemplateOrDefault(newsletter.templateId);
  const updatedAt = newsletter.updatedAt ?? newsletter.createdAt;
  const wasUpdated = updatedAt > newsletter.createdAt;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div
        className="h-44 border-b border-border"
        style={{ backgroundColor: template.cardColor }}
        aria-hidden
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="truncate font-medium">{newsletter.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"}{" "}
            {formatDate(wasUpdated ? updatedAt : newsletter.createdAt)}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={onPreview}>
            <EyeIcon />
            Preview
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onEdit}>
            <PencilSimpleIcon />
            Edit
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onCopy}>
            <CopyIcon />
            Copy HTML
          </Button>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            <TrashIcon />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </article>
  );
}
