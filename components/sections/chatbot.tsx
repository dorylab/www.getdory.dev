"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import chatbotImg from "@/public/chatbot.png";

import { Section } from "../ui/section";

const bulletKeys = ["schema", "sql", "context", "visualization"] as const;

export default function ChatbotSection() {
  const t = useTranslations("landing.chatbot");
  const bullets = bulletKeys.map((key) => t(`bullets.${key}`));

  return (
    <Section className="relative overflow-hidden py-0 md:py-6">
      <div className="marketing-grid-shell container mx-auto grid items-center gap-10 py-6 md:py-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <div className="space-y-3 text-center lg:text-left">
            <div className="marketing-eyebrow">{t("badge")}</div>

            <h2 className="marketing-title text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>

            <p className="marketing-lead mx-auto max-w-[52ch] text-base lg:mx-0 lg:text-lg">
              {t("description")}
            </p>
          </div>

          <ul className="space-y-3 text-base lg:text-lg">
            {bullets.map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 border-b border-slate-200/80 py-3 last:border-b-0 dark:border-white/10"
              >
                <span className="bg-brand mt-1 h-2.5 w-2.5 rounded-full shadow-[0_0_0_6px_rgba(37,99,235,0.08)]" />
                <span className="text-sm leading-7 text-slate-700 lg:text-base dark:text-slate-300">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="marketing-image-frame">
            <Image
              src={chatbotImg}
              alt="Chatbot screenshot"
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
