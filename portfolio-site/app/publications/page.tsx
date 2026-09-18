import Link from "next/link";
import publicationsData from "@/data/publications.json";
import type { Publication } from "@/lib/types";

const publications = publicationsData as Publication[];

export const metadata = {
  title: "Publications — Wahyu Panji Sugiantoro",
};

export default function PublicationsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-2">Publications</h1>
      <p className="text-ink-soft mb-10 max-w-measure">
        A collection of policy papers and academic writing. Readable
        directly on the page; not available for download.
      </p>

      {publications.length === 0 ? (
        <p className="text-sm text-ink-soft border-t border-line pt-8">
          No publications added yet.
        </p>
      ) : (
        <ol className="divide-y divide-line border-t border-line">
          {publications.map((w, i) => (
            <li key={w.slug} className="py-5">
              <Link
                href={`/publications/${w.slug}`}
                className="group flex items-baseline gap-4"
              >
                <span className="text-sm text-brass font-serif shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block text-lg group-hover:underline">
                    {w.title}
                  </span>
                  <span className="block text-sm text-ink-soft mt-1">
                    {w.date} · {w.category}
                  </span>
                  <span className="block text-sm text-ink-soft mt-2">
                    {w.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
