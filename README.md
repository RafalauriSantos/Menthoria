# 🎓 Menthoria - Plataforma de Educação Inclusiva

> **TCC Curso Técnico** - Sistema completo de gestão educacional com foco em inclusão

## 📋 Sobre o Projeto

Menthoria é uma plataforma web full-stack desenvolvida com **JavaScript vanilla** e **Fastify**, focada em educação inclusiva e acessibilidade.

**🌟 Características Principais:**
- ✅ **Offline-First** - Funciona sem internet (PWA)
- ✅ **Mobile-First** - Design otimizado para mobile
- ✅ **Sincronização Automática** - Dados sincronizam ao reconectar
- ✅ **Instalável** - Pode ser instalado como app nativo
- ✅ **Backend Robusto** - API RESTful com Fastify
- ✅ **Zero Dependências** - JavaScript vanilla puro

### 🎯 Objetivos do TCC
- ✅ Sistema funcional de gestão educacional
- ✅ Backend robusto com API RESTful
- ✅ Frontend componentizado e acessível
- ✅ Autenticação e autorização real
- ✅ Banco de dados PostgreSQL
- ✅ Testes automatizados
- ✅ **PWA offline-first**

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** + **Fastify** - Framework rápido e moderno
- **JavaScript (ES6+)** - Sem TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Prisma** - ORM (a ser implementado)
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de schemas

### Frontend
- **JavaScript Vanilla** - Arquitetura componentizada
- **CSS3** - Estilização moderna
- **Vite** - Build tool (opcional)
- **Fetch API** - Comunicação HTTP

### Testing
- **Vitest** - Framework de testes
- **DOM Testing Library** - Testes de componentes

### PWA
- **Service Worker** - Cache e offline
- **IndexedDB** - Armazenamento local
- **Web App Manifest** - Instalação nativa

## 📁 Estrutura do Projeto

```
Menthoria/
├── backend/              # API Fastify
│   ├── src/
│   │   ├── config/      # Configurações
│   │   ├── routes/      # Rotas da API
│   │   ├── controllers/ # Controllers
│   │   ├── services/    # Lógica de negócios
│   │   ├── middleware/  # Middlewares
│   │   ├── models/      # Modelos (Prisma)
│   │   ├── utils/       # Utilitários
│   │   └── server.js    # Servidor principal
│   ├── tests/           # Testes do backend
│   └── package.json
│
├── public/              # Frontend (PWA)
│   ├── login/          # Sistema de login
│   ├── landing-page/   # Páginas institucionais
│   ├── themes/         # Sistema de temas
│   ├── img/            # Imagens
│   ├── sw.js           # Service Worker (offline)
│   ├── pwa-manager.js  # Gerenciador PWA
│   ├── manifest.json   # PWA Manifest
│   ├── offline.html    # Página offline
│   └── index.html      # Página principal
│
├── __tests__/          # Testes do frontend
├── docs/               # Documentação
└── package.json        # Root package
```

## 🚀 Como Executar

### 1️⃣ Pré-requisitos
- **Node.js** v18 ou superior
- **npm** ou **yarn**
- **PostgreSQL** (para a API)

### 2️⃣ Instalação

**Instalar todas as dependências:**
```bash
npm run install:all
```

Ou instalar separadamente:
```bash
# Root (frontend)
npm install

# Backend
npm run backend:install
```

### 3️⃣ Configurar Backend

**Copiar arquivo de ambiente:**
```bash
cd backend
cp .env.example .env
```

**Editar `.env` com suas configurações:**
- `JWT_SECRET` - Chave secreta para JWT
- `DATABASE_URL` - URL do PostgreSQL
- etc.

### 4️⃣ Executar em Desenvolvimento

**Frontend apenas:**
```bash
npm run dev
# Acesse: http://localhost:3000
```

**Backend apenas:**
```bash
npm run dev:backend
# API em: http://localhost:3001
```

**Ambos simultaneamente:**
```bash
npm run dev:all
```

### 5️⃣ Testes

```bash
npm test                # Executar testes
npm run test:watch      # Modo watch
npm run test:coverage   # Com coverage
```

## 📚 Documentação

- [📊 Resumo Executivo](docs/00_RESUMO_EXECUTIVO.md)
- [📝 Problemas Encontrados](docs/01_PROBLEMAS_ENCONTRADOS.md)
- [🏗️ Arquitetura Técnica](docs/02_ARQUITETURA_TECNICA.md)
- [✅ Checklist de Implementação](docs/03_CHECKLIST_IMPLEMENTACAO.md)
- [📖 Guias de Leitura](docs/04_GUIAS_LEITURA.md)
- [🎯 Relatório de Entrega](docs/05_RELATORIO_ENTREGA.md)
- [📱 PWA & Offline-First](docs/PWA_OFFLINE_FIRST.md) **← NOVO!**

## 🧪 Status do Projeto

- ✅ **Estrutura inicial** - Completa
- ✅ **Frontend estático** - Funcional
- ✅ **Backend básico** - Estruturado
- ✅ **PWA Offline-First** - Implementado **← NOVO!**
- ✅ **Service Worker** - Funcionando
- ✅ **Mobile-First** - Design responsivo
- 🔄 **Autenticação** - Em desenvolvimento
- ⏳ **Banco de dados** - Aguardando
- ⏳ **Features principais** - Pendente

## 👥 Equipe

- **Felipotsz**
- **Rafael Lauri**
- **Rafael Silveira**
- **Kaiky Gay**

## 📄 Licença

MIT License - TCC Curso Técnico 2026

---

**🎓 Desenvolvido como Trabalho de Conclusão de Curso**
