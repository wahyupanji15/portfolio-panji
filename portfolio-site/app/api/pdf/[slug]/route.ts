import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import writingsData from "@/data/publications.json";
import type { Publication } from "@/lib/types";

const writings = writingsData as Publication[];

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  // Look up the slug in our "database" rather than trusting any
  // filename from the request — this also blocks path traversal,
  // since only files listed in publications.json can ever be served.
  const entry = writings.find((w) => w.slug === params.slug);
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Very light same-origin check. Not bulletproof (headers can be
  // spoofed by a determined user), but it stops the common case of
  // the PDF URL being copy-pasted or hotlinked elsewhere.
  const referer = req.headers.get("referer") ?? "";
  const host = req.headers.get("host") ?? "";
  if (referer && host && !referer.includes(host)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), "data", "pdfs", entry.file);

  let fileBuffer: Buffer;
  try {
    fileBuffer = await fs.readFile(filePath);
  } catch {
    return NextResponse.json({ error: "File missing on server" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(fileBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      // "inline" (not "attachment") + no filename: browsers that DO
      // render this directly won't prompt a save dialog. But the real
      // protection is that the viewer page below fetches this via JS
      // and renders it to <canvas> with pdf.js, so the raw PDF bytes
      // never sit behind a clickable/native browser PDF toolbar.
      "Content-Disposition": "inline",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
