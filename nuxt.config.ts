import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/style.css", "~/assets/markdown-content.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
  ],
  fonts: {
    defaults: {
      weights: ["400", "500", "700"],
      styles: ["normal", "italic"],
    },
    families: [
      {
        name: "Monaspace Neon",
        provider: "local",
        global: true,
        src: "/Monaspace/Monaspace Neon/MonaspaceNeon-Regular.woff2",
        weight: "400",
        style: "normal",
      },
      {
        name: "Monaspace Neon",
        provider: "local",
        global: true,
        src: "/Monaspace/Monaspace Neon/MonaspaceNeon-Medium.woff2",
        weight: "500",
        style: "normal",
      },
      {
        name: "Monaspace Neon",
        provider: "local",
        global: true,
        src: "/Monaspace/Monaspace Neon/MonaspaceNeon-Bold.woff2",
        weight: "700",
        style: "normal",
      },
      {
        name: "Monaspace Krypton",
        provider: "local",
        global: true,
        src: "/Monaspace/Monaspace Krypton/MonaspaceKrypton-Regular.woff2",
        weight: "400",
        style: "normal",
      },
      {
        name: "Monaspace Krypton",
        provider: "local",
        global: true,
        src: "/Monaspace/Monaspace Krypton/MonaspaceKrypton-SemiBold.woff2",
        weight: "600",
        style: "normal",
      },
      {
        name: "Monaspace Krypton",
        provider: "local",
        global: true,
        src: "/Monaspace/Monaspace Krypton/MonaspaceKrypton-Bold.woff2",
        weight: "700",
        style: "normal",
      },
    ],
  },
  app: {
    head: {
      title: "gusemu.org",
      meta: [{ name: "description", content: "Guides and tools for emulation, ROMs and more" }],
    },
  },
  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    langDir: "locales",
    locales: [
      { code: "en", name: "English", language: "en-US", file: "en.json" },
      { code: "fr", name: "Francais", language: "fr-FR", file: "fr.json" },
    ],
  },
  colorMode: {
    preference: "system",
    fallback: "dark",
    classSuffix: "",
  },
  devtools: { enabled: true },
  compatibilityDate: "2026-03-27",
});
