"use client";

import { cva } from "class-variance-authority";
import { type ComponentProps, useState } from "react";

import { cn } from "@/lib/utils";
import EasyToUseImg from "@/public/easy-to-use-sql-console.png";
import ResultTableImg from "@/public/result-table.png";
import schemaSuggestionImg from "@/public/schema-aware-autocomplete.png";

import { FramedImage } from "../ui/shotframe";

const previewButtonVariants = cva(
  "h-9 min-w-0 flex-1 rounded-full px-3 text-xs font-medium transition-colors sm:h-8 sm:w-40 sm:flex-none sm:text-sm",
  {
    variants: {
      active: {
        true: "bg-blue-600 text-white dark:bg-blue-500",
        false: "bg-white text-zinc-600 dark:bg-black dark:text-zinc-400",
      },
    },
  },
);

const highlightPositions = {
  0: "translateX(0)",
  1: "translateX(100%)",
  2: "translateX(200%)",
} as const;

export function PreviewImages(props: ComponentProps<"div">) {
  const [active, setActive] = useState<0 | 1 | 2>(0);
  const previews = [
    {
      image: EasyToUseImg,
      name: "Easy to Use",
    },
    {
      image: schemaSuggestionImg,
      name: "Suggestions",
    },
    {
      image: ResultTableImg,
      name: "Results",
    },
  ] as const;

  return (
    <div {...props} className={cn("relative grid", props.className)}>
      <div className="absolute bottom-3 left-1/2 z-2 flex w-[calc(100%-1.5rem)] -translate-x-1/2 flex-row rounded-full border bg-white p-0.5 shadow-xl sm:bottom-0 sm:w-auto dark:bg-black">
        <div
          role="none"
          className="bg-fd-primary absolute z-[-1] h-9 w-1/3 rounded-full transition-transform sm:h-8 sm:w-40"
          style={{
            transform: highlightPositions[active],
          }}
        />
        {previews.map((item, i) => (
          <button
            key={i}
            className={cn(previewButtonVariants({ active: active === i }))}
            onClick={() => setActive(i as 0 | 1 | 2)}
          >
            <span className="block truncate">{item.name}</span>
          </button>
        ))}
      </div>
      {previews.map((item, i) => (
        <FramedImage
          key={i}
          src={item.image}
          ratio={1440 / 900}
          className={cn(
            "col-start-1 row-start-1 select-none",
            active === i
              ? "animate-in fade-in slide-in-from-bottom-12 duration-800"
              : "invisible",
          )}
        />
      ))}
    </div>
  );
}
