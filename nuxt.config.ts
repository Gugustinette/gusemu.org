import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/style.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
  ],
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
