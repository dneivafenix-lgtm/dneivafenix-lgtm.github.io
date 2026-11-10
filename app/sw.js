// Offline: serve da rede quando há ligação, da cache quando não há.
const CACHE = 'pn-diary-v15';
const FILES = ['./', 'index.html', 'style.css', 'config.js', 'i18n.js', 'foods.js', 'food-photos.js', 'serve.pt.js', 'serve.en.js', 'serve.es.js', 'serve.fr.js', 'recipes.js', 'recipe-photos.js', 'recipes.en.js', 'recipes.es.js', 'recipes.fr.js', 'app.js', 'icon.svg', 'manifest.webmanifest'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // 'no-cache' obriga o browser a confirmar com o servidor se o ficheiro mudou, para as atualizações aparecerem logo.
  e.respondWith(fetch(e.request.url, { cache: 'no-cache' }).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
