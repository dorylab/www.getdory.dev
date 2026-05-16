import * as React from "react";

import { cn } from "@/lib/utils";

function Navbar({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar"
      className={cn(
        "flex w-full items-center justify-between gap-3 px-3 py-3 md:px-4",
        className,
      )}
      {...props}
    />
  );
}

function NavbarLeft({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-left"
      className={cn(
        "flex min-w-0 flex-1 items-center justify-start gap-3 md:gap-4",
        className,
      )}
      {...props}
    />
  );
}

function NavbarRight({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-right"
      className={cn(
        "flex flex-1 items-center justify-end gap-2 md:gap-3",
        className,
      )}
      {...props}
    />
  );
}

function NavbarCenter({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-center"
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    />
  );
}

export { Navbar, NavbarCenter, NavbarLeft, NavbarRight };
