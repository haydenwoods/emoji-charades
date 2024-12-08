import { defineConfig } from "vite";
import path from "path";

import Vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import TailwindCSS from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    Vue(),
    TailwindCSS(),
    Components({
      dirs: ["components"],
      resolvers: [IconsResolver()],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  root: path.resolve(__dirname, "webview"),
  build: {
    outDir: path.resolve(__dirname, "webroot"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "webview"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
