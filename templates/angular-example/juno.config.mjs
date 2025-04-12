import { defineConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoConfig} */
export default defineConfig({
  satellite: {
    id: "<PROD_SATELLITE_ID>",
    source: "dist/angular-example/browser",
    predeploy: ["npm run build"],
  },
});
