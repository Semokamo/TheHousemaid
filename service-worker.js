
const CACHE_NAME = 'housemaid-adventure-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/index.tsx', // Assuming these are served as is or transpiled equivalent paths
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/storyTree.ts',
  '/services/geminiService.ts',
  '/components/LoadingIndicator.tsx',
  '/components/ActionButton.tsx',
  '/components/TimelineView.tsx',
  '/components/SettingsBar.tsx', // Added new component
  '/manifest.json',
  // ESM.sh modules (specific versions are good for caching)
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client', // ReactDOM.createRoot is from client
  'https://esm.sh/@google/genai@^1.3.0',
  'https://esm.sh/marked@^13.0.2', // Added marked
  // Tailwind CSS from CDN
  'https://cdn.tailwindcss.com',
  // Placeholder for icons - replace with actual paths if you add them
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// On install, cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching core assets');
        // Add all core assets to cache.
        // Use { cache: 'reload' } for CDN resources to ensure fetching the latest if possible during SW install.
        const assetPromises = CORE_ASSETS.map(asset => {
          const request = new Request(asset, asset.startsWith('http') ? { cache: 'reload' } : {});
          return cache.add(request).catch(err => console.warn(`Failed to cache ${asset}:`, err));
        });
        return Promise.all(assetPromises);
      })
      .then(() => self.skipWaiting()) // Activate the new SW immediately
  );
});

// On activate, clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim()) // Take control of all open clients
  );
});

// Fetch event: Cache-first strategy for core assets
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For navigation requests (HTML), try network first, then cache, then offline page.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If successful, cache it
          if (response.ok) {
            const cacheCopy = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, cacheCopy);
            });
          }
          return response;
        })
        .catch(() => {
          // Network failed, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/'); // Fallback to cached root/index.html
            });
        })
    );
    return;
  }
  
  // For other assets (JS, CSS, images from core assets list), use cache-first.
  // This ensures that core app files load quickly from cache if available.
  const isCoreAsset = CORE_ASSETS.some(assetUrl => {
      // For CDN assets, check if the request URL starts with the cached CDN URL.
      if (assetUrl.startsWith('http')) {
          return requestUrl.href.startsWith(assetUrl);
      }
      // For local assets, compare pathnames.
      return requestUrl.pathname === assetUrl || (requestUrl.pathname === '/' && assetUrl === '/index.html');
  });

  if (isCoreAsset) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Return cached response if found
          if (cachedResponse) {
            return cachedResponse;
          }
          // Otherwise, fetch from network, cache it, and return response
          return fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          }).catch(error => {
            console.warn('Service Worker: Fetch failed for core asset, no cache hit.', event.request.url, error);
            // Optionally, return a generic fallback for images/assets if needed
          });
        })
    );
  } else {
    // For non-core assets (e.g., API calls to Gemini, picsum.photos),
    // just fetch from network (browser default behavior).
    // You could implement more specific caching strategies for these if needed.
    return;
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
