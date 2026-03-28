<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="app-main">
      <div class="default-page-wrap">
        <slot />
      </div>
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

.default-page-wrap {
  width: min(1100px, calc(100% - 2rem));
  margin: 2rem auto;
}
</style>
