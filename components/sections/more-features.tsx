import {
  Database,
  GitBranch,
  Palette,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Section } from "../ui/section";

const featureDefinitions = [
  { key: "secure", icon: ShieldCheck },
  { key: "connectivity", icon: Database },
  { key: "save", icon: Save },
  { key: "modern", icon: Sparkles },
  { key: "themes", icon: Palette },
  { key: "open-source", icon: GitBranch },
] as const;

export default function MoreFeatures() {
  const t = useTranslations("landing.moreFeatures");
  const features = featureDefinitions.map((feature) => ({
    ...feature,
    title: t(`features.${feature.key}.title`),
    description: t(`features.${feature.key}.description`),
  }));

  return (
    <Section className="from-fd-fill via-fd-fill to-fd-card relative overflow-hidden bg-gradient-to-b">
      <div className="container mx-auto space-y-8 text-left">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="marketing-eyebrow">{t("badge")}</div>
          <h2 className="marketing-title text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="marketing-lead mx-auto max-w-[60ch] text-center text-base lg:text-lg">
            {t("description")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className={cn(
                  "marketing-panel group hover:border-brand/35 rounded-[24px] p-6 text-left transition hover:-translate-y-0.5",
                )}
              >
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5">
                      <Icon className="text-brand h-5 w-5" />
                    </div>
                    <h3 className="text-foreground text-lg font-semibold">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="marketing-lead text-left text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
