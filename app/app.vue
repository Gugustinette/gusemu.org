<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <main>
      <NuxtPage />
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead(() => ({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/brand/icon-dark.png",
    },
  ],
}));
</script>
