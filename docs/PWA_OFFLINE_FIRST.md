# 📱 PWA & Offline-First - Menthoria

## 🎯 Visão Geral

Menthoria é um **Progressive Web App (PWA)** com estratégia **Offline-First** e **Mobile-First**, permitindo que usuários acessem o conteúdo mesmo sem conexão com a internet.

---

## ✨ Características PWA

### ✅ Funcionalidades Implementadas

- **📴 Offline-First** - Funciona sem internet
- **📱 Mobile-First** - Design otimizado para mobile
- **💾 Cache Inteligente** - Assets em cache para acesso rápido
- **🔄 Sincronização Automática** - Dados sincronizam quando voltar online
- **🏠 Instalável** - Pode ser instalado como app nativo
- **⚡ Performance** - Carregamento instantâneo
- **🔔 Notificações** - Push notifications (futuro)

---

## 🏗️ Arquitetura

### Service Worker (`sw.js`)

Gerencia requisições e cache com duas estratégias:

**1. Cache First (Assets Estáticos)**
```
Requisição → Cache → Se não tiver → Rede → Atualiza Cache
```

**2. Network First (API)**
```
Requisição → Rede → Cache → Se offline → Usa Cache
```

### PWA Manager (`pwa-manager.js`)

Gerencia:
- Registro do Service Worker
- IndexedDB para dados offline
- Fila de sincronização
- Monitoramento de conexão
- Notificações ao usuário

### IndexedDB

Armazena dados localmente:
- `syncQueue` - Dados pendentes de sincronização
- `dataCache` - Cache de dados da API

---

## 📁 Arquivos PWA

```
public/
├── sw.js                 # Service Worker
├── pwa-manager.js        # Gerenciador PWA
├── manifest.json         # Manifest do app
├── offline.html          # Página offline
└── img/
    ├── icon-72.png      # Ícones PWA (vários tamanhos)
    ├── icon-192.png
    ├── icon-512.png
    └── ...
```

---

## 🚀 Como Usar

### Para Usuários

**1. Instalar o App**
- Acesse pelo navegador
- Clique em "Adicionar à tela inicial"
- O app será instalado como nativo

**2. Usar Offline**
- Todas as páginas visitadas ficam disponíveis offline
- Dados podem ser salvos localmente
- Sincroniza automaticamente quando voltar online

**3. Sincronizar Dados**
- Automático quando reconectar
- Ou force: clique no botão de sincronização

### Para Desenvolvedores

**1. Testar Service Worker**
```javascript
// Abra DevTools > Application > Service Workers
// Veja o SW registrado e ativo
```

**2. Ver Cache**
```javascript
// DevTools > Application > Cache Storage
// Veja recursos em cache
```

**3. Testar Offline**
```javascript
// DevTools > Network > Offline (checkbox)
// Navegue pelo app offline
```

**4. Ver IndexedDB**
```javascript
// DevTools > Application > IndexedDB > MenthoriaDB
// Veja dados armazenados
```

---

## 📊 Fluxos de Dados

### Salvando Dados Offline

```javascript
// Usuário cria um registro (ex: novo aluno)
const data = { name: 'João', age: 15 };

// Se offline, salva localmente
if (!navigator.onLine) {
  await pwaManager.saveOfflineData('students', data);
  // Mostra notificação: "Salvo localmente"
}

// Se online, envia para API
else {
  await fetch('/api/students', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
```

### Sincronização Automática

```javascript
// Quando volta online
window.addEventListener('online', async () => {
  // PWA Manager busca dados pendentes
  const pendingItems = await getPendingFromIndexedDB();
  
  // Envia para o backend
  for (const item of pendingItems) {
    await sendToBackend(item);
    markAsSynced(item);
  }
  
  // Notifica usuário
  showNotification('✅ Dados sincronizados');
});
```

---

## 🎨 Mobile-First CSS

### Breakpoints Padrão

```css
/* Mobile (padrão) */
@media (min-width: 320px) { /* ... */ }

/* Tablet */
@media (min-width: 768px) { /* ... */ }

/* Desktop */
@media (min-width: 1024px) { /* ... */ }

/* Large Desktop */
@media (min-width: 1440px) { /* ... */ }
```

### Exemplo Mobile-First

```css
/* Mobile primeiro (base) */
.container {
  padding: 10px;
  font-size: 14px;
}

/* Desktop depois (override) */
@media (min-width: 768px) {
  .container {
    padding: 20px;
    font-size: 16px;
  }
}
```

---

## 🔧 Configuração

### manifest.json

```json
{
  "name": "Menthoria",
  "short_name": "Menthoria",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#4A90E2",
  "background_color": "#ffffff",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/img/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Meta Tags PWA

```html
<!-- Viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<!-- Theme Color -->
<meta name="theme-color" content="#4A90E2">

<!-- Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Apple -->
<link rel="apple-touch-icon" href="/img/icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
```

---

## 🧪 Testes

### Testar Cache

```bash
# 1. Navegue pelo site (cache recursos)
# 2. Abra DevTools > Network > Offline
# 3. Recarregue a página
# 4. Deve funcionar offline
```

### Testar Sincronização

```javascript
// 1. Desconecte internet
// 2. Crie um registro
console.log(await pwaManager.saveOfflineData('test', { foo: 'bar' }));

// 3. Reconecte internet
// 4. Veja sincronização automática nos logs
```

### Lighthouse Audit

```bash
# Chrome DevTools > Lighthouse
# - Run audit
# - PWA category > Should score 90+
```

---

## 📈 Métricas PWA

### Performance Goals

- **FCP (First Contentful Paint)** < 1.8s
- **LCP (Largest Contentful Paint)** < 2.5s
- **TTI (Time to Interactive)** < 3.8s
- **CLS (Cumulative Layout Shift)** < 0.1

### PWA Score

- **Instalável** ✅
- **Fast & Reliable** ✅
- **Funciona offline** ✅
- **HTTPS** ⏳ (produção)

---

## ⚠️ Limitações

### Navegadores

- **Chrome/Edge** - Suporte completo ✅
- **Firefox** - Suporte parcial ⚠️
- **Safari** - Suporte limitado ⚠️
  - Sem Background Sync
  - Sem Push Notifications

### Armazenamento

- **Cache Storage** - ~50MB por domínio
- **IndexedDB** - >1GB (dependendo do navegador)
- **Dados limpos** - Se usuário limpar cache do navegador

---

## 🔮 Roadmap

### Fase Atual (v1.0)
- ✅ Service Worker básico
- ✅ Cache offline
- ✅ Sincronização manual
- ✅ IndexedDB

### Próximas Fases
- ⏳ Background Sync completo
- ⏳ Push Notifications
- ⏳ Share API
- ⏳ Camera/Media API
- ⏳ Geolocation offline

---

## 📚 Recursos

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [IndexedDB Guide](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Workbox (Google)](https://developers.google.com/web/tools/workbox)

---

**🎯 Objetivo:** Aplicativo totalmente funcional offline, com experiência mobile nativa! 📱
