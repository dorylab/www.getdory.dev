"use client";

import { Dithering, GrainGradient } from "@paper-design/shaders-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { useIsVisible } from "@/lib/hooks/use-is-visible";
import { cn } from "@/lib/utils";
import HeroImage from "@/public/easy-to-use-sql-console.png";

export function Hero() {
  const t = useTranslations("landing");
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLImageElement | null>(null);
  const visible = useIsVisible(ref);
  const [showShaders, setShowShaders] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowShaders(true);
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  const heroBgColors =
    resolvedTheme === "dark"
      ? ["#3B82F6", "#06B6D4", "#6366F1", "#0B122000"]
      : ["#2563EB", "#22D3EE", "#A5B4FC", "#FFFFFF00"];

  const ditherFront = resolvedTheme === "dark" ? "#22D3EE" : "#2563EB";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(24,168,144,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.28)_38%,rgba(255,255,255,0)_72%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_34%),radial-gradient(circle_at_top_right,rgba(46,211,183,0.18),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.72),rgba(15,23,42,0.24)_42%,rgba(15,23,42,0)_76%)]" />

      {showShaders && (
        <GrainGradient
          className="animate-fd-fade-in absolute inset-0 opacity-90 duration-800"
          colors={heroBgColors}
          colorBack="#00000000"
          softness={1}
          intensity={0.82}
          noise={0.42}
          speed={visible ? 1 : 0}
          shape="corners"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
        />
      )}

      {showShaders && (
        <Dithering
          width={720}
          height={720}
          colorBack="#00000000"
          colorFront={ditherFront}
          shape="sphere"
          type="4x4"
          scale={0.5}
          size={3}
          speed={0}
          frame={5000 * 120}
          className="animate-fd-fade-in absolute duration-400 max-md:right-[-250px] max-md:bottom-[-28%] max-lg:right-[-180px] max-lg:bottom-[-42%] lg:top-[2%] lg:right-[1%]"
          minPixelRatio={1}
        />
      )}

      <div className="bg-brand/15 dark:bg-brand/20 absolute inset-x-[12%] top-[16%] h-32 rounded-full blur-3xl" />
      <div className="absolute right-[4%] bottom-[10%] h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-300/10" />
      <div className="from-background via-background/55 absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent" />

      <Image
        ref={ref}
        src={HeroImage}
        alt={t("heroImageAlt")}
        className={cn(
          "absolute right-[-24%] bottom-[-6%] hidden w-[980px] max-w-none rounded-[24px] border border-black/10 shadow-[0_28px_90px_rgba(15,23,42,0.22)] transition-all duration-700 ease-out md:block max-xl:right-[-32%] max-xl:w-[880px] max-lg:right-[-48%] max-lg:bottom-[-6%] max-lg:w-[760px] dark:border-white/10 dark:shadow-[0_28px_90px_rgba(2,6,23,0.56)]",
          imageReady
            ? "animate-in fade-in slide-in-from-bottom-6 duration-700"
            : "invisible",
        )}
        onLoad={() => setImageReady(true)}
        priority
      />
    </div>
  );
}
