<template>
  <section class="search-panel stylized-panel">
    <h1>{{ $t("search.title") }}</h1>

    <label class="search-input-wrap" for="search-input">
      <Icon name="lucide:search" />
      <input id="search-input" type="search" :placeholder="$t('search.placeholder')" />
    </label>
  </section>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from "#imports";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({ title: t("search.title") });

useSeoMeta({
  title: t("search.title"),
  description: t("search.placeholder"),
  ogTitle: t("search.title"),
  ogDescription: t("search.placeholder"),
});
</script>

<style scoped>
.search-panel {
  padding: 1.4rem;
}

.search-panel p {
  color: var(--text-muted);
  max-width: 70ch;
}

.search-input-wrap {
  margin-top: 1rem;
  border: 1px solid var(--line);
  background: var(--surface-2);
  border-radius: 14px;
  padding: 0.66rem 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.search-input-wrap input {
  width: 100%;
  border: none;
  outline: none;
  font: inherit;
  background: transparent;
  color: var(--text);
}
</style>
