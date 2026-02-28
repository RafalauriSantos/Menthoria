# Menthoria Backend API

Backend da plataforma Menthoria construído com **Fastify** e **JavaScript**.

## 🚀 Tecnologias

- **Fastify** - Framework web rápido e leve
- **JavaScript (ES6+)** - Linguagem principal
- **Zod** - Validação de schemas
- **Bcrypt** - Hash de senhas
- **JWT** - Autenticação
- **Pino** - Logger estruturado
- **Vitest** - Testes

## 📁 Estrutura

```
backend/
├── src/
│   ├── config/           # Configurações
│   ├── routes/           # Rotas da API
│   ├── controllers/      # Controllers
│   ├── services/         # Lógica de negócios
│   ├── middleware/       # Middlewares
│   ├── models/           # Modelos (futuro: Prisma)
│   ├── utils/            # Utilitários
│   └── server.js         # Servidor principal
├── tests/                # Testes
├── .env.example          # Exemplo de variáveis de ambiente
└── package.json
```

## ⚙️ Setup

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Executar em desenvolvimento:**
```bash
npm run dev
```

4. **Executar testes:**
```bash
npm test
```

## 🔐 Variáveis de Ambiente

Veja o arquivo `.env.example` para a lista completa de variáveis necessárias.

## 📚 API Endpoints

### Health Check
- `GET /health` - Verifica status do servidor

### API Info
- `GET /api` - Informações da API

## 🧪 Testes

```bash
npm test              # Executar testes
npm run test:watch    # Modo watch
npm run test:coverage # Com coverage
```

## 📝 License

MIT
