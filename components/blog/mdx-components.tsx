import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-10 text-4xl font-semibold tracking-tight" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-muted-foreground leading-7 [&:not(:first-child)]:mt-5" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-5 ml-6 list-disc space-y-2 text-muted-foreground" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-5 ml-6 list-decimal space-y-2 text-muted-foreground" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1 leading-7" {...props} />,
  hr: (props: ComponentPropsWithoutRef<"hr">) => <hr className="border-border my-10" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-brand/40 bg-brand/5 text-foreground mt-6 rounded-r-2xl border-l-4 px-5 py-4 italic"
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-brand underline-offset-4 transition hover:underline"
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => {
    const isCodeBlock = Boolean(className);

    if (isCodeBlock) {
      return (
        <code
          className={cn(
            "block overflow-x-auto rounded-2xl border border-black/8 bg-slate-950/95 px-4 py-3 font-mono text-sm text-slate-100 dark:border-white/10",
            className,
          )}
          {...props}
        />
      );
    }

    return (
      <code
        className="bg-muted text-foreground rounded-md px-1.5 py-0.5 font-mono text-[0.9em]"
        {...props}
      />
    );
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-2xl border border-black/8 bg-slate-950/95 p-4 text-sm text-slate-100 dark:border-white/10"
      {...props}
    />
  ),
};
