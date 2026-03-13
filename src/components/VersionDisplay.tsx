"use client";

import { useEffect, useState } from "react";

interface Release {
  tag_name: string;
  name: string;
  zip_url: string;
  html_url: string;
}

export function VersionDisplay() {
  const [release, setRelease] = useState<Release | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/.netlify/functions/vaultcms-release")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setRelease)
      .catch(() => setError(true));
  }, []);

  if (error || !release) return null;

  return (
    <p className="text-sm text-muted-foreground">
      Current version:{" "}
      <a
        href={release.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-accent-foreground hover:text-foreground"
      >
        {release.tag_name}
      </a>
    </p>
  );
}

export function DownloadButton() {
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    fetch("/.netlify/functions/vaultcms-release")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setRelease)
      .catch(() => {});
  }, []);

  const href = release ? `https://github.com/davidvkimball/vaultcms/archive/refs/tags/${release.tag_name}.zip` : "https://github.com/davidvkimball/vaultcms/releases/latest";
  const label = release ? `Download ${release.tag_name}` : "Download latest release";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-heading font-medium transition-all shadow-md hover:shadow-primary/20 active:scale-95 group"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {label}
    </a>
  );
}
