export enum EmulatorSupportLevel {
  Unsupported = "unsupported",
  Unstable = "unstable",
  Stable = "stable",
  Recommended = "recommended",
}

export type EmulatorConsoleKey =
  // Nintendo
  | "nes"
  | "snes"
  | "gameBoy"
  | "gameBoyColor"
  | "gameBoyAdvance"
  | "n64"
  | "gameCube"
  | "ds"
  | "3ds"
  | "wii"
  | "wiiu"
  | "switch"
  // Sega
  | "sg1000"
  | "masterSystem"
  | "megaDrive"
  | "gameGear"
  | "megaCd"
  | "saturn"
  | "dreamcast"
  // PlayStation
  | "ps1"
  | "ps2"
  | "ps3"
  | "ps4"
  | "ps5"
  | "psp"
  | "psvita"
  // Xbox
  | "xbox"
  | "xbox360"
  | "xboxOne"
  | "xboxSeries";

export const emulatorConsoleOrder: EmulatorConsoleKey[] = [
  // Nintendo
  "nes",
  "snes",
  "gameBoy",
  "gameBoyColor",
  "gameBoyAdvance",
  "n64",
  "gameCube",
  "ds",
  "3ds",
  "wii",
  "wiiu",
  "switch",
  // Sega
  "sg1000",
  "masterSystem",
  "megaDrive",
  "gameGear",
  "megaCd",
  "saturn",
  "dreamcast",
  // PlayStation
  "ps1",
  "ps2",
  "ps3",
  "ps4",
  "ps5",
  "psp",
  "psvita",
  // Xbox
  "xbox",
  "xbox360",
  "xboxOne",
  "xboxSeries",
];

export const emulatorConsoleLabels: Record<EmulatorConsoleKey, string> = {
  // Nintendo
  nes: "NES / Famicom",
  snes: "SNES / Super Famicom",
  gameBoy: "Game Boy",
  gameBoyColor: "Game Boy Color",
  gameBoyAdvance: "Game Boy Advance",
  n64: "Nintendo 64",
  gameCube: "GameCube",
  ds: "Nintendo DS",
  "3ds": "Nintendo 3DS",
  wii: "Wii",
  wiiu: "Wii U",
  switch: "Switch",
  // Sega
  sg1000: "SG-1000",
  masterSystem: "Master System",
  megaDrive: "Mega Drive / Genesis",
  gameGear: "Game Gear",
  megaCd: "Mega-CD",
  saturn: "Saturn",
  dreamcast: "Dreamcast",
  // PlayStation
  ps1: "PlayStation",
  ps2: "PlayStation 2",
  ps3: "PlayStation 3",
  ps4: "PlayStation 4",
  ps5: "PlayStation 5",
  psp: "PSP",
  psvita: "PS Vita",
  // Xbox
  xbox: "Xbox",
  xbox360: "Xbox 360",
  xboxOne: "Xbox One",
  xboxSeries: "Xbox Series",
};

export interface Emulator {
  name: string;
  website: string;
  repository: string;
  platforms: {
    windows: EmulatorSupportLevel;
    macos: EmulatorSupportLevel;
    linux: EmulatorSupportLevel;
    android: EmulatorSupportLevel;
    ios: EmulatorSupportLevel;
  };
  emulating: Partial<Record<EmulatorConsoleKey, boolean>>;
  libretroSupport: boolean;
  retroAchievementsSupport: boolean;
}

export const emulators: Emulator[] = [
  /**
   * Multi-platform
   */
  {
    name: "RetroArch",
    website: "https://www.retroarch.com/",
    repository: "https://github.com/libretro/RetroArch",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Stable,
      ios: EmulatorSupportLevel.Stable,
    },
    emulating: {
      nes: true,
      snes: true,
      gameBoy: true,
      gameBoyColor: true,
      gameBoyAdvance: true,
      n64: true,
      gameCube: true,
      ds: true,
      "3ds": true,
      wii: true,
      sg1000: true,
      masterSystem: true,
      megaDrive: true,
      gameGear: true,
      megaCd: true,
      saturn: true,
      dreamcast: true,
      ps1: true,
      psp: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: true,
  },
  {
    name: "Mesen",
    website: "https://www.mesen.ca/",
    repository: "https://github.com/SourMesen/Mesen2/",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      nes: true,
      snes: true,
      gameBoy: true,
      gameBoyColor: true,
      gameBoyAdvance: true,
      masterSystem: true,
      gameGear: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  {
    name: "SkyEmu",
    website: "https://github.com/skylersaleh/SkyEmu",
    repository: "https://github.com/skylersaleh/SkyEmu",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Stable,
      ios: EmulatorSupportLevel.Stable,
    },
    emulating: {
      gameBoy: true,
      gameBoyColor: true,
      gameBoyAdvance: true,
      ds: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: true,
  },
  {
    name: "Dolphin",
    website: "https://dolphin-emu.org/",
    repository: "https://github.com/dolphin-emu/dolphin",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      gameCube: true,
      wii: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: true,
  },
  {
    name: "Gearsystem",
    website: "https://github.com/drhelius/Gearsystem",
    repository: "https://github.com/drhelius/Gearsystem",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      sg1000: true,
      masterSystem: true,
      gameGear: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  /**
   * Nintendo
   */
  // NES
  {
    name: "FCEUX",
    website: "https://fceux.com/",
    repository: "https://github.com/TASEmulators/fceux",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      nes: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  // SNES
  {
    name: "snes9x",
    website: "https://github.com/snes9xgit/snes9x",
    repository: "https://github.com/snes9xgit/snes9x",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      snes: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  {
    name: "bsnes",
    website: "https://github.com/bsnes-emu/bsnes",
    repository: "https://github.com/bsnes-emu/bsnes",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      snes: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  // Game Boy / Game Boy Color
  {
    name: "Gearboy",
    website: "https://github.com/drhelius/Gearboy",
    repository: "https://github.com/drhelius/Gearboy",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      gameBoy: true,
      gameBoyColor: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  {
    name: "SameBoy",
    website: "https://sameboy.github.io/",
    repository: "https://github.com/LIJI32/SameBoy",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Stable,
    },
    emulating: {
      gameBoy: true,
      gameBoyColor: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  // Game Boy / Game Boy Color / Game Boy Advance
  {
    name: "mGBA",
    website: "https://mgba.io/",
    repository: "https://github.com/mgba-emu/mgba",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      gameBoy: true,
      gameBoyColor: true,
      gameBoyAdvance: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  {
    name: "VBA-M",
    website: "https://www.visualboyadvance-m.org/",
    repository: "https://github.com/visualboyadvance-m/visualboyadvance-m",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Unsupported,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      gameBoy: true,
      gameBoyColor: true,
      gameBoyAdvance: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  // Nintendo 64
  {
    name: "Mupen64Plus",
    website: "https://mupen64plus.org/",
    repository: "https://github.com/mupen64plus/mupen64plus-core",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      n64: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  // DS
  {
    name: "melonDS",
    website: "https://melonds.kuribo64.net/",
    repository: "https://github.com/melonDS-emu/melonDS",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ds: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  {
    name: "melonDS-android",
    website: "https://github.com/SapphireRhodonite/melonDS-android",
    repository: "https://github.com/SapphireRhodonite/melonDS-android",
    platforms: {
      windows: EmulatorSupportLevel.Unsupported,
      macos: EmulatorSupportLevel.Unsupported,
      linux: EmulatorSupportLevel.Unsupported,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ds: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: true,
  },
  {
    name: "DeSmuME",
    website: "https://desmume.org/",
    repository: "https://github.com/TASEmulators/desmume",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Unsupported,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ds: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  // 3DS
  {
    name: "Azahar",
    website: "https://azahar-emu.org/",
    repository: "https://github.com/azahar-emu/azahar",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Stable,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: {
      "3ds": true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  {
    name: "AzaharPlus",
    website: "https://github.com/AzaharPlus/AzaharPlus",
    repository: "https://github.com/AzaharPlus/AzaharPlus",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Unsupported,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      "3ds": true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  // Wii U
  {
    name: "Cemu",
    website: "https://cemu.info/",
    repository: "https://github.com/cemu-project/Cemu",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      wiiu: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  {
    name: "Cemu (Android)",
    website: "https://github.com/SapphireRhodonite/Cemu",
    repository: "https://github.com/SapphireRhodonite/Cemu",
    platforms: {
      windows: EmulatorSupportLevel.Unsupported,
      macos: EmulatorSupportLevel.Unsupported,
      linux: EmulatorSupportLevel.Unsupported,
      android: EmulatorSupportLevel.Unstable,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      wiiu: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  // Switch
  {
    name: "Eden",
    website: "https://eden-emu.dev/",
    repository: "https://git.eden-emu.dev/eden-emu/eden",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Stable,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      switch: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  {
    name: "Ryujinx",
    website: "https://ryujinx.app/",
    repository: "https://git.greemdev.net/projects/Ryubing",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      switch: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  /**
   * Sega
   */
  // Mega Drive
  {
    name: "ClownMDEmu",
    website: "https://github.com/Clownacy/clownmdemu-frontend",
    repository: "https://github.com/Clownacy/clownmdemu-frontend",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      megaDrive: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: false,
  },
  // Dreamcast
  {
    name: "Flycast",
    website: "https://github.com/TheArcadeStriker/flycast-wiki/wiki",
    repository: "https://github.com/flyinghead/flycast",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Stable,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      dreamcast: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: true,
  },
  /**
   * PlayStation
   */
  // PS1
  {
    name: "DuckStation",
    website: "https://duckstation.org/",
    repository: "https://github.com/stenzek/duckstation",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ps1: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: true,
  },
  // PS2
  {
    name: "PCSX2",
    website: "https://pcsx2.net/",
    repository: "https://github.com/PCSX2/pcsx2",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ps2: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: true,
  },
  {
    name: "NetherSX2-patch",
    website: "https://github.com/Trixarian/NetherSX2-patch",
    repository: "https://github.com/Trixarian/NetherSX2-patch",
    platforms: {
      windows: EmulatorSupportLevel.Unsupported,
      macos: EmulatorSupportLevel.Unsupported,
      linux: EmulatorSupportLevel.Unsupported,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ps2: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  // PS3
  {
    name: "RPCS3",
    website: "https://rpcs3.net/",
    repository: "https://github.com/RPCS3/rpcs3",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Unstable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ps3: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  {
    name: "aps3e",
    website: "https://github.com/aenu1/aps3e",
    repository: "https://github.com/aenu1/aps3e",
    platforms: {
      windows: EmulatorSupportLevel.Unsupported,
      macos: EmulatorSupportLevel.Unsupported,
      linux: EmulatorSupportLevel.Unsupported,
      android: EmulatorSupportLevel.Unstable,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ps3: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  // PS4
  {
    name: "shadPS4",
    website: "https://github.com/shadps4-emu/shadps4",
    repository: "https://github.com/shadps4-emu/shadps4",
    platforms: {
      windows: EmulatorSupportLevel.Unstable,
      macos: EmulatorSupportLevel.Unstable,
      linux: EmulatorSupportLevel.Unstable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      ps4: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  // PSP
  {
    name: "PPSSPP",
    website: "https://www.ppsspp.org/",
    repository: "https://github.com/hrydgard/ppsspp",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Stable,
      ios: EmulatorSupportLevel.Stable,
    },
    emulating: {
      psp: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: true,
  },
  // PS Vita
  {
    name: "Vita3K",
    website: "https://vita3k.org/",
    repository: "https://github.com/Vita3K/Vita3K",
    platforms: {
      windows: EmulatorSupportLevel.Unstable,
      macos: EmulatorSupportLevel.Unstable,
      linux: EmulatorSupportLevel.Unstable,
      android: EmulatorSupportLevel.Unstable,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      psvita: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  /**
   * Xbox
   */
  // Xbox
  {
    name: "xemu",
    website: "https://xemu.app/docs/download/",
    repository: "https://github.com/xemu-project/xemu",
    platforms: {
      windows: EmulatorSupportLevel.Stable,
      macos: EmulatorSupportLevel.Stable,
      linux: EmulatorSupportLevel.Stable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      xbox: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
  // Xbox 360
  {
    name: "Xenia",
    website: "https://xenia.jp/",
    repository: "https://github.com/xenia-project/xenia",
    platforms: {
      windows: EmulatorSupportLevel.Unstable,
      macos: EmulatorSupportLevel.Unsupported,
      linux: EmulatorSupportLevel.Unstable,
      android: EmulatorSupportLevel.Unsupported,
      ios: EmulatorSupportLevel.Unsupported,
    },
    emulating: {
      xbox360: true,
    },
    libretroSupport: false,
    retroAchievementsSupport: false,
  },
];
