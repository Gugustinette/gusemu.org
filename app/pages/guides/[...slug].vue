<template>
  <main class="guides-layout">
    <aside class="guides-sidebar stylized-panel">
      <h2>{{ t("guides.sidebarTitle") }}</h2>
      <ul>
        <GuidesSidebarItem
          v-for="item in sidebarItems"
          :key="item.path || item.title"
          :item="item"
          :current-path="normalizedPath"
          :locale-code="locale"
        />
      </ul>
    </aside>

    <article class="markdown-content stylized-panel">
      <ContentRenderer v-if="page" :value="page" />

      <GuidesBottomNavigation
        :items="sidebarItems"
        :current-path="normalizedPath"
        :locale-code="locale"
      />
    </article>
  </main>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from "#imports";
import GuidesBottomNavigation from "~/components/guides/GuidesBottomNavigation.vue";
import GuidesSidebarItem from "~/components/guides/GuidesSidebarItem.vue";
import { normalizeContentPath, type NavigationItem } from "~/utils/guides";

definePageMeta({
  layout: "raw",
});

const route = useRoute();
const { locale, t, te } = useI18n();
const fallbackLocale = "en";

const normalizedPath = computed(() => normalizeContentPath(route.path) || "/");

const localizedContentPath = computed(() => `/${locale.value}${normalizedPath.value}`);
const fallbackContentPath = computed(() => `/${fallbackLocale}${normalizedPath.value}`);

// Get the page content for the current route
const { data: page } = await useAsyncData(
  () => `guide-page-${locale.value}-${normalizedPath.value}`,
  async () => {
    // Try current locale first, then fall back to English when needed.
    const localized = await queryCollection("content").path(localizedContentPath.value).first();

    if (localized || locale.value === fallbackLocale) {
      return localized;
    }

    return queryCollection("content").path(fallbackContentPath.value).first();
  },
);

watchEffect(() => {
  const title = page.value?.title || t("guides.defaultTitle") || "Guide";
  useHead({ title });
  useSeoMeta({
    title,
    description: page.value?.description || t("guides.defaultDescription") || "",
    ogTitle: title,
    ogDescription: page.value?.description || t("guides.defaultDescription") || "",
  });
});

// Get the navigation tree for the sidebar
const { data: navigation } = await useAsyncData("guides-navigation", () =>
  queryCollectionNavigation("content"),
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Guide page not found", fatal: true });
}

/**
 * Builds the guides sidebar for the current locale and fills missing entries
 * from the fallback locale.
 */
function narrowToGuides(items: NavigationItem[] = []): NavigationItem[] {
  const localizedRoot = findGuidesRoot(items, locale.value);
  const fallbackRoot = findGuidesRoot(items, fallbackLocale);

  return mergeNavigationItems(localizedRoot?.children || [], fallbackRoot?.children || []);
}

/**
 * Recursively finds the guides root node for a given locale in the
 * navigation tree.
 */
function findGuidesRoot(
  items: NavigationItem[] = [],
  localeCode: string,
): NavigationItem | undefined {
  for (const item of items) {
    if (isGuidesRootPath(item.path, localeCode)) {
      return item;
    }

    const inChildren = findGuidesRoot(item.children || [], localeCode);
    if (inChildren) {
      return inChildren;
    }
  }

  return undefined;
}

/**
 * Checks whether a path points to a locale-specific guides root page.
 */
function isGuidesRootPath(path: string | undefined, localeCode: string): boolean {
  if (!path) {
    return false;
  }

  return path === `/${localeCode}/guides` || path === `/${localeCode}/guides/index`;
}

/**
 * Merges navigation trees by a stable key so localized items override fallback
 * titles and metadata while preserving missing fallback branches.
 */
function mergeNavigationItems(
  primary: NavigationItem[] = [],
  fallback: NavigationItem[] = [],
): NavigationItem[] {
  const merged = new Map<string, NavigationItem>();

  for (const item of fallback) {
    merged.set(getNavigationKey(item), {
      ...item,
      children: mergeNavigationItems([], item.children || []),
    });
  }

  for (const item of primary) {
    const key = getNavigationKey(item);
    const existing = merged.get(key);

    if (!existing) {
      merged.set(key, {
        ...item,
        children: mergeNavigationItems(item.children || [], []),
      });
      continue;
    }

    merged.set(key, {
      ...existing,
      ...item,
      children: mergeNavigationItems(item.children || [], existing.children || []),
    });
  }

  return Array.from(merged.values());
}

/**
 * Returns a stable key for merge operations. Normalized path is preferred,
 * then title when no path exists.
 */
function getNavigationKey(item: NavigationItem): string {
  if (item.path) {
    return normalizeContentPath(item.path) || item.path;
  }

  return `title:${item.title || "untitled"}`;
}

/**
 * Returns the i18n key for a first-level guides section folder when available.
 */
function getGuidesSectionTranslationKey(path?: string): string | undefined {
  const normalizedPath = normalizeContentPath(path);
  if (!normalizedPath) {
    return undefined;
  }

  const match = normalizedPath.match(/^\/guides\/([^/]+)$/);
  if (!match) {
    return undefined;
  }

  const sectionSegment = match[1];
  if (!sectionSegment) {
    return undefined;
  }

  const sectionSlug = sectionSegment
    .replace(/^\d+\./, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase();

  return `guides.sections.${sectionSlug}`;
}

/**
 * Prefer i18n labels for first-level section folders while preserving
 * content-defined titles for all other entries.
 */
function getLocalizedNavigationTitle(item: NavigationItem): string | undefined {
  const translationKey = getGuidesSectionTranslationKey(item.path);
  if (translationKey && te(translationKey)) {
    return t(translationKey);
  }

  return item.title;
}

/**
 * Recursively normalizes all navigation paths so they can be matched against
 * the locale-agnostic route path.
 */
function normalizeNavigation(item: NavigationItem): NavigationItem {
  return {
    ...item,
    title: getLocalizedNavigationTitle(item),
    path: normalizeContentPath(item.path),
    children: (item.children || []).map(normalizeNavigation),
  };
}

const sidebarItems = computed(() =>
  narrowToGuides(navigation.value as NavigationItem[]).map(normalizeNavigation),
);
</script>

<style scoped>
.guides-layout {
  width: min(1200px, calc(100% - 2rem));
  margin: 1.4rem auto;
  display: grid;
  grid-template-columns: minmax(240px, 300px) minmax(0, 1fr);
  gap: 1rem;
}

.guides-sidebar {
  padding: 1rem;
  align-self: start;
  position: sticky;
  top: 5.4rem;
}

.guides-sidebar h2 {
  margin-bottom: 0.8rem;
}

.guides-sidebar ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

@media (max-width: 1050px) {
  .guides-layout {
    grid-template-columns: 1fr;
  }

  .guides-sidebar {
    position: static;
  }
}
</style>
