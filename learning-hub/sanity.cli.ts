/**
 * Sanity CLI config — used by `sanity deploy`, `sanity dev`, etc.
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "55u2jb6b",
    dataset: "production",
  },
  // Studio is hosted at https://bbborders.sanity.studio
  studioHost: "bbborders",
  deployment: {
    appId: "m0jnha6223cyjpcbxv1hf5tw",
    // Auto-update Studio without manual redeploy on minor bumps
    autoUpdates: true,
  },
});
