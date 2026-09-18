import Link from "next/link";

export default function Nav() {
  return (
    <header className="max-w-3xl mx-auto px-6 pt-10 pb-6 flex items-baseline justify-between">
      <Link href="/" className="font-serif text-lg tracking-tight">
        Wahyu Panji Sugiantoro
      </Link>
      <nav className="flex gap-6 text-sm text-ink-soft">
        <Link href="/#summary" className="hover:text-ink">
          Profile
        </Link>
        <Link href="/publications" className="hover:text-ink">
          Publications
        </Link>
      </nav>
    </header>
  );
}
