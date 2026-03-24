const CACHE_NAME = 'asistencias-v2';

const assets = [
  './',
  './index.html',
  './manifest.json',
  './icons/icono1.png',
  './icons/icono2.png'
];

// 1. INSTALACIÓN
self.addEventListener('install', e => {
  console.log('[SW] Instalando App de Cursos...');

  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );

  self.skipWaiting();
});

// 2. ACTIVACIÓN
self.addEventListener('activate', e => {
  console.log('[SW] Activado correctamente');

  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Eliminando caché antiguo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// 3. FETCH (CACHE FIRST - MEJOR PARA PWA)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request).then(networkRes => {
        // Guardar en caché dinámico
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, networkRes.clone());
          return networkRes;
        });
      });
    }).catch(() => {
      // Aquí podrías mostrar página offline si quieres
    })
  );
});

// 4. BACKGROUND SYNC (SE QUEDA IGUAL 🔥)
self.addEventListener('sync', e => {
  if (e.tag === 'sync-asistencias') {
    console.log('[SW] Sincronizando asistencias pendientes...');
  }
});