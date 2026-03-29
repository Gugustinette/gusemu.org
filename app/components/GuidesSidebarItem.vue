<template>
  <li class="sidebar-item">
    <NuxtLink
      v-if="item.path && !hasChildren"
      :to="localizedPath"
      class="sidebar-link"
      :class="{ 'is-active': isActive }"
    >
      {{ label }}
    </NuxtLink>

    <span v-else class="sidebar-link sidebar-label">{{ label }}</span>

    <ul v-if="childItems.length > 0" class="sidebar-sublist">
      <GuidesSidebarItem
        v-for="child in childItems"
        :key="child.path || child.title"
        :item="child"
        :current-path="currentPath"
        :locale-code="localeCode"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import {
  buildNavigationLabel,
  toLocalizedPath,
  type LocaleCode,
  type NavigationItem,
} from "~/utils/guides";

const props = defineProps<{
  item: NavigationItem;
  currentPath: string;
  localeCode: LocaleCode;
}>();

const childItems = computed(() => props.item.children || []);

const hasChildren = computed(() => childItems.value.length > 0);

const label = computed(() => buildNavigationLabel(props.item));

const isActive = computed(() => props.currentPath === props.item.path);

const localizedPath = computed(() => toLocalizedPath(props.item.path, props.localeCode));
</script>

<style scoped>
.sidebar-item {
  margin: 0.2rem 0;
}

.sidebar-link {
  display: inline-flex;
  width: 100%;
  border-radius: 9px;
  padding: 0.36rem 0.5rem;
  color: var(--text-muted);
}

.sidebar-label {
  cursor: default;
}

.sidebar-link:hover,
.sidebar-link.is-active {
  color: var(--text);
  background: color-mix(in oklab, var(--brand) 14%, transparent);
}

.sidebar-label:hover,
.sidebar-label.is-active {
  color: var(--text-muted);
  background: transparent;
}

.sidebar-sublist {
  margin-left: 0.95rem;
  border-left: 1px solid var(--line);
  padding-left: 0.75rem;
  list-style: none;
}

.sidebar-sublist .sidebar-link {
  padding-left: 0.65rem;
}
</style>
