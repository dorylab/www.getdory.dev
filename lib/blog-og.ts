import type { BlogOgVariant } from "@/lib/og-image";

type BlogOgFrontmatter = {
  category?: unknown;
  ogVariant?: unknown;
};

const OG_VARIANTS = new Set<BlogOgVariant>(["default", "ai-providers"]);

function getInferredBlogCategory(slug: string) {
  if (slug.includes("database-clients")) {
    return "Guide";
  }

  if (slug.includes("gpt") || slug.includes("model")) {
    return "AI Update";
  }

  if (slug.includes("byok") || slug.includes("ai-providers")) {
    return "AI Providers";
  }

  if (
    slug.includes("oracle") ||
    slug.includes("sqlserver") ||
    slug.includes("database-support")
  ) {
    return "Database Support";
  }

  return "Product Brief";
}

function getInferredOgVariant(slug: string): BlogOgVariant {
  if (slug.includes("byok") || slug.includes("ai-providers")) {
    return "ai-providers";
  }

  return "default";
}

export function getBlogOgConfig(
  post: unknown,
  slug: string,
): { category: string; variant: BlogOgVariant } {
  const frontmatter = post as BlogOgFrontmatter;
  const category =
    typeof frontmatter.category === "string" &&
    frontmatter.category.trim().length > 0
      ? frontmatter.category.trim()
      : getInferredBlogCategory(slug);
  const variant =
    typeof frontmatter.ogVariant === "string" &&
    OG_VARIANTS.has(frontmatter.ogVariant as BlogOgVariant)
      ? (frontmatter.ogVariant as BlogOgVariant)
      : getInferredOgVariant(slug);

  return { category, variant };
}
