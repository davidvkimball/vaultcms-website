"use client";

import { useEffect, useState } from "react";

interface Release {
  tag_name: string | null;
  html_url: string;
}

export function VersionDisplay() {
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    // Served by src/pages/api/vaultcms-release.ts. Any failure, including the
    // endpoint's own null tag when GitHub is unreachable, just hides the line.
    fetch("/api/vaultcms-release")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.tag_name === "string" && data.tag_name) setRelease(data);
      })
      .catch(() => {});
  }, []);

  if (!release) return null;

  return (
    <p className="text-sm text-muted-foreground">
      Current version:{" "}
      <a
        href={release.html_url}
        target="_blank"
        className="font-mono text-accent-foreground hover:text-foreground"
      >
        {release.tag_name}
      </a>
    </p>
  );
}
