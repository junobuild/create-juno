import { onAuthStateChange, initSatellite } from "@junobuild/core";
import { renderContent } from "./components/content";
import { renderLogin } from "./components/login.js";
import "./style.css";
import { renderBanner } from "./components/banner.js";

/**
 * Global listener. When the user sign-in or sign-out, we re-render the app.
 */
onAuthStateChange((user) => {
  const app = document.querySelector("#app");

  if (user === null || user === undefined) {
    renderLogin(app);
    return;
  }

  renderContent(app);
});

/**
 * When the app starts, we initialize Juno.
 * @returns {Promise<void>}
 */
const onAppInit = async () => {
  renderBanner();

  await initSatellite({
    workers: {
      auth: true,
    },
  });
};

document.addEventListener("DOMContentLoaded", onAppInit, { once: true });
