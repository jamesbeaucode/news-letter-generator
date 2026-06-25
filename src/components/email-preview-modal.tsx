import { useEffect, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PreviewMode = "desktop" | "mobile";

type EmailPreviewModalProps = {
  html: string;
  title?: string;
  open: boolean;
  onClose: () => void;
};

export function EmailPreviewModal({
  html,
  title = "Email Preview",
  open,
  onClose,
}: EmailPreviewModalProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setPreviewMode("desktop");
  }, [open]);

  if (!open || !html) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex h-[min(90svh,900px)] w-[min(760px,100%)] flex-col overflow-hidden rounded-lg border border-border bg-background shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-muted px-4 py-3">
          <h2 id="preview-modal-title" className="text-xl font-medium">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center rounded-none border border-border bg-background p-0.5"
              role="group"
              aria-label="Preview device"
            >
              <Button
                type="button"
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="icon-sm"
                aria-pressed={previewMode === "desktop"}
                aria-label="Desktop preview"
                onClick={() => setPreviewMode("desktop")}
              >
                <Monitor />
              </Button>
              <Button
                type="button"
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="icon-sm"
                aria-pressed={previewMode === "mobile"}
                aria-label="Mobile preview"
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone />
              </Button>
            </div>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "min-h-0 flex-1 overflow-auto bg-muted/40",
            previewMode === "mobile" && "flex justify-center px-4 py-6",
          )}
        >
          <div
            className={cn(
              "h-full min-h-[500px] overflow-hidden bg-background",
              previewMode === "mobile" &&
                "w-full max-w-[390px] shrink-0 border border-border shadow-sm",
            )}
          >
            <iframe
              className="block size-full min-h-[500px] border-0"
              title={`Email preview (${previewMode})`}
              srcDoc={html}
              sandbox=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
