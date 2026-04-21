/**
 * Sanity CLI config — used by `sanity deploy`, `sanity dev`, etc.
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "55u2jb6b",
    dataset: "production",
  },
  // Auto-update Studio without manual redeploy on minor bumps
  autoUpdates: true,
});
