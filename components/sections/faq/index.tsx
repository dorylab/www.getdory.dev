import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

const paragraphClass = "text-muted-foreground mb-4 max-w-[640px]";

export default function FAQ({ title, items, className }: FAQProps) {
  const t = useTranslations("landing.faq");
  const headerLabel = t("headerLabel");
  const resolvedTitle = title ?? t("title");
  const renderParagraphs = (paragraphs: string[]) =>
    paragraphs.map((text, index) => (
      <p key={`faq-${index}`} className={paragraphClass}>
        {text}
      </p>
    ));

  const defaultItems: FAQItemProps[] = [
    {
      question: t("items.free.question"),
      answer: (
        <>
          {renderParagraphs([
            t("items.free.answer.paragraph1"),
            t("items.free.answer.paragraph2"),
          ])}
        </>
      ),
    },
    {
      question: t("items.aiCopilot.question"),
      answer: (
        <>
          {renderParagraphs([
            t("items.aiCopilot.answer.paragraph1"),
            t("items.aiCopilot.answer.paragraph2"),
          ])}
        </>
      ),
    },
    {
      question: t("items.providers.question"),
      answer: (
        <>
          {renderParagraphs([
            t("items.providers.answer.paragraph1"),
            t("items.providers.answer.paragraph2"),
          ])}
        </>
      ),
    },
    {
      question: t("items.databases.question"),
      answer: (
        <>
          {renderParagraphs([
            t("items.databases.answer.paragraph1"),
            t("items.databases.answer.paragraph2"),
          ])}
        </>
      ),
    },
    {
      question: t("items.openSource.question"),
      answer: (
        <>
          {renderParagraphs([
            t("items.openSource.answer.paragraph1"),
            t("items.openSource.answer.paragraph2"),
          ])}
        </>
      ),
    },
    {
      question: t("items.dataSafety.question"),
      answer: (
        <>
          {renderParagraphs([
            t("items.dataSafety.answer.paragraph1"),
            t("items.dataSafety.answer.paragraph2"),
          ])}
        </>
      ),
    },
  ];

  const resolvedItems = items === false ? false : (items ?? defaultItems);

  return (
    <Section className={className}>
      <div className="flex justify-center lg:justify-center">
        <div className="marketing-eyebrow">{headerLabel}</div>
      </div>
      <div className="max-w-container mx-auto mt-4 flex flex-col items-center gap-8">
        <h2 className="marketing-title text-center text-3xl font-semibold sm:text-5xl">
          {resolvedTitle}
        </h2>
        {resolvedItems !== false && resolvedItems.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {resolvedItems.map((item, index) => (
              <AccordionItem
                key={item.value ?? `item-${index + 1}`}
                value={item.value ?? `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
