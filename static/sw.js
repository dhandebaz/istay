const CACHE_NAME = "istay-v1";
const OFFLINE_URL = "/offline.html";

// Assets to precache
const PRECACHE_ASSETS = [
  "/",
  "/logo.svg",
  "/favicon.ico",
  "/styles.css", // Assuming global styles if naming differs
  OFFLINE_URL,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // We only care about GET requests for now
  if (event.request.method !== "GET") return;

  // Strategy: Stale-While-Revalidate for most assets
  // Network-First for dynamic routes like /care/ or /dashboard/
  
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/care/") || url.pathname.startsWith("/dashboard/")) {
    // Network First
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Stale While Revalidate
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse.clone()));
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );
  }
});

// Handle Background Sync (Simulated simple queue)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-checklists") {
    // Logic to send queued data
    console.log("[SW] Syncing checklists...");
  }
});

// ── Web Push Notifications ──
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: "New Notification", message: event.data.text() };
    }
  }

  const title = data.title || "istay Update";
  const options = {
    body: data.message || "You have a new alert.",
    icon: "/android-chrome-192x192.png",
    badge: "/icon.svg",
    vibrate: [200, 100, 200],
    data: {
      url: data.url || "/dashboard",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data.url || "/dashboard";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // If not, open a new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
