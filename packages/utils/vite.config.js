import { resolve } from "path";
import { defineConfig, mergeConfig } from "vite";
import dts from "vite-plugin-dts";

import { updatePackageJson } from "./scripts/updateExports";
import Modules from "./modules.json";
import pkg from "./package.json";

/** @type {import('vite').UserConfigExport} */
const defaultConfig = {
  plugins: [
    dts({
      tsconfigPath: "jsconfig.json",
      rollupTypes: true,
      afterBuild: updatePackageJson,
    }),
  ],
  build: {
    lib: {
      entry: Modules,
      name: "A11Y Extension Core",
      formats: ["es"],
      fileName: () => `[name].js`,
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies || {}),
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
      modules: resolve(__dirname, "src/modules"),
      shared: resolve(__dirname, "src/shared"),
      utils: resolve(__dirname, "src/utils"),
      api: resolve(__dirname, "src/api"),
    },
  },
};

const config = defineConfig(mergeConfig({ plugins: [] }, defaultConfig));

export default config;
