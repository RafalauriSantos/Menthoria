# ✅ CHECKLIST DE IMPLEMENTAÇÃO - Menthoria v2.0

## 📌 STATUS GERAL
**Data:** 27 de Fevereiro de 2026  
**Status:** 🔴 NÃO INICIADO  
**Estimado:** 8-10 semanas  
**Progresso:** 0%

---

## FASE 1: BACKEND BASE (Semanas 1-3)

### 1.1 Setup Inicial
- [ ] Criar branch `development`
- [ ] Criar pasta `/backend`
- [ ] `npm init -y` na pasta backend
- [ ] Instalar Fastify
- [ ] Configurar ESM (type: "module")
- [ ] Criar pasta `/src`
- [ ] Configurar scripts npm (dev, build, start)

### 1.2 Database
- [ ] Instalar PostgreSQL localmente
- [ ] Instalar Prisma
- [ ] Criar `.env` com DATABASE_URL
- [ ] Criar schema.prisma
- [ ] Definir modelo User
- [ ] Definir modelo Student
- [ ] Definir modelo Assessment
- [ ] Criar migrations
- [ ] Seed inicial de dados

### 1.3 Autenticação
- [ ] Instalar JWT (jsonwebtoken)
- [ ] Instalar Bcrypt
- [ ] Criar AuthService
- [ ] Implementar Register endpoint
- [ ] Implementar Login endpoint
- [ ] Implementar Refresh token
- [ ] Criar auth middleware
- [ ] Testes de autenticação

### 1.4 Validação
- [ ] Instalar Zod ou Joi
- [ ] Criar validation schemas
- [ ] Criar validation middleware
- [ ] Validar inputs em todos endpoints
- [ ] Error messages em português

### 1.5 Logging & Error Handling
- [ ] Instalar Pino (logger)
- [ ] Configurar logger
- [ ] Criar error handler middleware
- [ ] Error codes customizados
- [ ] Logging de todas operações importantes

### 1.6 Testes Backend (Fase 1)
- [ ] Instalar Jest/Vitest
- [ ] Testes de AuthService
- [ ] Testes de endpoints auth
- [ ] Testes de validação
- [ ] Coverage > 80%

**Critério de aceitação:** API auth funcionando com testes

---

## FASE 2: FRONTEND BASE (Semanas 2-4)

### 2.1 Setup JavaScript Modular
- [ ] Estruturar pastas de componentes
- [ ] Configurar Vite (build tool)
- [ ] Criar pasta `/src`
- [ ] Criar pastas: components, services, utils, styles
- [ ] Configurar ESM modules

### 2.2 Styling
- [ ] Criar CSS variables para tema
- [ ] Criar global styles
- [ ] Sistema de cores e tipografia
- [ ] Grid/Layout system
- [ ] Componentes base prontos

### 2.3 Routing
- [ ] Implementar History API routing
- [ ] Criar estrutura de rotas
- [ ] Página Home
- [ ] Página Login
- [ ] Página 404
- [ ] Protected routes
- [ ] Redirecionar não autenticados

### 2.4 State Management
- [ ] Sistema de state com localStorage
- [ ] Custom Events para comunicação
- [ ] Auth state management
- [ ] Theme state
- [ ] Persistência em localStorage
- [ ] Sincronização entre abas

### 2.5 HTTP Client
- [ ] Criar wrapper para Fetch API
- [ ] Interceptor de autenticação
- [ ] Interceptor de erro
- [ ] Retry automático para failures
- [ ] Timeout configurado

### 2.6 Components
- [ ] Header reutilizável
- [ ] Footer reutilizável
- [ ] Button component
- [ ] Card component
- [ ] Form component
- [ ] Input component com validação
- [ ] Modal component

### 2.7 Testes Frontend (Fase 1)
- [ ] Instalar Vitest + DOM Testing Library
- [ ] Testes de componentes básicos
- [ ] Testes de utils
- [ ] Testes de state management
- [ ] Coverage > 70%

**Critério de aceitação:** UI base funcionando, conectando com backend

---

## FASE 3: FEATURES PRINCIPAIS (Semanas 5-7)

### 3.1 Autenticação Completa
- [ ] Tela de Login funcionando
- [ ] Tela de Register
- [ ] Tela de Forgot Password
- [ ] Tela de Reset Password
- [ ] Email verification (optional)
- [ ] 2FA (optional)
- [ ] Session timeout
- [ ] Logout

### 3.2 Dashboard
- [ ] Página inicial do dashboard
- [ ] Listagem de alunos
- [ ] Criar novo aluno
- [ ] Editar aluno
- [ ] Deletar aluno
- [ ] Filtros e busca
- [ ] Paginação

### 3.3 Avaliações (Assessments)
- [ ] Criar avaliação
- [ ] Listar avaliações
- [ ] Editar avaliação
- [ ] Deletar avaliação
- [ ] Categorizar avaliações
- [ ] Status (rascunho, publicada, finalizada)

### 3.4 Relatórios
- [ ] Relatório de progresso por aluno
- [ ] Estatísticas gerais
- [ ] Gráficos de desempenho
- [ ] Export para PDF
- [ ] Export para Excel

### 3.5 Gerenciamento de Usuários
- [ ] Listar usuários (admin)
- [ ] Criar usuário (admin)
- [ ] Editar usuário
- [ ] Deletar usuário
- [ ] Roles e permissões
- [ ] Logs de ações

### 3.6 Settings/Perfil
- [ ] Editar perfil do usuário
- [ ] Mudar senha
- [ ] Preferências (tema, idioma)
- [ ] Notificações
- [ ] Autenticação 2FA

**Critério de aceitação:** Todas features principais funcionando

---

## FASE 4: QUALIDADE & DEPLOYMENT (Semanas 8-10)

### 4.1 Segurança
- [ ] Audit de segurança
- [ ] CORS correctamente configurado
- [ ] Rate limiting em produção
- [ ] Helmet headers
- [ ] API keys versionadas
- [ ] Secrets management
- [ ] Penetration testing básico

### 4.2 Performance
- [ ] Code splitting React
- [ ] Lazy loading de componentes
- [ ] Database query optimization
- [ ] Caching strategy
- [ ] Image optimization
- [ ] Bundle size otimizado
- [ ] Lighthouse > 90

### 4.3 Testes Completos
- [ ] Testes unitários > 80% coverage
- [ ] Testes de integração
- [ ] Testes E2E básicos
  - [ ] Login flow
  - [ ] CRUD alunos
  - [ ] Dashboard
- [ ] Testes de segurança básicos
- [ ] Testes de performance

### 4.4 Documentação
- [ ] README completo
- [ ] API documentation (Swagger)
- [ ] Architecture decision records
- [ ] Setup guide
- [ ] Contributing guide
- [ ] Code style guide
- [ ] Troubleshooting guide

### 4.5 Deploy
- [ ] Deploy backend (Render/Railway)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Database em produção (Neon/Supabase)
- [ ] Variáveis de ambiente configuradas
- [ ] SSL/HTTPS configurado
- [ ] Health checks básicos
- [ ] Monitoring (opcional - Sentry)

### 4.6 Linting & Formatting
- [ ] ESLint setup
- [ ] Prettier formatting
- [ ] Husky git hooks
- [ ] lint-staged
- [ ] Pre-commit validations

### 4.7 Acessibilidade
- [ ] WCAG 2.1 AA audit
- [ ] Semantic HTML review
- [ ] ARIA labels check
- [ ] Keyboard navigation test
- [ ] Screen reader test
- [ ] Color contrast check
- [ ] Form testing

### 4.6 Deploy Final
- [ ] Deploy backend (Render/Railway)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Database em produção
- [ ] SSL/HTTPS configurado
- [ ] Domain setup (opcional)
- [ ] Email service (opcional)
- [ ] Monitoring live
- [ ] Rollback strategy

**Critério de aceitação:** App em produção, seguro e escalável

---

## 📊 DEPENDÊNCIAS INSTALADAS POR FASE

### Fase 1 - Backend (Fastify + JavaScript)
```json
{
  "fastify": "^4.0.0",
  "@fastify/cors": "^8.4.0",
  "@fastify/jwt": "^7.2.0",
  "prisma": "^5.0.0",
  "@prisma/client": "^5.0.0",
  "bcrypt": "^5.1.0",
  "zod": "^3.22.0",
  "pino": "^8.14.0",
  "dotenv": "^16.3.1",
  "vitest": "^1.0.0"
}
```

### Fase 2 - Frontend (JavaScript Vanilla)
```json
{
  "vite": "^5.0.0",
  "vitest": "^1.0.0",
  "@testing-library/dom": "^9.3.0",
  "jsdom": "^23.0.0"
}
```

**Observações:**
- Sem TypeScript: projeto totalmente em JavaScript
- Sem Tailwind/UI libs: CSS puro com variáveis
- Sem Zustand/Redux: State management nativo
- Sem Axios: Fetch API nativa
- Sem React Router: History API nativa

---

## 🎯 DEFINIÇÕES DE PRONTO (DoD)

### Backend Feature
- [ ] Código escrito em JavaScript
- [ ] Testes escritos (unit + integration)
- [ ] Testes passando
- [ ] Code review aprovado
- [ ] Linting passando (ESLint)
- [ ] Documentado (JSDoc + API docs)
- [ ] Sem console.logs ou debugs
- [ ] Performance aceitável
- [ ] Segurança validada

### Frontend Feature
- [ ] Código escrito em JavaScript
- [ ] Componentes modulares
- [ ] Testes escritos
- [ ] Testes passando
- [ ] Responsivo (mobile + desktop)
- [ ] Acessível (semântico)
- [ ] Code review aprovado
- [ ] Linting passando
- [ ] Documentado
- [ ] Performance aceitável

---

## 🚨 RISCOS & MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Atraso na entrega | Média | Alto | Sprints curtas, escopo enxuto |
| Segurança inadequada | Baixa | Crítico | Auditoria de segurança ao final |
| Performance insuficiente | Baixa | Médio | Testes de performance |
| Bugs em produção | Média | Alto | Testes > 80% coverage |
| Dificuldade sem frameworks | Média | Médio | Arquitetura componentizada |
| Manutenção complexa | Baixa | Médio | Documentação e padrões claros |

---

## 📅 ROADMAP VISUAL

```
Semana 1-2:  |████░░░░░░░░░░░| Backend base (Fastify + Auth)
Semana 3-4:  |░░░░████░░░░░░░| Frontend (Componentes JS)
Semana 5-6:  |░░░░░░░░████░░░| Features (CRUD + Dashboard)
Semana 7-8:  |░░░░░░░░░░░░███| Testes + Deploy
             TCC Curso Técnico - 2 meses
```

---

## 📝 NOTAS IMPORTANTES

1. **Projeto em JavaScript Vanilla** - Sem TypeScript, foco em funcionalidade
2. **Fastify no backend** - Framework rápido e moderno mantido
3. **Sem Docker** - Não será usado neste TCC
4. **Componentes modulares** - Arquitetura como React, mas em JS puro
5. **Testes são importantes** - Garantem qualidade do código
6. **Deploy simples** - Render/Railway/Vercel (plano free)
7. **React é opcional** - Possível migração futura, não obrigatório
8. **Foco em funcionalidade** - Sistema deve funcionar para o TCC

---

## 🔗 PRÓXIMAS AÇÕES

1. ✅ **Você revisa este checklist**
2. ⏳ **Aprova o plano**
3. ⏳ **Começamos Fase 1**

Quando quiser iniciar, é só avisar!
