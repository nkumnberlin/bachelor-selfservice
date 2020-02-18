if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
  if (workbox) {
    console.log('Workbox is loaded');

    workbox.precaching.precacheAndRoute([]);

    self.addEventListener('install', event => {
      console.log('Service worker install event!');
    });

    self.addEventListener('activate', event => {
      console.log('Service worker activate event!');
    });

    workbox.routing.registerNavigationRoute('login', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    });

    const handlerCb = ({ url, event, params }) => {
      return fetch(event.request)
        .then(response => {
          console.log(response);
          const contentType = response.headers.get('Content-Type') || '';
          console.log('content ty: ', contentType);
          return response;
        })
        .then(function(res) {
          return new Response(res.json());
        });
    };

    const bgSyncPlugin = new workbox.backgroundSync.Plugin('postCallQueue', {
      maxRetentionTime: 24 * 60
    });

    workbox.routing.registerRoute(
      new RegExp('/CCREST/PublicApi/v2/device/list'),
      new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'POST'
    );

    workbox.routing.registerRoute(
      new RegExp('/CCREST/PublicApi/v2/device/list'),
      new workbox.strategies.NetworkFirst({
        cacheName: 'device-list',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            headers: {
              'X-Is-Cacheable': 'true'
            }
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      new RegExp('/CCREST/PublicApi/v2/device/info'),
      new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'POST'
    );
    workbox.routing.registerRoute(
      new RegExp('          /device/enablelostmode'),
      new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'POST'
    );
    workbox.routing.registerRoute(
      new RegExp('/CCREST/PublicApi/v2/device/disablelostmode'),
      new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'POST'
    );
    workbox.routing.registerRoute(
      new RegExp('CCREST/PublicApi/v2/device/wipe'),
      new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'POST'
    );
    workbox.routing.registerRoute(
      new RegExp('/CCREST/PublicApi/v2/device/lockscreen'),
      new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'POST'
    );

    workbox.routing.registerRoute(
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'fontRoboto',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      'https://fonts.googleapis.com/icon?family=Material+Icons',
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'iconsMaterial',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60
          })
        ]
      })
    );
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60
          })
        ]
      })
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
