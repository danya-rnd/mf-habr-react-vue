import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    /* Импорт зависимостей от Vue приложения */
    federation({
      name: "host-app",
      remotes: {
        "mf-remote-app": "http://localhost:4101/assets/mf-entry.js",
      },
    }),
  ],
  server: {
    port: 4100,
  },
  preview: {
    port: 4100,
  },
});
