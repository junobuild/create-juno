import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
    },
    source: "out",
    predeploy: ["npm run build"],
  },
});
