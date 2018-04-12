// Base service worker extended by workbox in webpack

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute([
  { url: '/users' },
]);

workbox.routing.registerNavigationRoute('/users', {
  whitelist: [
    new RegExp('^/users')
  ],
});

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

workbox.routing.registerRoute(
  /\.json$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api',
  }),
);

workbox.routing.registerRoute(
  new RegExp('/assets/.(?:js|css)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'assets',
  }),
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
