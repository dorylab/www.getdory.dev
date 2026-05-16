import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Section } from "../ui/section";
import { PreviewImages } from "./PreviewImages";

export type CoreWorkspaceProps = {
  className?: string;
};

const bulletKeys = ["item1", "item2", "item3", "item4"] as const;

export default function CoreWorkspace({ className }: CoreWorkspaceProps) {
  const t = useTranslations("landing.coreWorkspace");
  const badge = t("badge");
  const heading = t.rich("title", {
    brand: (chunks) => <span className="text-brand">{chunks}</span>,
  });
  const workspaceBullets = bulletKeys.map((key) => t(`highlights.${key}`));

  return (
    <Section className={cn("relative overflow-hidden", className)}>
      <div className="relative container mx-auto">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr,1fr]">
          <div className="space-y-6">
            <div className="marketing-eyebrow">{badge}</div>

            <h2 className="marketing-title text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {heading}
            </h2>

            <ul className="text-foreground space-y-3 text-base leading-relaxed sm:text-lg">
              {workspaceBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 border-b border-slate-200/80 py-3 last:border-b-0 dark:border-white/10"
                >
                  <span className="bg-brand mt-1 h-2.5 w-2.5 rounded-full shadow-[0_0_0_6px_rgba(37,99,235,0.08)]" />
                  <span className="text-base text-slate-700 dark:text-slate-300">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="marketing-image-frame relative">
              <PreviewImages />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
