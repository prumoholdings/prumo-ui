/// <reference types="vitest/config" />
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ["src"], exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx"] }),
  ],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        tokens: resolve(__dirname, "src/tokens.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      // peer deps must stay external — the consuming app provides them.
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
