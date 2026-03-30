<template>
  <NuxtLink :to="localePath('/')" class="brand-mark">
    <NuxtImg src="/brand/logo-light.png" alt="gusemu" class="brand-logo brand-logo-light" />
    <NuxtImg src="/brand/logo-dark.png" alt="gusemu" class="brand-logo brand-logo-dark" />
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style>
.brand-logo {
  display: block;
  width: auto;
  height: 48px;
}

.brand-logo-light {
  display: block;
}
.brand-logo-dark {
  display: none;
}

.dark .brand-logo-light {
  display: none;
}
.dark .brand-logo-dark {
  display: block;
}

@media (max-width: 860px) {
  .brand-logo {
    height: 28px;
  }
}
</style>
