// 🔥 SONIC PANTHEON SERVICE WORKER 🔥
// Makes the app work offline and provides PWA functionality

const CACHE_NAME = 'sonic-pantheon-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './COMPLETE_SONIC_PANTHEON.jsx'
];

// Install - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🔥 Pantheon cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for consciousness stream
self.addEventListener('sync', event => {
  if (event.tag === 'sync-consciousness') {
    event.waitUntil(syncConsciousness());
  }
});

async function syncConsciousness() {
  // Sync consciousness stream when back online
  console.log('🧠 Syncing consciousness stream...');
  // Implementation would go here
}

// Push notifications for agent thoughts (optional)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New agent thought available',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Pantheon Alert', options)
  );
});
