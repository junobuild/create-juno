import juno from "@junobuild/vite-plugin";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from "@tailwindcss/vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [nodePolyfills(), juno({ container: true }), tailwindcss()],
});
