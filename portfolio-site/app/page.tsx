import Link from "next/link";
import publicationsData from "@/data/publications.json";
import type { Publication } from "@/lib/types";
import ProfilePhoto from "@/components/ProfilePhoto";
import {
  profile,
  education,
  experience,
  certifications,
  conferences,
  skills,
} from "@/lib/profile";

const publications = publicationsData as Publication[];

function SectionHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="font-serif text-2xl scroll-mt-24 mb-8">
      {children}
    </h2>
  );
}

export default function Home() {
  const latest = publications.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 md:py-20 flex flex-col md:flex-row gap-8 md:items-center">
        <ProfilePhoto name={profile.name} />
        <div>
          <h1 className="font-serif text-3xl md:text-4xl leading-tight text-ink">
            {profile.name}
          </h1>
          <p className="mt-2 text-ink-soft">{profile.title}</p>
          <p className="text-sm text-ink-soft mt-1">{profile.organization}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-teal">
            <span className="text-ink-soft">{profile.location}</span>
            <a href={`mailto:${profile.email}`} className="hover:underline">
              {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="hover:underline">
              {profile.phone}
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {profile.linkedin}
            </a>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft py-6 border-y border-line">
        <a href="#summary" className="hover:text-ink">Summary</a>
        <a href="#experience" className="hover:text-ink">Experience</a>
        <a href="#education" className="hover:text-ink">Education</a>
        <a href="#certifications" className="hover:text-ink">Certifications</a>
        <a href="#conferences" className="hover:text-ink">Conferences</a>
        <a href="#skills" className="hover:text-ink">Skills</a>
        <Link href="/publications" className="hover:text-ink">Publications →</Link>
      </nav>

      {/* Career Summary */}
      <section className="py-14">
        <SectionHeading id="summary">Career Summary</SectionHeading>
        <p className="text-ink-soft leading-relaxed max-w-measure">
          {profile.summary}
        </p>
      </section>

      {/* Experience */}
      <section className="py-14 border-t border-line">
        <SectionHeading id="experience">Work Experience</SectionHeading>
        <div className="space-y-12">
          {experience.map((job, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-8 gap-y-2"
            >
              <div className="text-sm text-ink-soft">
                <p className="text-brass font-serif">{job.dates}</p>
                <p className="mt-1">{job.org}</p>
              </div>
              <div>
                <h3 className="text-ink">{job.role}</h3>
                {job.tags && (
                  <p className="text-sm text-ink-soft italic mt-1">{job.tags}</p>
                )}
                <ul className="mt-3 space-y-2 text-sm text-ink-soft leading-relaxed list-disc pl-4">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="py-14 border-t border-line">
        <SectionHeading id="education">Education</SectionHeading>
        <div className="space-y-10">
          {education.map((ed, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-8 gap-y-2"
            >
              <div className="text-sm text-ink-soft">
                <p className="text-brass font-serif">{ed.dates}</p>
                <p className="mt-1">{ed.location}</p>
              </div>
              <div>
                <h3 className="text-ink">{ed.degree}</h3>
                <p className="text-sm text-ink-soft mt-1">{ed.school}</p>
                <p className="text-sm text-ink-soft mt-1">{ed.detail}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft leading-relaxed list-disc pl-4">
                  {ed.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Training & Certifications */}
      <section className="py-14 border-t border-line">
        <SectionHeading id="certifications">
          Training &amp; Certifications
        </SectionHeading>
        <ul className="divide-y divide-line">
          {certifications.map((c, i) => (
            <li key={i} className="py-4 grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-x-8 gap-y-1">
              <p className="text-sm text-brass font-serif">{c.year}</p>
              <div>
                <p className="text-ink-soft text-sm leading-relaxed">{c.title}</p>
                <p className="text-sm text-ink-soft/70 mt-1">{c.org}</p>
                {c.detail && (
                  <p className="text-sm text-ink-soft mt-1">{c.detail}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Conferences & Recognition */}
      <section className="py-14 border-t border-line">
        <SectionHeading id="conferences">
          Conferences &amp; Recognition
        </SectionHeading>
        <ul className="divide-y divide-line">
          {conferences.map((c, i) => (
            <li key={i} className="py-4 grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-x-8 gap-y-1">
              <p className="text-sm text-brass font-serif">{c.year}</p>
              <div>
                <p className="text-ink-soft text-sm leading-relaxed">{c.title}</p>
                {c.org && <p className="text-sm text-ink-soft/70 mt-1">{c.org}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Other Skills */}
      <section className="py-14 border-t border-line">
        <SectionHeading id="skills">Other Skills</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((s, i) => (
            <div key={i}>
              <h3 className="text-sm text-ink mb-2">{s.category}</h3>
              <ul className="text-sm text-ink-soft space-y-1">
                {s.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Publications preview */}
      <section className="py-14 border-t border-line">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl">Recent Publications</h2>
          <Link href="/publications" className="text-sm text-teal hover:underline">
            View all
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="text-sm text-ink-soft">No publications added yet.</p>
        ) : (
          <ol className="divide-y divide-line">
            {latest.map((w, i) => (
              <li key={w.slug} className="py-4">
                <Link
                  href={`/publications/${w.slug}`}
                  className="group flex items-baseline gap-4"
                >
                  <span className="text-sm text-brass font-serif">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block group-hover:underline">
                      {w.title}
                    </span>
                    <span className="block text-sm text-ink-soft mt-1">
                      {w.date} · {w.category}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
