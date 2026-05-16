"use client";

import { Check, Copy, TerminalSquare } from "lucide-react";
import { useState } from "react";

import { buttonVariants } from "@/components/landing/variants";
import { cn } from "@/lib/utils";

type DownloadCommandBarProps = {
  command: string;
  className?: string;
};

export function DownloadCommandBar({
  command,
  className,
}: DownloadCommandBarProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    let copiedSuccessfully = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(command);
        copiedSuccessfully = true;
      } catch {
        copiedSuccessfully = false;
      }
    }

    if (!copiedSuccessfully) {
      const textarea = document.createElement("textarea");
      textarea.value = command;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        copiedSuccessfully = true;
      } finally {
        document.body.removeChild(textarea);
      }
    }

    if (copiedSuccessfully) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[22px] border border-slate-200/80 bg-white/95 p-2 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-900/80",
        className,
      )}
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/8 dark:text-slate-300">
        <TerminalSquare className="size-5" />
      </div>
      <code className="min-w-0 flex-1 overflow-x-auto pr-1 font-mono text-sm whitespace-nowrap text-slate-800 sm:text-base dark:text-slate-100">
        {command}
      </code>
      <button
        type="button"
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "compact",
            surface: "flat",
          }),
          "size-9 shrink-0 p-0",
        )}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}
