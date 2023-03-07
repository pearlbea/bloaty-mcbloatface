// Base service worker extended by workbox in webpack

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * Precache /users html for offline.
 */
workbox.precaching.precacheAndRoute([
  { url: '/users' },
]);

/**
 * Tell workbox to use the "/users" cached HTML for requests navigations that start with "/users"
 */
workbox.routing.registerNavigationRoute('/users', {
  whitelist: [
    new RegExp('^/users')
  ],
});

/**
 * Runtime caching of JSON APIs for Angular.
 */
workbox.routing.registerRoute(
  /\.json$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api',
  }),
);

/**
 * Runtime caching of asset pipeline files.
 */
workbox.routing.registerRoute(
  new RegExp('/assets/.+(?:js|css|jpg)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'assets',
  }),
);

/**
 * Runtime caching of avatars.
 */
workbox.routing.registerRoute(
  new RegExp('^https://robohash.org/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'robohash',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

/**
 * Runtime caching of Google fonts.
 */
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
