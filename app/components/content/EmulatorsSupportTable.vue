<template>
  <div class="emu-table-wrap">
    <div class="support-legend" aria-label="Support level legend">
      <div v-for="item in supportLegend" :key="item.level" class="support-legend-item">
        <span
          class="support-icon"
          :class="`support-${item.level}`"
          :title="item.label"
          :aria-label="item.label"
        >
          <Icon :name="supportIcon(item.level)" />
        </span>
        <span>{{ item.label }}</span>
      </div>
    </div>

    <table class="emu-table">
      <thead>
        <tr>
          <th scope="col">Emulator</th>
          <th v-for="platform in platforms" :key="platform.key" scope="col">
            {{ platform.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="group in groupedRows" :key="group.consoleKey">
          <tr class="console-row">
            <th scope="row" class="console-name-cell">
              {{ group.consoleLabel }}
            </th>
            <td v-for="platform in platforms" :key="`${group.consoleKey}-${platform.key}`" />
          </tr>

          <tr v-for="emulator in group.emulators" :key="`${group.consoleKey}-${emulator.name}`">
            <th scope="row" class="emulator-name-cell">
              <span class="emulator-name-wrap">
                <a
                  class="emulator-website-link"
                  :href="emulator.website"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ emulator.name }}
                </a>
                <a
                  class="emulator-repository-link"
                  :href="emulator.repository"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open repository"
                  aria-label="Open repository"
                >
                  <Icon name="mdi:git" />
                </a>
              </span>
            </th>
            <td
              v-for="platform in platforms"
              :key="`${group.consoleKey}-${emulator.name}-${platform.key}`"
            >
              <span
                class="support-icon"
                :class="`support-${emulator.platforms[platform.key]}`"
                :title="supportLabel(emulator.platforms[platform.key])"
                :aria-label="supportLabel(emulator.platforms[platform.key])"
              >
                <Icon :name="supportIcon(emulator.platforms[platform.key])" />
              </span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {
  EmulatorSupportLevel,
  emulatorConsoleLabels,
  emulatorConsoleOrder,
  emulators,
} from "~/data/emulators";

const platforms: Array<{
  key: "windows" | "macos" | "linux" | "android" | "ios";
  label: string;
}> = [
  { key: "windows", label: "Windows" },
  { key: "macos", label: "macOS" },
  { key: "linux", label: "Linux" },
  { key: "android", label: "Android" },
  { key: "ios", label: "iOS" },
];

const supportLegend: Array<{
  level: EmulatorSupportLevel;
  label: string;
}> = [
  { level: EmulatorSupportLevel.Recommended, label: "Recommended" },
  { level: EmulatorSupportLevel.Stable, label: "Stable" },
  { level: EmulatorSupportLevel.Unstable, label: "Unstable" },
  { level: EmulatorSupportLevel.Unsupported, label: "Unsupported" },
];

const groupedRows = computed(() =>
  emulatorConsoleOrder.map((consoleKey) => ({
    consoleKey,
    consoleLabel: emulatorConsoleLabels[consoleKey],
    emulators: emulators.filter((emulator) => emulator.emulating[consoleKey]),
  })),
);

function supportIcon(level: EmulatorSupportLevel): string {
  switch (level) {
    case EmulatorSupportLevel.Recommended:
      return "heroicons:star-20-solid";
    case EmulatorSupportLevel.Stable:
      return "heroicons:check-circle-20-solid";
    case EmulatorSupportLevel.Unstable:
      return "heroicons:exclamation-triangle-20-solid";
    case EmulatorSupportLevel.Unsupported:
    default:
      return "heroicons:x-circle-20-solid";
  }
}

function supportLabel(level: EmulatorSupportLevel): string {
  switch (level) {
    case EmulatorSupportLevel.Recommended:
      return "Recommended";
    case EmulatorSupportLevel.Stable:
      return "Stable";
    case EmulatorSupportLevel.Unstable:
      return "Unstable";
    case EmulatorSupportLevel.Unsupported:
    default:
      return "Unsupported";
  }
}
</script>

<style scoped>
.emu-table-wrap {
  margin-top: 1rem;
  margin-bottom: 1.4rem;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 14px;
}

.support-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1rem;
  margin: 0;
  padding: 0.55rem 1rem;
  list-style: none;
  border-bottom: 1px solid var(--line);
  background: color-mix(in oklab, var(--surface-2) 72%, transparent);
  align-items: center;
}

.support-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  line-height: 1;
  margin: 0;
  padding: 0;
  color: var(--text-muted);
}

.emu-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
  background: color-mix(in oklab, var(--surface) 90%, transparent);
}

.emu-table th,
.emu-table td {
  border-top: 1px solid var(--line);
  padding: 0.7rem 0.8rem;
  text-align: center;
}

.emu-table thead th {
  border-top: none;
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.emu-table thead th:first-child {
  text-align: left;
}

.emulator-name-cell {
  text-align: left;
  white-space: nowrap;
}

.emulator-name-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.console-row {
  background: color-mix(in oklab, var(--surface-2) 78%, transparent);
}

.console-name-cell {
  text-align: left;
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.emulator-website-link {
  color: var(--brand);
  text-decoration: underline;
  text-decoration-color: color-mix(in oklab, var(--brand) 60%, transparent);
  text-underline-offset: 0.14rem;
}

.emulator-repository-link {
  display: inline-flex;
  align-items: center;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1;
}

.emulator-repository-link:hover {
  color: var(--brand);
}

.support-icon {
  display: inline-flex;
  font-size: 1.15rem;
}

.support-recommended {
  color: var(--brand);
}

.support-stable {
  color: #1f9a74;
}

.support-unstable {
  color: #cc8a1a;
}

.support-unsupported {
  color: #c55266;
}
</style>
