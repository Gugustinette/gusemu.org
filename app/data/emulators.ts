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
  nes: "NES",
  snes: "SNES",
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
  megaDrive: "Mega Drive",
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
  /**
   * Nintendo
   */
  // GameBoy / GameBoy Color / GameBoy Advance
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
  // Gamecube / Wii
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
  /**
   * Sega
   */
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
      android: EmulatorSupportLevel.Stable,
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
  // PSP
  {
    name: "PPSSPP",
    website: "https://www.ppsspp.org/",
    repository: "https://github.com/hrydgard/ppsspp",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: {
      psp: true,
    },
    libretroSupport: true,
    retroAchievementsSupport: true,
  },
];
