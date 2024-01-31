import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    vue(),
    /* Экспорт зависимостей Vue приложения */
    federation({
      name: "mf-remote-app",
      filename: "mf-entry.js",
      exposes: {
        "./remote-entry": "./src/main.js",
      },
    }),
  ],
  server: {
    port: 4101,
  },
  preview: {
    port: 4101,
  },
});
