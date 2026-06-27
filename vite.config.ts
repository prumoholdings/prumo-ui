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
      // Externalize ALL third-party deps — the consuming product PROVIDES + tree-
      // shakes them (Phase 63 single-source, 2026-06-27). We bundle ONLY our own
      // source (relative imports + the `@/` alias). Everything else (react, Radix,
      // Tremor, TanStack, framer-motion, cmdk, vaul, react-day-picker, lucide,
      // cva/clsx/tailwind-merge) is a peer the consumer installs from
      // stack_manifest. This shrinks dist from ~1.9MB → only our component code, so
      // the product can tree-shake what it doesn't compose. The bare-specifier test
      // (no leading `.` / `/` / `@/` and not a rollup virtual `\0` module) marks a
      // third-party module external; our own source (relative + `@/` alias) bundles.
      external: (id) =>
        !id.startsWith(".") &&
        !id.startsWith("/") &&
        !id.startsWith("@/") &&
        !id.includes("\0"),
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
