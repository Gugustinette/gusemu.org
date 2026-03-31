import { EmulatorSupportLevel } from "./emulators";
import type { EmulatorConsoleKey } from "./emulators";

export interface LibretroCore {
  name: string;
  documentation?: string;
  coreInfo?: string;
  repository?: string;
  platforms?: {
    windows?: EmulatorSupportLevel;
    macos?: EmulatorSupportLevel;
    linux?: EmulatorSupportLevel;
    android?: EmulatorSupportLevel;
    ios?: EmulatorSupportLevel;
  };
  emulating: Partial<Record<EmulatorConsoleKey, boolean>>;
}

export const libretroCores: LibretroCore[] = [
  /**
   * Multi-platform cores
   */
  {
    name: "Mesen-S",
    documentation: "https://docs.libretro.com/library/mesen-s/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/mesen-s_libretro.info",
    repository: "https://github.com/SourMesen/Mesen2",
    emulating: { snes: true, gameBoy: true, gameBoyColor: true },
  },
  {
    name: "SkyEmu",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/skyemu_libretro.info",
    emulating: { gameBoy: true, gameBoyAdvance: true, ds: true },
  },
  {
    name: "Dolphin",
    documentation: "https://docs.libretro.com/library/dolphin/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/dolphin_libretro.info",
    repository: "https://github.com/dolphin-emu/dolphin",
    emulating: { gameCube: true, wii: true },
  },
  {
    name: "ClownMDEmu",
    documentation: "https://docs.libretro.com/library/clownmdemu/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/clownmdemu_libretro.info",
    repository: "https://github.com/Clownacy/clownmdemu-libretro",
    emulating: { megaDrive: true, megaCd: true },
  },
  {
    name: "SMS Plus GX",
    documentation: "https://docs.libretro.com/library/smsplus/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/smsplus_libretro.info",
    repository: "https://github.com/libretro/smsplus-gx",
    emulating: { masterSystem: true, gameGear: true },
  },
  {
    name: "Genesis Plus GX Wide",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/genesis_plus_gx_wide_libretro.info",
    emulating: { masterSystem: true, gameGear: true, megaDrive: true, megaCd: true },
  },
  {
    name: "Genesis Plus GX",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/genesis_plus_gx_libretro.info",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { masterSystem: true, gameGear: true, megaDrive: true, megaCd: true },
  },
  {
    name: "PicoDrive",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/picodrive_libretro.info",
    emulating: { masterSystem: true, gameGear: true, megaDrive: true, megaCd: true },
  },
  {
    name: "Gearsystem",
    documentation: "https://docs.libretro.com/library/gearsystem/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/gearsystem_libretro.info",
    repository: "https://github.com/drhelius/Gearsystem",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { sg1000: true, masterSystem: true, gameGear: true },
  },
  /**
   * Nintendo
   */
  // NES
  {
    name: "FCEUmm",
    documentation: "https://docs.libretro.com/library/fceumm/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/fceumm_libretro.info",
    repository: "https://github.com/libretro/libretro-fceumm",
    emulating: { nes: true },
  },
  {
    name: "Mesen",
    documentation: "https://docs.libretro.com/library/mesen/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/mesen_libretro.info",
    repository: "https://github.com/SourMesen/Mesen2",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { nes: true },
  },
  {
    name: "Nestopia",
    documentation: "https://docs.libretro.com/library/nestopia/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/nestopia_libretro.info",
    repository: "https://github.com/libretro/nestopia",
    emulating: { nes: true },
  },
  {
    name: "QuickNES",
    documentation: "https://docs.libretro.com/library/quicknes/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/quicknes_libretro.info",
    repository: "https://github.com/libretro/QuickNES_Core",
    emulating: { nes: true },
  },
  // SNES
  {
    name: "bsnes",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/bsnes_libretro.info",
    emulating: { snes: true },
  },
  {
    name: "bsnes 2014 Accuracy",
    documentation: "https://docs.libretro.com/library/bsnes_accuracy/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/bsnes2014_accuracy_libretro.info",
    repository: "https://github.com/libretro/bsnes-libretro",
    emulating: { snes: true },
  },
  {
    name: "bsnes 2014 Balanced",
    documentation: "https://docs.libretro.com/library/bsnes_balanced/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/bsnes2014_balanced_libretro.info",
    repository: "https://github.com/libretro/bsnes-libretro",
    emulating: { snes: true },
  },
  {
    name: "bsnes 2014 Performance",
    documentation: "https://docs.libretro.com/library/bsnes_performance/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/bsnes2014_performance_libretro.info",
    repository: "https://github.com/libretro/bsnes-libretro",
    emulating: { snes: true },
  },
  {
    name: "bsnes-jg",
    documentation: "https://docs.libretro.com/library/bsnes-jg/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/bsnes-jg_libretro.info",
    repository: "https://github.com/libretro/bsnes-jg",
    emulating: { snes: true },
  },
  {
    name: "bsnes-mercury Accuracy",
    documentation: "https://docs.libretro.com/library/bsnes_mercury_accuracy/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/bsnes_mercury_accuracy_libretro.info",
    repository: "https://github.com/libretro/bsnes-mercury",
    emulating: { snes: true },
  },
  {
    name: "bsnes-mercury Balanced",
    documentation: "https://docs.libretro.com/library/bsnes_mercury_balanced/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/bsnes_mercury_balanced_libretro.info",
    repository: "https://github.com/libretro/bsnes-mercury",
    emulating: { snes: true },
  },
  {
    name: "bsnes-mercury Performance",
    documentation: "https://docs.libretro.com/library/bsnes_mercury_performance/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/bsnes_mercury_performance_libretro.info",
    repository: "https://github.com/libretro/bsnes-mercury",
    emulating: { snes: true },
  },
  {
    name: "Snes9x",
    documentation: "https://docs.libretro.com/library/snes9x/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/snes9x_libretro.info",
    repository: "https://github.com/libretro/snes9x",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { snes: true },
  },
  {
    name: "Snes9x 2002",
    documentation: "https://docs.libretro.com/library/snes9x_2002/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/snes9x2002_libretro.info",
    repository: "https://github.com/libretro/snes9x2002",
    emulating: { snes: true },
  },
  {
    name: "Snes9x 2005",
    documentation: "https://docs.libretro.com/library/snes9x_2005/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/snes9x2005_libretro.info",
    repository: "https://github.com/libretro/snes9x2005",
    emulating: { snes: true },
  },
  {
    name: "Snes9x 2005 Plus",
    documentation: "https://docs.libretro.com/library/snes9x_2005_plus/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/snes9x2005_plus_libretro.info",
    repository: "https://github.com/libretro/snes9x2005",
    emulating: { snes: true },
  },
  {
    name: "Snes9x 2010",
    documentation: "https://docs.libretro.com/library/snes9x_2010/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/snes9x2010_libretro.info",
    repository: "https://github.com/libretro/snes9x2010",
    emulating: { snes: true },
  },
  // Game Boy / Game Boy Color
  {
    name: "Gambatte",
    documentation: "https://docs.libretro.com/library/gambatte/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/gambatte_libretro.info",
    repository: "https://github.com/libretro/gambatte-libretro",
    emulating: { gameBoy: true, gameBoyColor: true },
  },
  {
    name: "Gearboy",
    documentation: "https://docs.libretro.com/library/gearboy/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/gearboy_libretro.info",
    repository: "https://github.com/drhelius/Gearboy",
    emulating: { gameBoy: true, gameBoyColor: true },
  },
  {
    name: "SameBoy",
    documentation: "https://docs.libretro.com/library/sameboy/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/sameboy_libretro.info",
    repository: "https://github.com/libretro/SameBoy",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { gameBoy: true, gameBoyColor: true },
  },
  {
    name: "TGB Dual",
    documentation: "https://docs.libretro.com/library/tgb_dual/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/tgbdual_libretro.info",
    repository: "https://github.com/libretro/tgbdual-libretro",
    emulating: { gameBoy: true, gameBoyColor: true },
  },
  // Game Boy Advance
  {
    name: "gbSP",
    documentation: "https://docs.libretro.com/library/gpsp/",
    coreInfo: "https://github.com/libretro/libretro-super/blob/master/dist/info/gpsp_libretro.info",
    repository: "https://github.com/libretro/gpsp",
    emulating: { gameBoyAdvance: true },
  },
  {
    name: "mGBA",
    documentation: "https://docs.libretro.com/library/mgba/",
    coreInfo: "https://github.com/libretro/libretro-super/blob/master/dist/info/mgba_libretro.info",
    repository: "https://github.com/libretro/mgba",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { gameBoyAdvance: true },
  },
  {
    name: "VBA-M",
    documentation: "https://docs.libretro.com/library/vba_m/",
    coreInfo: "https://github.com/libretro/libretro-super/blob/master/dist/info/vbam_libretro.info",
    repository: "https://github.com/libretro/vbam-libretro",
    emulating: { gameBoyAdvance: true },
  },
  {
    name: "VBA Next",
    documentation: "https://docs.libretro.com/library/vba_next/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/vba_next_libretro.info",
    repository: "https://github.com/libretro/vba-next",
    emulating: { gameBoyAdvance: true },
  },
  // Nintendo 64
  {
    name: "Mupen64Plus-Next",
    documentation: "https://docs.libretro.com/library/mupen64plus/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/mupen64plus_next_libretro.info",
    repository: "https://github.com/libretro/mupen64plus-libretro-nx",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { n64: true },
  },
  {
    name: "Mupen64Plus-Next GLES2",
    documentation: "https://docs.libretro.com/library/mupen64plus/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/mupen64plus_next_libretro.info",
    repository: "https://github.com/libretro/mupen64plus-libretro-nx",
    emulating: { n64: true },
  },
  {
    name: "Mupen64Plus-Next GLES3",
    documentation: "https://docs.libretro.com/library/mupen64plus/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/mupen64plus_next_libretro.info",
    repository: "https://github.com/libretro/mupen64plus-libretro-nx",
    emulating: { n64: true },
  },
  {
    name: "ParaLLEl N64",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/parallel_n64_libretro.info",
    emulating: { n64: true },
  },
  // DS
  {
    name: "DeSmuME",
    documentation: "https://docs.libretro.com/library/desmume/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/desmume_libretro.info",
    repository: "https://github.com/libretro/desmume",
    emulating: { ds: true },
  },
  {
    name: "DeSmuME 2015",
    documentation: "https://docs.libretro.com/library/desmume_2015/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/desmume2015_libretro.info",
    repository: "https://github.com/libretro/desmume2015",
    emulating: { ds: true },
  },
  {
    name: "melonDS",
    documentation: "https://docs.libretro.com/library/melonds/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/melonds_libretro.info",
    repository: "https://github.com/libretro/melonds",
    emulating: { ds: true },
  },
  {
    name: "melonDS DS",
    documentation: "https://docs.libretro.com/library/melonds_ds/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/melondsds_libretro.info",
    repository: "https://github.com/JesseTG/melonds-ds",
    platforms: {
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { ds: true },
  },
  // 3DS
  {
    name: "Azahar",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/azahar_libretro.info",
    repository: "https://github.com/azahar-emu/azahar",
    emulating: { "3ds": true },
  },
  /**
   * Sega
   */
  // Saturn
  {
    name: "Beetle Saturn",
    emulating: { saturn: true },
  },
  {
    name: "YabaShanshiro",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/yabasanshiro_libretro.info",
    emulating: { saturn: true },
  },
  {
    name: "Yabause",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/yabause_libretro.info",
    emulating: { saturn: true },
  },
  // Dreamcast
  {
    name: "Flycast",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/flycast_libretro.info",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { dreamcast: true },
  },
  /**
   * PlayStation
   */
  // PS1
  {
    name: "Beetle PSX",
    emulating: { ps1: true },
  },
  {
    name: "Beetle PSX HW",
    emulating: { ps1: true },
  },
  {
    name: "PCSX ReARMed",
    documentation: "https://docs.libretro.com/library/pcsx_rearmed/",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/pcsx_rearmed_libretro.info",
    repository: "https://github.com/libretro/pcsx_rearmed",
    emulating: { ps1: true },
  },
  {
    name: "SwanStation",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/swanstation_libretro.info",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { ps1: true },
  },
  // PSP
  {
    name: "PPSSPP",
    coreInfo:
      "https://github.com/libretro/libretro-super/blob/master/dist/info/ppsspp_libretro.info",
    platforms: {
      windows: EmulatorSupportLevel.Recommended,
      macos: EmulatorSupportLevel.Recommended,
      linux: EmulatorSupportLevel.Recommended,
      android: EmulatorSupportLevel.Recommended,
      ios: EmulatorSupportLevel.Recommended,
    },
    emulating: { psp: true },
  },
];
