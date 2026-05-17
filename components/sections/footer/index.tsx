import { LanguageSwitcher } from "@/components/language-switcher";
import { isI18nEnabled } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  className?: string;
}

type FooterColumn = {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Download", href: "/download" },
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Release notes", href: "/docs/release-notes" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Installation", href: "/docs/getting-started/installation" },
      { label: "Quick start", href: "/docs/getting-started/quick-start" },
      { label: "Connections", href: "/docs/core-features/connections" },
      { label: "SQL Console", href: "/docs/core-features/sql-console" },
    ],
  },
  {
    title: "Deploy",
    links: [
      { label: "Self-host Dory", href: "/docs/deploy" },
      { label: "Docker", href: "/docs/deploy/docker" },
      { label: "Environment variables", href: "/docs/deploy/environment-variables" },
      { label: "Auth & SSO", href: "/docs/deploy/auth-sso" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: siteConfig.links.github, external: true },
      { label: "X", href: siteConfig.links.twitter, external: true },
      { label: "Email", href: siteConfig.links.email },
    ],
  },
];

export default function FooterSection({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "relative w-full border-t border-dory-line bg-dory-page-wash px-4 py-10 md:px-16 md:py-14 dark:bg-dory-page",
        className,
      )}
    >
      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 sm:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-dory-ink">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer noopener" : undefined}
                      className="group inline-flex items-center gap-1.5 text-sm text-dory-muted transition-colors hover:text-dory-ink"
                    >
                      {link.label}
                      {link.external ? (
                        <ArrowUpRight className="size-3.5 opacity-55 transition-opacity group-hover:opacity-100" />
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 text-sm text-dory-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} DoryLab</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-dory-ink"
            >
              Open source
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {isI18nEnabled ? <LanguageSwitcher /> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
