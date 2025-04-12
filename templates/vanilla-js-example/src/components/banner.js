export const renderBanner = () => {
  const dev = import.meta.env.DEV;
  const satelliteId = import.meta.env.VITE_SATELLITE_ID;
  const satelliteMissing =
    satelliteId === undefined || satelliteId === "<DEV_SATELLITE_ID>";

  const showBanner = dev && satelliteMissing;

  if (showBanner) {
    return;
  }

  const banner = document.querySelector("#banner");

  banner.parentElement.removeChild(banner);
};
