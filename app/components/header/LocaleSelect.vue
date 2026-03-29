<template>
  <div class="locale-switch" role="group" aria-label="Language switcher">
    <NuxtLink
      v-for="item in locales"
      :key="getCode(item as string | { code: string })"
      :to="getLocaleHref(getCode(item as string | { code: string }))"
      class="locale-btn"
      :class="{ active: locale === getCode(item as string | { code: string }) }"
    >
      {{ $t(getLabel(getCode(item as string | { code: string }))) }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

function getCode(item: string | { code: string }) {
  return typeof item === "string" ? item : item.code;
}

function getLabel(code: string) {
  return code === "fr" ? "locale.french" : "locale.english";
}

function getLocaleHref(code: string) {
  const path = switchLocalePath(code as any) || "/";
  return path.split("#")[0];
}
</script>

<style scoped>
.locale-switch {
  border: 1px solid var(--line);
  border-radius: 999px;
  overflow: hidden;
  display: inline-flex;
}

.locale-btn {
  padding: 0.35rem 0.65rem;
  color: var(--text-muted);
  background: var(--surface);
}

.locale-btn.active {
  color: var(--brand-contrast);
  background: var(--brand);
}
</style>
