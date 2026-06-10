import Email from "../emails/email";
import { render } from "react-email";
import { useEffect, useState } from "react";
import NewsletterForm from "./NewsletterForm";
import {
  hasPopulatedData,
  useNewsLetterStore,
} from "./stores/newsLetterStore";
import "./App.css";

function App() {
  const data = useNewsLetterStore((state) => state.data);
  const clearData = useNewsLetterStore((state) => state.clearData);
  const canGenerate = hasPopulatedData(data);
  const [html, setHtml] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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

  const closePreview = () => setIsPreviewOpen(false);

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
    <div className="app-shell">
      <main className="app-container app-chrome">
        <header className="app-header">
          <h1>Email Newsletter Generator</h1>
          <NewsletterForm />
        </header>

        <section className="clipboard-panel">
          <div className="clipboard-toolbar">
            <h2>HTML Source</h2>
            <div className="clipboard-actions">
              <button type="button" onClick={copyHtml} disabled={!html}>
                {copyStatus === "copied"
                  ? "Copied!"
                  : copyStatus === "error"
                    ? "Copy failed"
                    : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            className="clipboard-textarea"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Generated newsletter HTML appears here."
            spellCheck={false}
          />
        </section>
      </main>

      {isPreviewOpen && html && (
        <div
          className="preview-modal-overlay app-chrome"
          onClick={closePreview}
          role="presentation"
        >
          <div
            className="preview-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="preview-modal-header">
              <h2 id="preview-modal-title">Email Preview</h2>
              <button type="button" onClick={closePreview}>
                Close
              </button>
            </div>
            <div className="preview-modal-body">
              <div
                className="email-preview"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer app-chrome">
        <div className="app-container">
          <div className="app-actions">
            <button type="button" onClick={generateHTML} disabled={!canGenerate}>
              Generate
            </button>
            {html && (
              <button type="button" onClick={() => setIsPreviewOpen(true)}>
                Preview
              </button>
            )}
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
