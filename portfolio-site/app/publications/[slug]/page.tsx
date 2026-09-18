import { notFound } from "next/navigation";
import Link from "next/link";
import publicationsData from "@/data/publications.json";
import type { Publication } from "@/lib/types";
import PdfViewer from "@/components/PdfViewer";

const publications = publicationsData as Publication[];

export function generateStaticParams() {
  return publications.map((w) => ({ slug: w.slug }));
}

export default function PublicationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = publications.find((w) => w.slug === params.slug);
  if (!entry) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/publications" className="text-sm text-teal hover:underline">
        ← All publications
      </Link>
      <h1 className="font-serif text-2xl md:text-3xl mt-4">{entry.title}</h1>
      <p className="text-sm text-ink-soft mt-2 mb-8">
        {entry.date} · {entry.category}
      </p>
      <PdfViewer slug={entry.slug} title={entry.title} />
    </div>
  );
}
