import Image from "next/image";

import { LanguageSwitcher } from "@/components/language-switcher";
import { isI18nEnabled } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

import Github from "../../logos/github";
import X from "../../logos/x";

interface FooterProps {
  className?: string;
}

export default function FooterSection({ className }: FooterProps) {
  return (
    <footer className={cn("relative w-full px-4 py-6 md:px-16", className)}>
      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-5 pt-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex items-center gap-2 text-slate-950 dark:text-white">
              <Image
                src="/dory.png"
                alt="Dory"
                width={22}
                height={22}
                className="size-[22px]"
              />
              <span className="font-medium">Dory</span>
            </div>
            <span>© {new Date().getFullYear()} DoryLab</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <div className="flex items-center rounded-full border border-slate-200/80 bg-white/64 p-1 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Dory on X"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/8 dark:hover:text-white"
              >
                <X className="size-3.5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-8 items-center gap-2 rounded-full px-3 text-slate-600 transition-colors hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/8 dark:hover:text-white"
              >
                <Github className="size-3.5" />
                GitHub
              </a>
            </div>
            {isI18nEnabled ? <LanguageSwitcher /> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
