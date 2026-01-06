const CACHE_NAME = 'kfl-v1.24';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './login.html',
  './signup.html',
  './recovery.html',
  './modals.html',
  './styles.css',
  'js/script.js',
  'js/error-handler.js',
  'js/security.js',
  'js/logger.js',
  'js/storage.js',
  'js/ui-utils.js',
  'js/analytics.js',
  'js/game.js',
  'js/state-manager.js',
  'js/config.js',
  'js/flashcards-data.js',
  'js/effects.js',
  'js/patch-notes.js',
  'js/settings-ui.js',
  'js/stats-ui.js',
  'js/login.js',
  'js/flashcards.js',
  './patchNote.json',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(
      // In a real backend scenario, this would push local changes to the server
      Promise.resolve()
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      ).then(() => self.clients.claim())
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                if (event.request.url.startsWith('http')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        );
      })
  );
});