const cacheName = "v1";

var cacheAssets = [
  "/lesson01/fetch_example",
  "/lesson01/fetch_example/lesson01.html",
  "/lesson01/fetch_example/css/lesson01.css",
  "/lesson01/fetch_example/js/lesson01.js",
  "/lesson01/fetch_example/js/main.js",
  "/lesson01/fetch_example/js/module.js",
];

// Call install event
self.addEventListener("install", (e) => {
  console.log("Service worker: installed.");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service worker:Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker: Activated.");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event to show website when off-line
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
