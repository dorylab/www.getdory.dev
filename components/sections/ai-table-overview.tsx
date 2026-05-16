import Image from "next/image";
import { useTranslations } from "next-intl";

import aiTableOverviewImg from "@/public/ai-table-overview.png";

import { Section } from "../ui/section";

const insightKeys = ["summary", "fields", "context"] as const;

export default function AiTableOverview() {
  const t = useTranslations("landing.tableOverview");
  const highlights = insightKeys.map((key) => ({
    id: key,
    title: t(`insights.${key}.title`),
    description: t(`insights.${key}.description`),
  }));

  return (
    <Section className="relative overflow-hidden py-0 md:py-6">
      <div className="container mx-auto py-6 lg:py-10">
        <div className="space-y-5">
          <div className="marketing-eyebrow">{t("badge")}</div>

          <h2 className="marketing-title text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="marketing-lead max-w-[60ch] text-base lg:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.id}
              className="marketing-panel text-foreground space-y-2 rounded-[28px] p-5 text-sm"
            >
              <h3 className="text-foreground text-lg font-semibold">
                {item.title}
              </h3>
              <p className="marketing-lead text-base">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="relative mt-8">
          <div className="marketing-image-frame">
            <Image
              src={aiTableOverviewImg}
              alt={t("screenshotAlt")}
              className="relative z-0 h-full w-full object-cover"
              placeholder="blur"
              priority={false}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
