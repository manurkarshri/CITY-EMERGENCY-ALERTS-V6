const CACHE = "city-emergency-alerts-v6-a";
const FILES = ["./", "./index.html", "./manifest.json", "./css/base.css", "./css/layout.css", "./js/app.js", "./data/build-status.json"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", event => { if (event.request.method !== "GET") return; event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(r => r || caches.match("./index.html")))); });
