<template>
  <nav
    v-if="previousPage || nextPage"
    class="content-navigation"
    aria-label="Guide page navigation"
  >
    <NuxtLink v-if="previousPage" :to="previousPage.to" class="content-navigation-link">
      <span class="content-navigation-label">{{ t("guides.previousPage") }}</span>
      <span class="content-navigation-title">{{ previousPage.title }}</span>
    </NuxtLink>
    <div v-else class="content-navigation-empty" aria-hidden="true" />

    <NuxtLink
      v-if="nextPage"
      :to="nextPage.to"
      class="content-navigation-link content-navigation-link-next"
    >
      <span class="content-navigation-label">{{ t("guides.nextPage") }}</span>
      <span class="content-navigation-title">{{ nextPage.title }}</span>
    </NuxtLink>
    <div v-else class="content-navigation-empty" aria-hidden="true" />
  </nav>
</template>

<script setup lang="ts">
import {
  buildNavigationLabel,
  toLocalizedPath,
  type LocaleCode,
  type NavigationItem,
} from "~/utils/guides";

const props = defineProps<{
  items: NavigationItem[];
  currentPath: string;
  localeCode: string;
}>();

const { t } = useI18n();

function flattenNavigation(items: NavigationItem[] = []): NavigationItem[] {
  const flattened: NavigationItem[] = [];

  for (const item of items) {
    const hasChildren = Boolean(item.children?.length);

    // Only leaf nodes are considered actual pages for previous/next navigation.
    if (item.path && !hasChildren) {
      flattened.push(item);
    }

    if (hasChildren) {
      flattened.push(...flattenNavigation(item.children));
    }
  }

  return flattened;
}

const orderedGuidePages = computed(() => {
  const unique = new Map<string, NavigationItem>();

  for (const item of flattenNavigation(props.items)) {
    if (!item.path) {
      continue;
    }

    if (!unique.has(item.path)) {
      unique.set(item.path, item);
    }
  }

  return Array.from(unique.values()).map((item) => ({
    path: item.path as string,
    title: buildNavigationLabel(item),
  }));
});

const currentPageIndex = computed(() =>
  orderedGuidePages.value.findIndex((item) => item.path === props.currentPath),
);

const resolvedLocale = computed<LocaleCode>(() => (props.localeCode === "fr" ? "fr" : "en"));

const previousPage = computed(() => {
  if (currentPageIndex.value <= 0) {
    return null;
  }

  const item = orderedGuidePages.value[currentPageIndex.value - 1];
  if (!item) {
    return null;
  }

  const localizedPath = toLocalizedPath(item.path, resolvedLocale.value);

  return {
    ...item,
    to: localizedPath || item.path,
  };
});

const nextPage = computed(() => {
  if (currentPageIndex.value < 0 || currentPageIndex.value >= orderedGuidePages.value.length - 1) {
    return null;
  }

  const item = orderedGuidePages.value[currentPageIndex.value + 1];
  if (!item) {
    return null;
  }

  const localizedPath = toLocalizedPath(item.path, resolvedLocale.value);

  return {
    ...item,
    to: localizedPath || item.path,
  };
});
</script>

<style scoped>
.content-navigation {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.content-navigation-link {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid color-mix(in oklab, var(--line) 68%, #000 32%);
  background: color-mix(in oklab, var(--surface-2) 86%, #000 14%);
  text-decoration: none;
  transition: color 0.14s ease;
  height: fit-content;
}

.content-navigation-link-next {
  text-align: right;
  align-items: flex-end;
}

.content-navigation-label {
  font-size: 0.74rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.content-navigation-title {
  color: var(--text);
  font-weight: 600;
}

.content-navigation-empty {
  min-height: 88px;
}

@media (max-width: 1050px) {
  .content-navigation {
    grid-template-columns: 1fr;
  }

  .content-navigation-link-next {
    text-align: left;
    align-items: flex-start;
  }

  .content-navigation-empty {
    display: none;
  }
}
</style>
