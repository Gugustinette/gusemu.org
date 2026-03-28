export type LocaleCode = "en" | "fr";

export type NavigationItem = {
  title?: string;
  path?: string;
  children?: NavigationItem[];
};

export function buildNavigationLabel(item: Pick<NavigationItem, "title" | "path">): string {
  if (item.title) {
    return item.title;
  }

  const lastChunk = item.path?.split("/").filter(Boolean).at(-1);
  if (!lastChunk) {
    return "Page";
  }

  return lastChunk.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function toLocalizedPath(
  path: string | undefined,
  localeCode: LocaleCode,
): string | undefined {
  if (!path) {
    return undefined;
  }

  if (localeCode === "en") {
    return path;
  }

  return `/${localeCode}${path}`;
}

export function normalizeContentPath(path?: string): string | undefined {
  if (!path) {
    return undefined;
  }

  const withoutLocale = path.replace(/^\/(en|fr)(?=\/)/, "");

  if (withoutLocale === "/index") {
    return "/";
  }

  if (withoutLocale.endsWith("/index")) {
    return withoutLocale.slice(0, -6);
  }

  return withoutLocale;
}
