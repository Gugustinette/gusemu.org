<template>
  <header class="site-header">
    <NuxtLink :to="localePath('/')" class="brand-mark">
      <Icon name="lucide:gamepad-2" />
      <strong>{{ $t("siteTitle") }}</strong>
    </NuxtLink>

    <nav class="site-nav">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="['site-nav-link', { 'is-active': isLinkActive(link) }]"
      >
        <Icon :name="link.icon" />
        <span>{{ link.label }}</span>
      </NuxtLink>
    </nav>

    <div class="site-controls">
      <ColorModeSelect />
      <LocaleSelect />
    </div>
  </header>
</template>

<script setup lang="ts">
import ColorModeSelect from "./ColorModeSelect.vue";
import LocaleSelect from "./LocaleSelect.vue";

const localePath = useLocalePath();
const { t } = useI18n();
const route = useRoute();

type HeaderLink = {
  label: string;
  to: string;
  icon: string;
  hasNestedPages?: boolean;
};

const links = computed<HeaderLink[]>(() => [
  { label: t("nav.home"), to: localePath("/"), icon: "lucide:home" },
  // { label: t("nav.search"), to: localePath("/search"), icon: "lucide:search" },
  {
    label: t("nav.guides"),
    to: localePath("/guides"),
    icon: "lucide:book-open",
    hasNestedPages: true,
  },
  { label: t("nav.about"), to: localePath("/about"), icon: "lucide:info" },
]);

const isLinkActive = (link: HeaderLink): boolean => {
  if (link.hasNestedPages) {
    return route.path === link.to || route.path.startsWith(`${link.to}/`);
  }

  return route.path === link.to;
};
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--line);
  backdrop-filter: saturate(170%) blur(12px);
  background: color-mix(in oklab, var(--bg) 84%, transparent);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-headings);
}

.brand-mark .icon {
  color: var(--brand);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.site-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.4rem 0.72rem;
  color: var(--text-muted);
  transition: all 180ms ease;
}

.site-nav-link:hover,
.site-nav-link.is-active {
  color: var(--text);
  border-color: color-mix(in oklab, var(--brand) 38%, transparent);
  background: color-mix(in oklab, var(--brand) 14%, transparent);
}

.site-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 860px) {
  .site-header {
    flex-wrap: wrap;
  }

  .site-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
