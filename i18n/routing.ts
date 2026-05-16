import { defineRouting } from "next-intl/routing";

import { defaultLanguage, locales } from "@/lib/i18n";

export const routing = defineRouting({
  locales,
  defaultLocale: defaultLanguage,
  localePrefix: "as-needed",
  localeDetection: true,
});
