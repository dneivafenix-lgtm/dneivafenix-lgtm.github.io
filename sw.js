// Offline: serve da rede quando há ligação, da cache quando não há.
const CACHE = 'pn-diary-v42';
const FILES = ['./', 'index.html', 'style.css', 'config.js', 'i18n.js', 'foods.js', 'food-photos.js', 'serve.pt.js', 'serve.en.js', 'serve.es.js', 'serve.fr.js', 'serve-photos.js', 'food-info.pt.js', 'food-info.en.js', 'food-info.es.js', 'food-info.fr.js', 'guides.pt.js', 'guides.en.js', 'guides.es.js', 'guides.fr.js', 'legal.pt.js', 'legal.en.js', 'legal.es.js', 'legal.fr.js', 'recipes.js', 'recipe-photos.js', 'recipes.en.js', 'recipes.es.js', 'recipes.fr.js', 'app.js', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'img/diario-fundo.jpg', 'manifest.webmanifest', 'fonts/dm-sans-latin-wght-normal.woff2', 'fonts/dm-sans-latin-ext-wght-normal.woff2', 'fonts/manrope-latin-wght-normal.woff2', 'fonts/manrope-latin-ext-wght-normal.woff2', 'fonts/caveat-latin-wght-normal.woff2', 'fonts/caveat-latin-ext-wght-normal.woff2'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // Fotos: primeiro a cache, e só vai à rede na primeira vez que cada uma é vista.
  if (url.pathname.includes('/img/')) {
    e.respondWith(caches.open(CACHE).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok) c.put(e.request, res.clone());
      return res;
    }))));
    return;
  }
  // Restantes ficheiros: a rede primeiro, confirmando sempre se há versão nova; a cache serve quando não há ligação.
  e.respondWith(fetch(e.request.url, { cache: 'no-cache' }).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
