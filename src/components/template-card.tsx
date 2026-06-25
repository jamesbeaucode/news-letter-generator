import { EyeIcon, PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { EmailTemplateDefinition } from "@/lib/email-templates";

type TemplateCardProps = {
  template: EmailTemplateDefinition;
  previewReady: boolean;
  onPreview: () => void;
  onCreate?: () => void;
};

export function TemplateCard({
  template,
  previewReady,
  onPreview,
  onCreate,
}: TemplateCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div
        className="h-44 border-b border-border"
        style={{ backgroundColor: template.cardColor }}
        aria-hidden
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-medium">{template.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{template.source}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {template.description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onPreview}
            disabled={!previewReady}
          >
            <EyeIcon />
            Preview
          </Button>
          {onCreate && (
            <Button type="button" size="sm" onClick={onCreate}>
              <PlusIcon />
              Create Newsletter
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
