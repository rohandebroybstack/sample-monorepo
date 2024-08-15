import { crx } from "@crxjs/vite-plugin";
import path from "path";
import { defineConfig, mergeConfig } from "vite";

import manifest from "./manifest";


/** @type {import('vite').UserConfigExport} */
const bstackProductViteConfig = {
  // FIXME: Excluding react plugin and vendor chunk plugin, find alternative
};

/** @type {import('vite').UserConfigExport} */
const extensionViteConfig = {
  plugins: [crx({ manifest })],
  envDir: "env",
  resolve: {
    alias: {
      "@browserstack/utils": path.resolve(
        __dirname,
        "node_modules/@browserstack/utils"
      ),
      src: path.resolve(__dirname, "src"),
      api: path.resolve(__dirname, "src/api"),
      assets: path.resolve(__dirname, "src/assets"),
      const: path.resolve(__dirname, "src/const"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
};

export default defineConfig(
  mergeConfig(bstackProductViteConfig, extensionViteConfig)
);
