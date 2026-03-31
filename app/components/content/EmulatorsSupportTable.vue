<template>
  <div class="emu-table-wrap">
    <div class="emu-table-header-row">
      <div class="support-legend" aria-label="Support level legend">
        <div v-for="item in supportLegend" :key="item.level" class="support-legend-item">
          <span
            class="support-icon"
            :class="`support-${item.level}`"
            :title="supportLabel(item.level)"
            :aria-label="supportLabel(item.level)"
          >
            <Icon :name="supportIcon(item.level)" />
          </span>
          <span>{{ supportLabel(item.level) }}</span>
        </div>
      </div>
      <div class="libretro-switch-wrap">
        <Switch v-model="showLibretroCores" :on-color="'var(--secondary)'" />
        <span class="libretro-switch-label">{{ t("emulators.table.showLibretroCores") }}</span>
      </div>
    </div>

    <table class="emu-table">
      <thead>
        <tr>
          <th scope="col">{{ t("emulators.table.emulator") }}</th>
          <th v-for="platform in platforms" :key="platform.key" scope="col">
            {{ platform.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="row in allRows"
          :key="
            row.type +
            '-' +
            (row.type === 'console'
              ? row.consoleKey
              : row.type === 'retroarch'
                ? row.consoleKey + '-retroarch'
                : row.type === 'libretro-core'
                  ? row.consoleKey + '-' + row.core.name
                  : row.consoleKey + '-' + row.emulator.name)
          "
        >
          <tr v-if="row.type === 'console'" class="console-row">
            <th scope="row" class="console-name-cell">
              {{ row.consoleLabel }}
            </th>
            <td v-for="platform in platforms" :key="`${row.consoleKey}-${platform.key}`" />
          </tr>
          <tr v-else-if="row.type === 'retroarch'" class="retroarch-row">
            <th scope="row" class="emulator-name-cell">
              <span class="emulator-name-wrap">
                <a
                  class="emulator-website-link"
                  href="https://www.retroarch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RetroArch
                </a>
                <a
                  class="emulator-repository-link"
                  href="https://github.com/libretro/RetroArch"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open repository"
                  aria-label="Open repository"
                >
                  <Icon name="mdi:git" />
                </a>
              </span>
            </th>
            <td v-for="platform in platforms" :key="`retroarch-${row.consoleKey}-${platform.key}`">
              <span
                class="support-icon"
                :class="`support-${row.platforms[platform.key]}`"
                :title="row.labels[platform.key]"
                :aria-label="row.labels[platform.key]"
              >
                <Icon :name="supportIcon(row.platforms[platform.key] ?? defaultLibretroLevel)" />
              </span>
            </td>
          </tr>
          <tr v-else-if="row.type === 'libretro-core'" class="libretro-core-row">
            <th scope="row" class="emulator-name-cell libretro-core-cell">
              <span class="emulator-name-wrap">
                <a
                  v-if="row.core.documentation"
                  class="libretro-core-link"
                  :href="row.core.documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ row.core.name }}
                </a>
                <span v-else class="libretro-core-no-link">{{ row.core.name }}</span>
                <a
                  v-if="row.core.repository"
                  class="emulator-repository-link"
                  :href="row.core.repository"
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
              :key="`${row.consoleKey}-core-${row.core.name}-${platform.key}`"
            >
              <span
                class="support-icon"
                :class="`support-${row.core.platforms?.[platform.key] ?? defaultLibretroLevel}`"
                :title="supportLabel(row.core.platforms?.[platform.key] ?? defaultLibretroLevel)"
                :aria-label="
                  supportLabel(row.core.platforms?.[platform.key] ?? defaultLibretroLevel)
                "
              >
                <Icon
                  :name="supportIcon(row.core.platforms?.[platform.key] ?? defaultLibretroLevel)"
                />
              </span>
            </td>
          </tr>
          <tr v-else-if="row.type === 'emulator'">
            <th scope="row" class="emulator-name-cell">
              <span class="emulator-name-wrap">
                <a
                  class="emulator-website-link"
                  :href="row.emulator.website"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ row.emulator.name }}
                </a>
                <a
                  v-if="row.emulator.repository"
                  class="emulator-repository-link"
                  :href="row.emulator.repository"
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
              :key="`${row.consoleKey}-${row.emulator.name}-${platform.key}`"
            >
              <span
                class="support-icon"
                :class="`support-${row.emulator.platforms[platform.key] ?? defaultLibretroLevel}`"
                :title="supportLabel(row.emulator.platforms[platform.key] ?? defaultLibretroLevel)"
                :aria-label="
                  supportLabel(row.emulator.platforms[platform.key] ?? defaultLibretroLevel)
                "
              >
                <Icon
                  :name="supportIcon(row.emulator.platforms[platform.key] ?? defaultLibretroLevel)"
                />
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
  type EmulatorConsoleKey,
} from "~/data/emulators";
import { libretroCores } from "~/data/libretro-cores";
import Switch from "~/components/Switch.vue";

const { t } = useI18n();
const showLibretroCores = ref(false);
const defaultLibretroLevel = EmulatorSupportLevel.Stable;

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
}> = [
  { level: EmulatorSupportLevel.Recommended },
  { level: EmulatorSupportLevel.Stable },
  { level: EmulatorSupportLevel.Unstable },
  { level: EmulatorSupportLevel.Unsupported },
];

type TableRow =
  | { type: "console"; consoleKey: EmulatorConsoleKey; consoleLabel: string }
  | {
      type: "retroarch";
      consoleKey: EmulatorConsoleKey;
      platforms: Record<string, EmulatorSupportLevel>;
      labels: Record<string, string>;
    }
  | { type: "libretro-core"; consoleKey: EmulatorConsoleKey; core: (typeof libretroCores)[number] }
  | { type: "emulator"; consoleKey: EmulatorConsoleKey; emulator: (typeof emulators)[number] };

const allRows = computed<TableRow[]>(() => {
  const rows: TableRow[] = [];
  for (const consoleKey of emulatorConsoleOrder) {
    rows.push({ type: "console", consoleKey, consoleLabel: emulatorConsoleLabels[consoleKey] });

    // RetroArch row (aggregated from libretro cores)
    const cores = libretroCores.filter((core) => core.emulating?.[consoleKey]);
    if (cores.length) {
      // Aggregate best support per platform
      const platforms: Record<string, EmulatorSupportLevel> = {};
      const labels: Record<string, string> = {};
      for (const platform of ["windows", "macos", "linux", "android", "ios"]) {
        let bestLevel: EmulatorSupportLevel | null = null;
        let bestCore: (typeof libretroCores)[number] | null = null;
        for (const core of cores) {
          const level =
            core.platforms?.[platform as keyof typeof core.platforms] ?? defaultLibretroLevel;
          if (bestLevel === null || supportLevelRank(level) < supportLevelRank(bestLevel)) {
            bestLevel = level;
            bestCore = core;
          }
        }
        platforms[platform] = bestLevel ?? defaultLibretroLevel;
        labels[platform] =
          bestLevel === EmulatorSupportLevel.Recommended && bestCore
            ? `${supportLabel(bestLevel)} (${bestCore.name})`
            : supportLabel(bestLevel ?? defaultLibretroLevel);
      }
      rows.push({ type: "retroarch", consoleKey, platforms, labels });
    }

    // Libretro cores (toggleable)
    if (showLibretroCores.value && cores.length) {
      for (const core of cores) {
        rows.push({ type: "libretro-core", consoleKey, core });
      }
    }

    // Standalone emulators
    for (const emulator of emulators) {
      if (emulator.emulating[consoleKey] && emulator.name !== "RetroArch") {
        rows.push({ type: "emulator", consoleKey, emulator });
      }
    }
  }
  return rows;
});

function supportLabel(level: EmulatorSupportLevel): string {
  switch (level) {
    case EmulatorSupportLevel.Recommended:
      return t("emulators.support.recommended");
    case EmulatorSupportLevel.Stable:
      return t("emulators.support.stable");
    case EmulatorSupportLevel.Unstable:
      return t("emulators.support.unstable");
    case EmulatorSupportLevel.Unsupported:
    default:
      return t("emulators.support.unsupported");
  }
}

function supportIcon(level: EmulatorSupportLevel): string {
  switch (level) {
    case EmulatorSupportLevel.Recommended:
      return "mdi:check-circle";
    case EmulatorSupportLevel.Stable:
      return "mdi:check-circle-outline";
    case EmulatorSupportLevel.Unstable:
      return "mdi:alert-circle-outline";
    case EmulatorSupportLevel.Unsupported:
    default:
      return "mdi:close-circle-outline";
  }
}

function supportLevelRank(level: EmulatorSupportLevel): number {
  switch (level) {
    case EmulatorSupportLevel.Recommended:
      return 0;
    case EmulatorSupportLevel.Stable:
      return 1;
    case EmulatorSupportLevel.Unstable:
      return 2;
    case EmulatorSupportLevel.Unsupported:
    default:
      return 3;
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
  max-width: 100%;
  box-sizing: border-box;
}

.emu-table-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 1rem 0.55rem 1rem;
  background: color-mix(in oklab, var(--surface-2) 72%, transparent);
}

@media (max-width: 700px) {
  .emu-table-header-row {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 0.5rem;
    padding: 0.55rem 0.5rem 0.55rem 0.5rem;
  }
  .libretro-switch-wrap {
    justify-content: flex-start;
    margin-bottom: 0.2rem;
  }
  .support-legend {
    padding: 0.55rem 0;
  }
}

.libretro-switch-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.libretro-switch-label {
  font-size: 0.95em;
  color: var(--text-muted);
  user-select: none;
}

.libretro-core-cell {
  color: var(--secondary);
  font-weight: 500;
}

.libretro-core-link {
  color: var(--secondary);
  text-decoration: underline;
  text-underline-offset: 0.14rem;
}

.libretro-core-no-link {
  color: var(--secondary);
  text-decoration: none;
}

.support-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1rem;
  margin: 0;
  padding: 0.55rem 1rem;
  list-style: none;
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
  background: color-mix(in oklab, var(--surface) 90%, transparent);
}

.emu-table th,
.emu-table td {
  border-top: 1px solid var(--line);
  padding: 0.7rem 0.8rem;
  text-align: center;
  white-space: nowrap;
}
@media (max-width: 700px) {
  .emu-table-wrap {
    margin-left: -1rem;
    margin-right: -1rem;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
  .emu-table {
    min-width: 540px;
    width: 100%;
    display: block;
    overflow-x: auto;
    box-sizing: border-box;
  }
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
