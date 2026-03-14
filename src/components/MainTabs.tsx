"use client";

import { useState } from "react";
import { Download, Terminal, FolderOpen } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { VersionDisplay } from "./VersionDisplay";
import { Steps } from "./steps";
import { ThemeCarousel } from "./ThemeCarousel";

export function MainTabs() {
  const [hasDownloaded, setHasDownloaded] = useState(false);

  return (
    <div className="w-full mx-auto mt-4">
      <ThemeCarousel />
      <Tabs defaultValue="download" className="w-full flex justify-center flex-col items-center">
        <TabsList className="grid w-72 grid-cols-2">
          <TabsTrigger value="download" className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Manual install
          </TabsTrigger>
          <TabsTrigger value="cli" className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Command line
          </TabsTrigger>
        </TabsList>
        <TabsContent value="download" className="mt-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300 w-full max-w-lg">
          <a
            href="/api/download-latest"
            onClick={() => setHasDownloaded(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-heading font-medium transition-all shadow-md hover:shadow-primary/20 active:scale-95 group"
          >
            <Download className="w-5 h-5" />
            Download
          </a>
          <div className="mt-4">
            <VersionDisplay />
          </div>

          {hasDownloaded && (
            <div className="mt-4 rounded-lg border border-border bg-card p-5 w-full text-left shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="font-heading text-sm font-medium text-foreground flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Where to place the files
              </h2>
              <ol className="mt-3 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Extract the ZIP you downloaded.</li>
                <li>Copy the <code className="font-mono text-[13px] text-accent-foreground bg-muted px-1.5 py-0.5 rounded">.obsidian</code> and <code className="font-mono text-[13px] text-accent-foreground bg-muted px-1.5 py-0.5 rounded">_bases</code> folders (and <code className="font-mono text-[13px] text-accent-foreground bg-muted px-1.5 py-0.5 rounded">_GUIDE.md</code>) into your Astro project.</li>
                <li>Recommended location: <code className="font-mono text-[13px] text-accent-foreground bg-muted px-1.5 py-0.5 rounded">src/content</code> — or your project root if you prefer.</li>
                <li>Open that folder as a vault in Obsidian.</li>
              </ol>
            </div>
          )}
        </TabsContent>
        <TabsContent value="cli" className="mt-2 flex flex-col items-stretch animate-in fade-in slide-in-from-bottom-2 duration-300 w-full">
          <Steps />
        </TabsContent>
      </Tabs>
    </div>
  );
}
