// LV Long Expo PWA — service worker
// App is a single self-contained HTML file (all data/images inlined),
// so caching index.html + manifest + icons is enough for offline use.
const CACHE_VERSION = 'lvlongexpo-v1.0.0';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
      // Cache what we can; ignore any individual failures (e.g. missing optional icon)
      return Promise.allSettled(CORE.map(function(u){ return cache.add(u); }));
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){ return k !== CACHE_VERSION; })
        .map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  // Network-first for navigation so updates show up; fall back to cache offline.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE_VERSION).then(function(c){ c.put('./index.html', copy); });
        return resp;
      }).catch(function(){ return caches.match('./index.html'); })
    );
    return;
  }
  // Cache-first for everything else.
  e.respondWith(
    caches.match(e.request).then(function(cached){
      return cached || fetch(e.request).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE_VERSION).then(function(c){ c.put(e.request, copy); });
        return resp;
      }).catch(function(){ return cached; });
    })
  );
});
