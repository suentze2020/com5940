// Check sw in navigator
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service_worker.js") // .register("./sw_cache_pages.js")
      .then((reg) => console.log("Service Worder: Registered"))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}
