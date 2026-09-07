// MBR Analytics — Service Worker
// Caches the app shell for offline use

const CACHE_NAME = 'mbr-analytics-v1';
const CDN_CACHE  = 'mbr-cdn-v1';

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
];

const CDN_URLS = [
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js',
];

// Install: cache app shell + CDN libraries
self.addEventListener('install', e => {
  e.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL)),
      caches.open(CDN_CACHE).then(c => c.addAll(CDN_URLS)),
    ]).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== CDN_CACHE)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for CDN, network-first for app
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // CDN resources — cache first (they don't change)
  if (CDN_URLS.some(u => url.startsWith(u.split('/').slice(0,3).join('/')))) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CDN_CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
    return;
  }

  // pptxgen (loaded on demand) — cache after first load
  if (url.includes('pptxgen')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CDN_CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
    return;
  }

  // App shell — network first, fallback to cache
  e.respondWith(
    fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
