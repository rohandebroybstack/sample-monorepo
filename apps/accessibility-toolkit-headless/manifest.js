import { defineManifest } from "@crxjs/vite-plugin";

import packageJson from "./package.json";

const { version } = packageJson;

const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

const ALL_URLS = "<all_urls>";

const getName = (mode) => {
  if (mode === "production") return "Sample Extension";
  if (mode === "staging") return "[STAGING] Sample Extension";
  if (mode === "qa") return "[QA] Sample Extension";
  if (mode === "preprod") return "[PREPROD] Sample Extension";
  return "[DEV] Sample Extension";
};

export default defineManifest((env) => ({
  manifest_version: 3,
  name: getName(env.mode),
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: `${major}.${minor}.${patch}.${label}`,
  permissions: [
    "cookies",
    "activeTab",
    "tabs",
    "storage",
    "debugger",
    "unlimitedStorage",
    "webNavigation",
    "declarativeNetRequest",
  ],
  host_permissions: [ALL_URLS],
  content_scripts: [
    {
      js: ["src/runtime/content.js"],
      run_at: "document_start",
      matches: [ALL_URLS],
      all_frames: true,
    },
  ],
  description: "",
}));
