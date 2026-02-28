/**
 * Service Worker - Menthoria PWA
 * Estratégia: Offline-First com sincronização em background
 */

const CACHE_NAME = 'menthoria-v1.0.0';
const OFFLINE_PAGE = '/offline.html';

// Recursos essenciais para cache (offline-first)
const ESSENTIAL_RESOURCES = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
  '/themes/themes.css',
  '/themes/themes.js',
  '/login/login.html',
  '/login/login.css',
  '/login/login.js',
  '/landing-page/home/home.css',
  '/landing-page/home/home.js',
  OFFLINE_PAGE
];

// URLs da API (backend)
const API_URL = 'http://localhost:3001/api';

/**
 * Evento de instalação do Service Worker
 * Faz cache dos recursos essenciais
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching essential resources');
        return cache.addAll(ESSENTIAL_RESOURCES);
      })
      .then(() => self.skipWaiting())
  );
});

/**
 * Evento de ativação
 * Remove caches antigos
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

/**
 * Evento de fetch (requisições)
 * Estratégia: Cache First para assets, Network First para API
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Estratégia para requisições de API
  if (url.origin.includes('localhost:3001') || url.pathname.startsWith('/api')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // Estratégia para assets estáticos
  event.respondWith(cacheFirstStrategy(request));
});

/**
 * Cache First Strategy
 * Tenta buscar do cache primeiro, depois rede
 */
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Cache hit:', request.url);
      return cachedResponse;
    }
    
    // Se não está no cache, busca da rede
    const networkResponse = await fetch(request);
    
    // Faz cache da resposta
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    
    // Se falhar, tenta retornar página offline
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_PAGE);
    }
    
    throw error;
  }
}

/**
 * Network First Strategy
 * Tenta buscar da rede primeiro, depois cache
 */
async function networkFirstStrategy(request) {
  try {
    // Tenta buscar da rede
    const networkResponse = await fetch(request);
    
    // Faz cache da resposta se for bem sucedida
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Network failed, trying cache:', request.url);
    
    // Se falhar, tenta buscar do cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Serving from cache (offline):', request.url);
      return cachedResponse;
    }
    
    // Se não tem no cache, retorna resposta de erro
    return new Response(
      JSON.stringify({ 
        error: 'Offline - sem dados em cache',
        offline: true 
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Background Sync - sincroniza dados quando voltar online
 */
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

/**
 * Sincroniza dados pendentes quando voltar online
 */
async function syncData() {
  console.log('[SW] Syncing pending data...');
  
  try {
    // Busca dados pendentes do IndexedDB (a implementar)
    // Envia para o backend
    // Marca como sincronizado
    
    console.log('[SW] Data synced successfully');
  } catch (error) {
    console.error('[SW] Sync failed:', error);
    throw error; // Retry automático
  }
}

/**
 * Push notifications (futuro)
 */
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const data = event.data ? event.data.json() : {};
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Menthoria', {
      body: data.body || 'Nova notificação',
      icon: '/img/icon-192.png',
      badge: '/img/badge-72.png'
    })
  );
});
