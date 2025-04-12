
import { defineConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoConfig} */
export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
    },
    source: "out",
    predeploy: ["npm run build"],
  },
});
