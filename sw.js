const CACHE="city-emergency-alerts-v6-rc1";
const FILES=["./","./index.html","./manifest.json","./css/base.css","./css/layout.css","./css/components.css","./css/responsive.css","./js/app.js","./data/intelligence.json","./data/alerts.json","./data/incidents.json","./data/environmental-context.json","./data/journey-intelligence.json","./data/build-status.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));});
