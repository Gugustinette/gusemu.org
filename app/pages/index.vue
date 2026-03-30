<template>
  <section class="hero-panel stylized-panel">
    <p class="hero-kicker">{{ $t("home.kicker") }}</p>
    <h1>{{ $t("home.title") }}</h1>
    <p class="hero-description">{{ $t("home.description") }}</p>
    <div class="hero-actions">
      <NuxtLink :to="localePath('/guides')">
        <Button :label="$t('home.primaryCta')" icon="lucide:book-open-check" />
      </NuxtLink>
      <!--
      <NuxtLink :to="localePath('/search')">
        <Button :label="$t('home.secondaryCta')" icon="lucide:search" type="secondary" />
      </NuxtLink>
      -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from "#imports";
import { useI18n } from "vue-i18n";
import Button from "~/components/Button.vue";

const localePath = useLocalePath();
const { t } = useI18n();

useHead({ title: t("home.title") });

useSeoMeta({
  title: t("home.title"),
  description: t("home.description"),
  ogTitle: t("home.title"),
  ogDescription: t("home.description"),
});
</script>

<style scoped>
.hero-panel {
  padding: 1.4rem;
}

.hero-kicker {
  color: var(--brand);
  font-family: var(--font-headings);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.35rem;
}

.hero-description {
  color: var(--text-muted);
  max-width: 70ch;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.2rem;
}
</style>
