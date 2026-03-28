<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="app-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "~/components/header/SiteHeader.vue";
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1 1 auto;
}
</style>
