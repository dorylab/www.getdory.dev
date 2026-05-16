"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { cn } from "@/lib/utils";
import actionsImage from "@/public/actions.png";
import askImage from "@/public/ask.png";
import contextImage from "@/public/context.png";

import { Section } from "../../ui/section";

const pillKeys = ["pill1", "pill2", "pill3"] as const;

const tabMeta = [
  {
    id: "ask",
    image: askImage,
  },
  {
    id: "actions",
    image: actionsImage,
  },
  {
    id: "context",
    image: contextImage,
  },
] as const;

export default function AiNativeWorkspace() {
  const t = useTranslations("landing.aiNative");
  const tabs = tabMeta.map((tab) => ({
    id: tab.id,
    image: tab.image,
    label: t(`tabs.${tab.id}.label`),
    title: t(`tabs.${tab.id}.title`),
    description: t(`tabs.${tab.id}.description`),
    pills: pillKeys.map((pill) => t(`tabs.${tab.id}.pills.${pill}`)),
  }));
  const [activeTabId, setActiveTabId] = useState<
    (typeof tabMeta)[number]["id"]
  >(tabMeta[0].id);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  const badge = t("badge");
  const heading = t.rich("heading", {
    ask: (chunks) => <span className="text-foreground">{chunks}</span>,
    act: (chunks) => <span className="text-foreground">{chunks}</span>,
    stay: (chunks) => <span className="text-brand">{chunks}</span>,
  });
  const description = t("description");

  return (
    <Section className="relative overflow-hidden py-0 md:py-6">
      <div className="marketing-grid-shell relative container mx-auto grid items-center gap-10 py-6 lg:grid-cols-[1.1fr,0.9fr] lg:py-10">
        <div className="space-y-6">
          <div className="space-y-4 text-center lg:text-left">
            <div className="marketing-eyebrow">{badge}</div>

            <h2 className="marketing-title text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {heading}
            </h2>

            <p className="marketing-lead mx-auto max-w-[52ch] text-base lg:mx-0 lg:text-lg">
              {description}
            </p>
          </div>

          <div className="flex justify-center lg:justify-start">
            <div className="marketing-panel grid w-full max-w-md grid-cols-3 items-center rounded-full p-1 sm:inline-flex sm:w-auto sm:max-w-none">
              {tabs.map((tab) => {
                const active = activeTab.id === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabId(tab.id)}
                    className={cn(
                      "relative min-w-0 rounded-full px-3 py-2 text-sm font-medium transition sm:px-5",
                      "focus-visible:ring-brand/50 focus-visible:ring-2 focus-visible:outline-none",
                      active
                        ? "bg-brand text-white shadow-[0_10px_24px_rgba(37,99,235,0.26)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
                    )}
                  >
                    <span className="block truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="marketing-panel rounded-[24px] p-6 md:p-7">
            <div className="relative">
              <h3 className="text-foreground text-xl font-semibold">
                {activeTab.title}
              </h3>
              <p className="marketing-lead mt-3 text-base">
                {activeTab.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {activeTab.pills.map((pill) => (
                  <Pill key={pill}>{pill}</Pill>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="marketing-image-frame">
            <Image
              src={activeTab.image}
              alt={`${activeTab.label} screenshot`}
              className="relative z-0 w-full object-cover"
              placeholder="blur"
              priority={false}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
      {children}
    </span>
  );
}
