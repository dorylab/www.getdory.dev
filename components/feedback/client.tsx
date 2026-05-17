"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import posthog from "posthog-js";
import {
  type ComponentProps,
  type SyntheticEvent,
  useEffect,
  useMemo,
  useState
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ActionResponse, PageFeedback } from "./schema";

type FeedbackCopy = {
  title: string;
  good: string;
  bad: string;
  placeholder: string;
  submit: string;
  thanks: string;
  submitAgain: string;
};

const copyByLocale: Record<string, FeedbackCopy> = {
  en: {
    title: "How is this guide?",
    good: "Good",
    bad: "Bad",
    placeholder: "Leave your feedback...",
    submit: "Submit",
    thanks: "Thank you for your feedback.",
    submitAgain: "Submit again"
  },
  zh: {
    title: "这篇文档有帮助吗？",
    good: "有帮助",
    bad: "没帮助",
    placeholder: "留下你的反馈...",
    submit: "提交",
    thanks: "感谢你的反馈。",
    submitAgain: "重新提交"
  },
  ja: {
    title: "このガイドは役に立ちましたか？",
    good: "良い",
    bad: "悪い",
    placeholder: "フィードバックを入力...",
    submit: "送信",
    thanks: "フィードバックありがとうございます。",
    submitAgain: "再送信"
  },
  es: {
    title: "¿Qué te pareció esta guía?",
    good: "Bien",
    bad: "Mal",
    placeholder: "Deja tus comentarios...",
    submit: "Enviar",
    thanks: "Gracias por tus comentarios.",
    submitAgain: "Enviar de nuevo"
  }
};

export function Feedback({
  locale = "en",
  onSendAction
}: {
  locale?: string;
  onSendAction?: (feedback: PageFeedback) => Promise<ActionResponse>;
}) {
  const copy = copyByLocale[locale] ?? copyByLocale.en;
  const [url, setUrl] = useState("");
  const storageKey = useMemo(
    () => (url ? `docs-feedback:${url}` : null),
    [url]
  );
  const [previous, setPrevious] = useState<PageFeedback | null>(null);
  const [opinion, setOpinion] = useState<PageFeedback["opinion"] | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!storageKey) return;

    const item = window.localStorage.getItem(storageKey);
    if (!item) return;

    try {
      const stored = JSON.parse(item) as PageFeedback;
      if (stored.opinion === "good" || stored.opinion === "bad") {
        setPrevious(stored);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  async function submit(event?: SyntheticEvent) {
    event?.preventDefault();
    if (!opinion || !url) return;

    const feedback: PageFeedback = {
      url,
      opinion,
      message
    };

    setIsPending(true);

    try {
      posthog.capture(
        "docs_feedback_submitted",
        feedback,
        { transport: "sendBeacon" }
      );

      await onSendAction?.(feedback);

      if (storageKey) {
        window.localStorage.setItem(storageKey, JSON.stringify(feedback));
      }

      setPrevious(feedback);
      setOpinion(null);
      setMessage("");
    } finally {
      setIsPending(false);
    }
  }

  const activeOpinion = previous?.opinion ?? opinion;
  const showForm = opinion !== null && previous === null;

  return (
    <section className="not-prose mt-12 border-y border-fd-border py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <p className="text-sm font-medium text-fd-foreground">{copy.title}</p>
        <div className="flex flex-wrap gap-2">
          <FeedbackButton
            active={activeOpinion === "good"}
            disabled={previous !== null || isPending}
            onClick={() => setOpinion("good")}
          >
            <ThumbsUp className="size-4" />
            {copy.good}
          </FeedbackButton>
          <FeedbackButton
            active={activeOpinion === "bad"}
            disabled={previous !== null || isPending}
            onClick={() => setOpinion("bad")}
          >
            <ThumbsDown className="size-4" />
            {copy.bad}
          </FeedbackButton>
        </div>
      </div>

      {previous ? (
        <div className="mt-4 rounded-lg border border-fd-border bg-fd-card px-4 py-3 text-sm text-fd-muted-foreground">
          <p>{copy.thanks}</p>
          <Button
            type="button"
            variant="outline"
            size="xs"
            className="mt-3"
            onClick={() => {
              setOpinion(previous.opinion);
              setPrevious(null);
              if (storageKey) window.localStorage.removeItem(storageKey);
            }}
          >
            {copy.submitAgain}
          </Button>
        </div>
      ) : null}

      {showForm ? (
        <form className="mt-4 flex flex-col gap-3" onSubmit={submit}>
          <textarea
            autoFocus
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (!event.shiftKey && event.key === "Enter") {
                submit(event);
              }
            }}
            className="min-h-24 resize-none rounded-lg border border-fd-border bg-fd-secondary px-3 py-2 text-sm text-fd-secondary-foreground outline-none placeholder:text-fd-muted-foreground focus-visible:ring-1 focus-visible:ring-fd-ring"
            placeholder={copy.placeholder}
          />
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="w-fit"
            disabled={isPending}
          >
            {copy.submit}
          </Button>
        </form>
      ) : null}
    </section>
  );
}

function FeedbackButton({
  active,
  className,
  ...props
}: ComponentProps<"button"> & { active: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        active
          ? "border-fd-primary bg-fd-primary text-fd-primary-foreground"
          : "border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
        className
      )}
      {...props}
    />
  );
}
