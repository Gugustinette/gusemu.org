<template>
  <section class="about-panel stylized-panel">
    <h1>{{ $t("about.title") }}</h1>
    <p>{{ $t("about.body") }}</p>
    <p>{{ $t("about.body-2") }}</p>
    <div class="about-points">
      <p>
        <Icon class="about-point-icon" name="lucide:shield-check" /> {{ $t("about.point-safe") }}
      </p>
      <p>
        <Icon class="about-point-icon" name="lucide:wrench" /> {{ $t("about.point-knowledge") }}
      </p>
      <p>
        <Icon class="about-point-icon" name="lucide:heart-handshake" />
        {{ $t("about.point-community") }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from "#imports";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({ title: t("about.title") });

useSeoMeta({
  title: t("about.title"),
  description: t("about.body"),
  ogTitle: t("about.title"),
  ogDescription: t("about.body"),
});
</script>

<style scoped>
.about-panel {
  padding: 1.4rem;
}

.about-panel p {
  color: var(--text-muted);
  max-width: 70ch;
}

.about-points {
  margin-top: 1rem;
  display: grid;
  gap: 0.3rem;
}

.about-points p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.about-point-icon {
  color: var(--brand);
  display: inline-block;
  flex-shrink: 0;
  margin-right: 0.25rem;
  width: 1.05rem;
  height: 1.05rem;
}
</style>
