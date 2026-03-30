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

    <article class="guides-content stylized-panel">
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

.guides-content {
  min-height: 60vh;
  padding: 1.75rem;
  line-height: 1.7;
}

.guides-content :deep(h1) {
  margin: 0 0 1.25rem;
  line-height: 1.25;
}

.guides-content :deep(h2) {
  margin: 2.5rem 0 1rem;
  line-height: 1.3;
}

.guides-content :deep(h3) {
  margin: 2rem 0 0.8rem;
  line-height: 1.35;
}

.guides-content :is(h1, h2, h3) {
  scroll-margin-top: 7rem;
}

.guides-content :deep(p),
.guides-content :deep(ul),
.guides-content :deep(ol),
.guides-content :deep(pre),
.guides-content :deep(blockquote) {
  margin: 0;
}

.guides-content :deep(* + p),
.guides-content :deep(* + ul),
.guides-content :deep(* + ol),
.guides-content :deep(* + pre),
.guides-content :deep(* + blockquote) {
  margin-top: 1rem;
}

.guides-content :is(p),
.guides-content :is(li) {
  color: var(--text-muted);
}

.guides-content :deep(ul),
.guides-content :deep(ol) {
  padding-left: 1.35rem;
}

.guides-content :is(li) {
  margin-bottom: 0.65rem;
}

.guides-content :deep(li > ul),
.guides-content :deep(li > ol) {
  margin-top: 0.65rem;
}

.guides-content :deep(p a),
.guides-content :deep(li a),
.guides-content > :deep(a) {
  color: var(--brand);
}

.guides-content :deep(h1 a),
.guides-content :deep(h2 a),
.guides-content :deep(h3 a),
.guides-content :deep(h1 a:hover),
.guides-content :deep(h2 a:hover),
.guides-content :deep(h3 a:hover),
.guides-content :deep(h1 a:visited),
.guides-content :deep(h2 a:visited),
.guides-content :deep(h3 a:visited),
.guides-content :deep(h1 a:active),
.guides-content :deep(h2 a:active),
.guides-content :deep(h3 a:active),
.guides-content :deep(h1 a:focus-visible),
.guides-content :deep(h2 a:focus-visible),
.guides-content :deep(h3 a:focus-visible) {
  color: inherit;
}

@media (max-width: 1050px) {
  .guides-layout {
    grid-template-columns: 1fr;
  }

  .guides-sidebar {
    position: static;
  }

  .guides-content {
    padding: 1.2rem;
  }
}
</style>
