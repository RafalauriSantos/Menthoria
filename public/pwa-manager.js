/**
 * PWA Manager - Gerencia Service Worker, Cache e Sincronização
 * Offline-First Strategy
 */

class PWAManager {
  constructor() {
    this.swRegistration = null;
    this.isOnline = navigator.onLine;
    this.syncQueue = [];
    this.db = null;
    
    this.init();
  }

  /**
   * Inicializa PWA
   */
  async init() {
    console.log('[PWA] Initializing...');
    
    // Registra Service Worker
    await this.registerServiceWorker();
    
    // Inicializa IndexedDB para dados offline
    await this.initDatabase();
    
    // Monitora conexão
    this.setupConnectionMonitoring();
    
    // Monitora sincronização
    this.setupSyncMonitoring();
    
    console.log('[PWA] Initialized successfully');
  }

  /**
   * Registra Service Worker
   */
  async registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.warn('[PWA] Service Worker não suportado');
      return;
    }

    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[PWA] Service Worker registrado:', this.swRegistration.scope);

      // Verifica atualizações
      this.swRegistration.addEventListener('updatefound', () => {
        console.log('[PWA] Nova versão disponível');
        this.handleUpdate();
      });

    } catch (error) {
      console.error('[PWA] Erro ao registrar Service Worker:', error);
    }
  }

  /**
   * Inicializa IndexedDB para armazenamento offline
   */
  async initDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MenthoriaDB', 1);

      request.onerror = () => {
        console.error('[PWA] Erro ao abrir IndexedDB');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('[PWA] IndexedDB conectado');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store para dados pendentes de sincronização
        if (!db.objectStoreNames.contains('syncQueue')) {
          const syncStore = db.createObjectStore('syncQueue', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          syncStore.createIndex('timestamp', 'timestamp', { unique: false });
          syncStore.createIndex('synced', 'synced', { unique: false });
        }

        // Store para cache de dados
        if (!db.objectStoreNames.contains('dataCache')) {
          const cacheStore = db.createObjectStore('dataCache', { 
            keyPath: 'key' 
          });
          cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        console.log('[PWA] IndexedDB estrutura criada');
      };
    });
  }

  /**
   * Monitora status de conexão
   */
  setupConnectionMonitoring() {
    window.addEventListener('online', () => {
      console.log('[PWA] Online');
      this.isOnline = true;
      this.showNotification('✅ Você está online', 'Sincronizando dados...');
      this.syncPendingData();
    });

    window.addEventListener('offline', () => {
      console.log('[PWA] Offline');
      this.isOnline = false;
      this.showNotification('📡 Você está offline', 'Dados serão salvos localmente', 'warning');
    });
  }

  /**
   * Configura sincronização automática
   */
  setupSyncMonitoring() {
    if ('sync' in this.swRegistration) {
      // Registra sync quando voltar online
      window.addEventListener('online', async () => {
        try {
          await this.swRegistration.sync.register('sync-data');
          console.log('[PWA] Background sync registrado');
        } catch (error) {
          console.error('[PWA] Erro ao registrar sync:', error);
        }
      });
    }
  }

  /**
   * Salva dados localmente (modo offline)
   */
  async saveOfflineData(type, data) {
    if (!this.db) {
      console.error('[PWA] Database não inicializado');
      return false;
    }

    try {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');

      const item = {
        type,
        data,
        timestamp: Date.now(),
        synced: false
      };

      await store.add(item);
      console.log('[PWA] Dados salvos offline:', type);
      
      return true;
    } catch (error) {
      console.error('[PWA] Erro ao salvar offline:', error);
      return false;
    }
  }

  /**
   * Sincroniza dados pendentes
   */
  async syncPendingData() {
    if (!this.isOnline || !this.db) {
      return;
    }

    try {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');
      const index = store.index('synced');
      const request = index.getAll(false); // Não sincronizados

      request.onsuccess = async () => {
        const pendingItems = request.result;
        
        if (pendingItems.length === 0) {
          console.log('[PWA] Nenhum dado pendente para sincronizar');
          return;
        }

        console.log(`[PWA] Sincronizando ${pendingItems.length} itens...`);

        for (const item of pendingItems) {
          try {
            // Envia para o backend
            await this.sendToBackend(item.type, item.data);
            
            // Marca como sincronizado
            item.synced = true;
            item.syncedAt = Date.now();
            store.put(item);
            
            console.log('[PWA] Item sincronizado:', item.id);
          } catch (error) {
            console.error('[PWA] Erro ao sincronizar item:', item.id, error);
          }
        }

        this.showNotification('✅ Sincronização completa', `${pendingItems.length} itens sincronizados`);
      };
    } catch (error) {
      console.error('[PWA] Erro na sincronização:', error);
    }
  }

  /**
   * Envia dados para o backend
   */
  async sendToBackend(type, data) {
    const response = await fetch(`http://localhost:3001/api/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * Verifica se há atualização disponível
   */
  handleUpdate() {
    const message = 'Nova versão disponível! Recarregar?';
    
    if (confirm(message)) {
      window.location.reload();
    }
  }

  /**
   * Mostra notificação para o usuário
   */
  showNotification(title, message, type = 'info') {
    // Cria notificação visual
    const notification = document.createElement('div');
    notification.className = `pwa-notification ${type}`;
    notification.innerHTML = `
      <strong>${title}</strong>
      <p>${message}</p>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'warning' ? '#f59e0b' : '#10b981'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 300px;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove após 4 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  /**
   * Verifica se está online
   */
  isOnlineMode() {
    return this.isOnline;
  }

  /**
   * Força sincronização manual
   */
  async forceSyncnow() {
    if (!this.isOnline) {
      this.showNotification('❌ Offline', 'Conecte-se à internet para sincronizar', 'warning');
      return;
    }

    this.showNotification('🔄 Sincronizando...', 'Aguarde...');
    await this.syncPendingData();
  }
}

// Adiciona animações CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Inicializa PWA Manager
const pwaManager = new PWAManager();

// Exporta para uso global
window.pwaManager = pwaManager;
