"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import DoryIcon from "@/public/dory.png";

import { ModeToggle } from "../../dory/mode-toggle";
import Github from "../../logos/github";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarProps {
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  name = "Dory",
  homeUrl = "/",
  mobileLinks = [],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const t = useTranslations("navbar");
  const fallbackMobileLinks = [
    { text: t("home"), href: "/" },
    { text: t("blog"), href: "/blog" },
    { text: t("download"), href: "/download" },
  ];
  const resolvedMobileLinks =
    mobileLinks.length > 0 ? mobileLinks : fallbackMobileLinks;
  const hasMobileLinks = showNavigation && resolvedMobileLinks.length > 0;

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-3 z-50 px-3 md:px-6",
        className,
      )}
    >
      <div className="relative mx-auto flex max-w-[1400px] justify-center">
        <NavbarComponent className="justify-center px-0 py-0">
          <div className="site-header-shell pointer-events-auto relative flex w-full max-w-[21.5rem] items-center justify-between gap-3 rounded-full px-3 py-1.5 sm:max-w-[24rem] md:w-fit md:max-w-full md:justify-center md:gap-3 md:px-2">
            <NavbarLeft className="flex-none">
              <Link
                href={homeUrl}
                className="group flex min-w-0 items-center gap-2.5 rounded-full py-1.5 pr-3 pl-1 transition-opacity hover:opacity-90"
              >
                <Image
                  src={DoryIcon}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 shrink-0 rounded-full object-contain"
                  priority
                />
                <span className="min-w-0">
                  <span className="text-landing-foreground block truncate text-[0.95rem] font-semibold tracking-[-0.03em] dark:text-white">
                    {name}
                  </span>
                </span>
              </Link>
            </NavbarLeft>
            {showNavigation && (
              <div className="hidden md:flex">
                {customNavigation || <Navigation />}
              </div>
            )}
            <NavbarRight className="flex-none">
              <div className="hidden items-center gap-2 md:flex">
                <ModeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-landing-foreground hover:text-landing-foreground h-8 rounded-full border border-transparent px-3 text-[13px] font-medium tracking-[0.01em] hover:bg-black/4 dark:text-white dark:hover:bg-white/7"
                >
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5"
                  >
                    <Github className="size-3.5 opacity-72" />
                    Github
                    <ArrowUpRight className="text-landing-foreground/45 size-3.5 dark:text-white/50" />
                  </a>
                </Button>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 shrink-0 rounded-full border border-transparent hover:bg-black/4 dark:hover:bg-white/7 md:hidden"
                  >
                    <Menu className="size-5" />
                    <span className="sr-only">{t("toggleMenu")}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-background/95 flex h-full w-[88vw] max-w-sm flex-col border-l border-white/10 px-6 py-6 backdrop-blur-xl"
                >
                  <SheetHeader className="space-y-4 text-left">
                    <Link href={homeUrl} className="flex items-center gap-3">
                      <Image
                        src={DoryIcon}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-contain"
                      />
                      <div className="min-w-0">
                        <SheetTitle className="truncate text-3xl font-semibold tracking-tight">
                          {name}
                        </SheetTitle>
                        <SheetDescription className="mt-1 text-sm">
                          {t("tagline")}
                        </SheetDescription>
                      </div>
                    </Link>
                  </SheetHeader>

                  {hasMobileLinks ? (
                    <nav className="mt-8 grid gap-2">
                      {resolvedMobileLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="hover:bg-accent/60 flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors"
                        >
                          <span>{link.text}</span>
                          <ArrowUpRight className="text-muted-foreground size-4" />
                        </Link>
                      ))}
                    </nav>
                  ) : (
                    <></>
                  )}

                  <div className="mt-auto flex flex-col gap-3 pt-8 md:hidden">
                    <ModeToggle compact={false} />
                    <Button
                      variant="outline"
                      className="site-action-button h-auto w-full justify-between rounded-2xl px-4 py-4"
                      asChild
                    >
                      <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-left"
                      >
                        <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6">
                          <Github className="size-4" />
                        </span>
                        <span className="flex flex-1 flex-col">
                          <span className="text-foreground text-sm font-medium">
                            GitHub
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {t("githubDescription")}
                          </span>
                        </span>
                        <ArrowUpRight className="text-muted-foreground size-4 shrink-0" />
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </NavbarRight>
          </div>
        </NavbarComponent>
      </div>
    </header>
  );
}
