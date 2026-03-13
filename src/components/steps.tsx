"use client"

import { useState } from "react"
import { InstallTabs } from "@/components/install-tabs"

export function Steps() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <ol className="flex flex-col gap-0">
      {/* Step 1 */}
      <li
        className="relative pl-12 pb-10 group"
        onMouseEnter={() => setHovered(1)}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Connecting line */}
        <div className="absolute left-[15px] top-[34px] bottom-[-2px] w-[2px]">
          <div className="absolute inset-0 bg-border" />
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              opacity: hovered !== null && hovered >= 2 ? 1 : 0,
              background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--secondary)))",
              boxShadow: hovered !== null && hovered >= 2 ? "0 0 8px hsl(var(--primary) / 0.5)" : "none",
            }}
          />
        </div>
        {/* Number */}
        <div
          className="absolute left-0 top-[2px] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered !== null && hovered >= 1
              ? "hsl(var(--primary) / 0.15)"
              : "hsl(var(--muted))",
            boxShadow: hovered !== null && hovered >= 1
              ? "0 0 8px hsl(var(--primary) / 0.15), inset 0 0 0 1px hsl(var(--primary) / 0.1)"
              : "none",
          }}
        >
          <span
            className="text-xs font-heading transition-colors duration-300"
            style={{
              color: hovered !== null && hovered >= 1
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))",
            }}
          >
            1
          </span>
        </div>
        <h3 className="font-heading text-lg text-foreground">
          Run the installer in the root of your Astro project
        </h3>
        <InstallTabs />
      </li>

      {/* Step 2 */}
      <li
        className="relative pl-12 pb-10 group"
        onMouseEnter={() => setHovered(2)}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Connecting line */}
        <div className="absolute left-[15px] top-[34px] bottom-[-2px] w-[2px]">
          <div className="absolute inset-0 bg-border" />
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              opacity: hovered !== null && hovered >= 3 ? 1 : 0,
              background: "linear-gradient(to bottom, hsl(var(--secondary)), hsl(var(--primary)))",
              boxShadow: hovered !== null && hovered >= 3 ? "0 0 8px hsl(var(--secondary) / 0.5)" : "none",
            }}
          />
        </div>
        {/* Number */}
        <div
          className="absolute left-0 top-[2px] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered !== null && hovered >= 2
              ? "hsl(var(--secondary) / 0.15)"
              : "hsl(var(--muted))",
            boxShadow: hovered !== null && hovered >= 2
              ? "0 0 8px hsl(var(--secondary) / 0.15), inset 0 0 0 1px hsl(var(--secondary) / 0.1)"
              : "none",
          }}
        >
          <span
            className="text-xs font-heading transition-colors duration-300"
            style={{
              color: hovered !== null && hovered >= 2
                ? "hsl(var(--secondary))"
                : "hsl(var(--muted-foreground))",
            }}
          >
            2
          </span>
        </div>
        <h3 className="font-heading text-lg text-foreground">
          Open the install folder with Obsidian
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
          Open the folder where Vault CMS was installed as a vault in
          Obsidian. For example, if you installed to{" "}
          <code className="font-mono text-[13px] text-accent-foreground bg-muted px-1.5 py-0.5 rounded">
            src/content
          </code>
          , open that folder.
        </p>
      </li>

      {/* Step 3 */}
      <li
        className="relative pl-12"
        onMouseEnter={() => setHovered(3)}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Number */}
        <div
          className="absolute left-0 top-[2px] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered !== null && hovered >= 3
              ? "hsl(var(--primary) / 0.15)"
              : "hsl(var(--muted))",
            boxShadow: hovered !== null && hovered >= 3
              ? "0 0 8px hsl(var(--primary) / 0.15), inset 0 0 0 1px hsl(var(--primary) / 0.1)"
              : "none",
          }}
        >
          <span
            className="text-xs font-heading transition-colors duration-300"
            style={{
              color: hovered !== null && hovered >= 3
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))",
            }}
          >
            3
          </span>
        </div>
        <h3 className="font-heading text-lg text-foreground">
          Walk through the wizard
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
          The setup wizard detects your theme and configures your content
          types. Once configured, you{"'"}re ready to start publishing.
        </p>
      </li>
    </ol>
  )
}
