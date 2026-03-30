<template>
  <section class="about-panel stylized-panel">
    <div class="markdown-content">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from "#imports";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { locale } = useI18n();
const aboutPath = computed(() => `/${locale.value}/about`);

const { data: page } = await useAsyncData(
  () => `about-page-${locale.value}`,
  async () => {
    return queryCollection("content").path(aboutPath.value).first();
  },
);

useHead({ title: page.value?.title || "About" });
useSeoMeta({
  title: page.value?.title || "About",
  description: page.value?.description || "",
  ogTitle: page.value?.title || "About",
  ogDescription: page.value?.description || "",
});
</script>
