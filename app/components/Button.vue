<template>
  <div
    class="btn"
    :class="{
      'btn-primary': type === 'primary',
      'btn-secondary': type === 'secondary',
    }"
  >
    <Icon v-if="icon" :name="icon" />
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    icon?: string;
    type?: "primary" | "secondary";
  }>(),
  {
    type: "primary",
  },
);
</script>

<style scoped>
.btn {
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.62rem 1rem;
  border: 1px solid transparent;
  transition: transform 180ms ease;
}

.btn-primary {
  background: var(--brand);
  color: var(--brand-contrast);
}

.btn-secondary {
  border-color: var(--line);
  background: var(--surface);
}
</style>
