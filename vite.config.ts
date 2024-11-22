import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// Unplugin Tools
import AutoImport from "unplugin-auto-import/vite";
import { VueUseComponentsResolver, VueUseDirectiveResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "vue-i18n",
        { "@raffaelesgarro/vue-use-sound": ["useSound"] },
        { "@/i18n": ["$t", "$d", "$n", "$locale", "_changeLang"] },
      ],
      vueTemplate: true,
    }),
    Components({
      dts: true,
      version: 3,
      dirs: [
        "src/components",
        "src/views",
      ],
      resolvers: [
        VueUseComponentsResolver(),
        VueUseDirectiveResolver(),
      ],
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
        {
          from: "@iconify/vue",
          names: ["Icon"],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  esbuild: {
    drop: mode === "production" ? ["debugger"] : [],
    pure: mode === "production" ? ["console.log", "console.debug"] : [],
  },
}));
