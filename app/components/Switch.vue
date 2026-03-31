<template>
  <label class="switch">
    <input type="checkbox" v-model="modelValue" @change="$emit('update:modelValue', modelValue)" />
    <span class="slider" :style="sliderStyle"></span>
  </label>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>({ default: false });
const props = defineProps({
  onColor: {
    type: String,
    default: "var(--brand)",
  },
});

const sliderStyle = computed(() => ({
  "--switch-on-color": props.onColor,
}));
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--line);
  transition: background 0.3s;
  border-radius: 24px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background: var(--surface);
  transition:
    transform 0.25s cubic-bezier(0.4, 2, 0.6, 1),
    background 0.2s;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
}
input:checked + .slider {
  background: var(--switch-on-color, var(--brand));
}
input:checked + .slider:before {
  transform: translateX(20px);
  background: var(--brand-contrast);
}
</style>
