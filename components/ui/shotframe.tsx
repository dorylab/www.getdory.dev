import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"

type FramedImageSrc = string | StaticImageData

type FramedImageProps = {
  src: FramedImageSrc
  alt?: string

  /** 宽高比，例如 16/9、4/3、1 */
  ratio?: number

  /** 外层圆角 */
  radius?: number

  /** 灰色外框厚度 */
  framePadding?: number

  /** 容器 className */
  className?: string

  /** Image 的 className */
  imgClassName?: string

  /** next/image 的 sizes */
  sizes?: string

  /** 是否优先加载 */
  priority?: boolean
}

export function FramedImage({
  src,
  alt = "",
  ratio = 16 / 9,
  radius = 18,
  framePadding = 40,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 900px, 100vw",
  priority = false,
}: FramedImageProps) {
  return (
    <div
      className={cn("w-full", className)}
      style={{
        padding: framePadding,
        borderRadius: radius + 6,
        background:
          "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.06))",
        border: "1px solid rgba(255,255,255,.10)",
        boxShadow:
          "0 12px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.18)",
      }}
    >
      <div
        style={{
          borderRadius: radius + 2,
          background: "rgba(0,0,0,.55)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.10), inset 0 -1px 0 rgba(0,0,0,.35)",
          overflow: "hidden",
        }}
      >
        <AspectRatio ratio={ratio}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn(
              "object-cover select-none",
              "contrast-[1.02] saturate-[1.02]",
              imgClassName,
            )}
          />
        </AspectRatio>
      </div>
    </div>
  )
}
