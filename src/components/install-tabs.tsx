"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

const managers = [
  { id: "npm", label: "npm", cmd: "npm create vaultcms" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm create vaultcms" },
  { id: "yarn", label: "yarn", cmd: "yarn create vaultcms" },
] as const

export function InstallTabs() {
  const [active, setActive] = useState<string>("pnpm")
  const [copied, setCopied] = useState(false)

  const current = managers.find((m) => m.id === active)!

  const copy = async () => {
    await navigator.clipboard.writeText(current.cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="mt-5">
      <div className="flex items-center gap-0 relative z-10">
        {managers.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setActive(m.id)
              setCopied(false)
            }}
            className={`px-3.5 py-1.5 text-[13px] font-heading transition-colors ${active === m.id
              ? "bg-card text-foreground border border-border border-b-card rounded-t-md -mb-px"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="relative flex items-center justify-between bg-card border border-border rounded-lg rounded-tl-none px-4 py-3.5">
        <code className="font-mono text-sm text-foreground">
          <span className="text-muted-foreground select-none mr-2">$</span>
          {current.cmd}
        </code>
        <button
          onClick={copy}
          className="ml-4 p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  )
}
