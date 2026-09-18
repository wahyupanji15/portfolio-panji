"use client";

import { useState } from "react";

export default function ProfilePhoto({
  name,
  src = "/profile-photo.jpg",
}: {
  name: string;
  src?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (failed) {
    return (
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-ink text-paper flex items-center justify-center font-serif text-3xl shrink-0">
        {initials}
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shrink-0 border border-line"
    />
  );
}
