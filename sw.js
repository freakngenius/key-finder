/* Key Finder service worker: offline app shell.
   Bump CACHE when shipping a new version to refresh cached assets. */
const CACHE = 'key-finder-v3';
const ASSETS = [
  './',
  './index.html',
  './app.html',
  './manifest.webmanifest',
  './apple-touch-icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return; // let cross-origin (fonts) hit network
  if (url.pathname.endsWith('/version.json')) { e.respondWith(fetch(req)); return; } // always fresh for update checks

  // Navigations: network-first so deploys update, fall back to cached page offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((m) => m || caches.match('./app.html') || caches.match('./index.html')))
    );
    return;
  }

  // Static assets: cache-first, then network (and cache it).
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => cached))
  );
});
