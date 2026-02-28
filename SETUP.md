# 🚀 Guia de Setup - Menthoria

## Instalação Rápida

### 1. Clone o repositório
```bash
git clone https://github.com/Felipotsz/Menthoria.git
cd Menthoria
```

### 2. Instale todas as dependências
```bash
npm run install:all
```

### 3. Configure o Backend

**Crie o arquivo `.env`:**
```bash
cd backend
cp .env.example .env
```

**Edite o `.env` e configure:**
```env
# Obrigatório
JWT_SECRET=sua-chave-secreta-aqui
REFRESH_TOKEN_SECRET=sua-chave-refresh-aqui

# Opcional (já tem valores padrão)
PORT=3001
NODE_ENV=development
```

### 4. Execute o projeto

**Opção 1: Tudo junto**
```bash
npm run dev:all
```

**Opção 2: Separado**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:backend
```

### 5. Acesse

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## 🧪 Executar Testes

```bash
npm test                 # Todos os testes
npm run test:watch       # Modo watch
npm run test:coverage    # Com coverage
```

## 🗄️ Configurar PostgreSQL (Futuro)

Quando for implementar o banco de dados:

```bash
# 1. Instalar PostgreSQL
# Ubuntu/Debian:
sudo apt install postgresql postgresql-contrib

# 2. Criar banco de dados
sudo -u postgres psql
CREATE DATABASE menthoria;
CREATE USER menthoria_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE menthoria TO menthoria_user;
\q

# 3. Atualizar .env
DATABASE_URL="postgresql://menthoria_user:sua_senha@localhost:5432/menthoria"
```

## 📝 Comandos Úteis

```bash
# Frontend
npm run dev                 # Servidor de desenvolvimento
npm test                    # Testes do frontend

# Backend
npm run dev:backend         # Servidor backend com watch
cd backend && npm test      # Testes do backend

# Ambos
npm run dev:all            # Frontend + Backend
npm run install:all        # Instalar tudo
```

## ⚠️ Troubleshooting

### Porta 3000 já em uso
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou usar outra porta
http-server public -p 3001 -o
```

### Backend não inicia
```bash
# Verificar se .env existe
ls backend/.env

# Verificar se JWT_SECRET está definido
cat backend/.env | grep JWT_SECRET
```

### Testes falhando
```bash
# Limpar cache do Vitest
npx vitest --clearCache

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Próximos Passos

Após o setup, consulte:
- [Checklist de Implementação](docs/03_CHECKLIST_IMPLEMENTACAO.md)
- [Arquitetura Técnica](docs/02_ARQUITETURA_TECNICA.md)

---

**✅ Setup completo! Agora é partir para o desenvolvimento! 🚀**
