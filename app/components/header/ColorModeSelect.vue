<template>
  <label class="mode-switch">
    <Icon name="lucide:sun-moon" class="mode-icon" />
    <span class="sr-only">{{ $t("mode.label") }}</span>
    <select v-model="colorMode.preference" aria-label="Color mode">
      <option value="system">{{ $t("mode.system") }}</option>
      <option value="light">{{ $t("mode.light") }}</option>
      <option value="dark">{{ $t("mode.dark") }}</option>
    </select>
  </label>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
</script>

<style scoped>
.mode-switch {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  padding: 0.2rem 0.45rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
}

.mode-icon {
  color: var(--text-muted);
}

.mode-switch select {
  border: 0;
  background: transparent;
  color: var(--text);
  font-family: var(--font-base);
  font-size: 0.84rem;
  outline: none;
  cursor: pointer;
}

.sr-only {
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  border: 0;
}
</style>
