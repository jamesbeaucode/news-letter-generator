import { CopyIcon, EyeIcon, TrashIcon } from "@phosphor-icons/react";
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
  onPreview: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

export function NewsletterCard({
  newsletter,
  onPreview,
  onCopy,
  onDelete,
}: NewsletterCardProps) {
  const template = getEmailTemplateOrDefault(newsletter.templateId);

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
            Created {formatDate(newsletter.createdAt)}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={onPreview}>
            <EyeIcon />
            Preview
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
          >
            <TrashIcon />
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
