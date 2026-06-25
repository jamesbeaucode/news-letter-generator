import Email from "../emails/email";
import { render } from "react-email";
import { useEffect, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import NewsletterForm from "./NewsletterForm";
import {
  hasPopulatedData,
  useNewsLetterStore,
} from "./stores/newsLetterStore";

type PreviewMode = "desktop" | "mobile";

function App() {
  const data = useNewsLetterStore((state) => state.data);
  const clearData = useNewsLetterStore((state) => state.clearData);
  const canGenerate = hasPopulatedData(data);
  const [html, setHtml] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const generateHTML = async () => {
    const data = useNewsLetterStore.getState().data;
    const html = await render(<Email data={data} />);
    setHtml(html);
    setIsPreviewOpen(true);
  };

  const handleClear = () => {
    clearData();
    setHtml("");
    setIsPreviewOpen(false);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewMode("desktop");
  };

  useEffect(() => {
    if (!isPreviewOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewOpen]);

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  return (
    <div className="flex h-full min-h-svh flex-col overflow-hidden bg-background text-foreground">
      <main className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col gap-6 overflow-hidden px-6 pb-[68px] pt-6">
        <header className="max-h-[55%] shrink-0 overflow-y-auto text-center">
          <h1 className="font-heading mb-8 text-4xl font-medium tracking-tight lg:text-5xl">
            Email Newsletter Generator
          </h1>
          <NewsletterForm />
        </header>

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-border bg-muted px-4 py-3">
            <h2 className="text-xl font-medium">HTML Source</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="font-mono"
              onClick={copyHtml}
              disabled={!html}
            >
              {copyStatus === "copied"
                ? "Copied!"
                : copyStatus === "error"
                  ? "Copy failed"
                  : "Copy"}
            </Button>
          </div>
          <Textarea
            className="min-h-[200px] flex-1 resize-none rounded-none border-0 font-mono text-xs focus-visible:ring-0"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Generated newsletter HTML appears here."
            spellCheck={false}
          />
        </section>
      </main>

      {isPreviewOpen && html && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-6"
          onClick={closePreview}
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
                Email Preview
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
                <Button type="button" variant="outline" onClick={closePreview}>
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
      )}

      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="flex justify-center gap-2.5 py-3.5">
            <Button
              type="button"
              onClick={generateHTML}
              disabled={!canGenerate}
            >
              Generate
            </Button>
            {html && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreviewOpen(true)}
              >
                Preview
              </Button>
            )}
            <Button type="button" variant="destructive" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
