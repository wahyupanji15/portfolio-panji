"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  slug: string;
  title: string;
};

export default function PdfViewer({ slug, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

        const doc = await pdfjsLib.getDocument(`/api/pdf/${slug}`).promise;
        if (cancelled) return;
        setNumPages(doc.numPages);

        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const viewport = page.getViewport({ scale: 1.4 });

          const canvas = document.createElement("canvas");
          canvas.className = "w-full h-auto block mb-4 shadow-sm";
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          await page.render({ canvasContext: ctx, viewport }).promise;
          if (cancelled) return;
          container.appendChild(canvas);
        }

        if (!cancelled) setStatus("ready");
      } catch (err) {
        console.error(err);
        if (!cancelled) setStatus("error");
      }
    }

    render();

    // Deterrents only — not a real security boundary (see note in chat).
    // These block the common, casual ways of grabbing the file; a
    // determined user can still get around them.
    const blockKeys = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const blocked =
        ((e.ctrlKey || e.metaKey) && (k === "s" || k === "p")) ||
        k === "printscreen";
      if (blocked) e.preventDefault();
    };
    const blockContextMenu = (e: MouseEvent) => e.preventDefault();

    window.addEventListener("keydown", blockKeys);
    containerRef.current?.addEventListener("contextmenu", blockContextMenu);

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", blockKeys);
      containerRef.current?.removeEventListener(
        "contextmenu",
        blockContextMenu
      );
    };
  }, [slug]);

  return (
    <div className="relative select-none">
      {status === "loading" && (
        <p className="text-ink-soft text-sm mb-4">Loading document…</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700 mb-4">
          The document couldn&apos;t be loaded. Make sure the PDF has been
          placed in data/pdfs/ matching the name in data/publications.json.
        </p>
      )}

      <div
        ref={containerRef}
        className="relative border border-line rounded-sm overflow-hidden"
      />

      {status === "ready" && (
        <>
          {/* Repeating diagonal watermark, purely visual — a deterrent
              and a faint trace on any screenshot, not a lock. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.06]"
          >
            <div
              className="text-4xl font-serif whitespace-nowrap"
              style={{ transform: "rotate(-30deg)" }}
            >
              {Array(20).fill(`${title} · preview`).join("   ")}
            </div>
          </div>
          <p className="text-xs text-ink-soft mt-3">
            {numPages} pages · preview only, not for download
          </p>
        </>
      )}
    </div>
  );
}
