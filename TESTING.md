# Menthoria - Guia de Testes

## 📋 Visão Geral

Este projeto agora está configurado com testes automatizados usando **Vitest** e **JSdom**.

## 🚀 Como Rodar os Testes

### Instalação (já feita)
```bash
npm install
```

### Executar testes uma vez
```bash
npm test
```

### Executar testes em modo watch (reexecuta ao mudar código)
```bash
npm run test:watch
```

### Ver interface visual dos testes
```bash
npm run test:ui
```
Abre um dashboard no navegador em `http://localhost:51204`

### Gerar relatório de cobertura
```bash
npm run test:coverage
```

## 📁 Estrutura de Testes

```
__tests__/
├── constants.test.js      # Testa constantes globais
├── dom.test.js           # Testa inicialização do DOM
└── accessibility.test.js # Testa acessibilidade e semântica HTML
```

## 🧪 Testes Implementados

### 1. **Constantes Globais** (constants.test.js)
- ✅ Verifica APP_VERSION
- ✅ Verifica APP_NAME
- ✅ Valida CURRENT_YEAR
- ✅ Verifica DEFAULT_THEME

### 2. **DOM** (dom.test.js)
- ✅ Presença de elementos principais
- ✅ Presença de botões interativos
- ✅ Funcionalidades de tema (localStorage)
- ✅ Validação de temas

### 3. **Acessibilidade** (accessibility.test.js)
- ✅ Navegação semântica
- ✅ Links acessíveis
- ✅ Headings estruturados
- ✅ Roles ARIA corretos
- ✅ Configuração de contraste de cores

## 💡 Como Adicionar Novos Testes

Crie um arquivo em `__tests__/novoTeste.test.js`:

```javascript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Minha Funcionalidade', () => {
  beforeEach(() => {
    // Executado antes de cada teste
  });

  it('deve fazer algo específico', () => {
    expect(true).toBe(true);
  });
});
```

## 📊 Próximas Melhorias de Teste

- [ ] Testes para funções de tema (alternarTema)
- [ ] Testes para menu mobile (alternarMenuMobile)
- [ ] Testes para scroll do header
- [ ] Testes para atalhos de teclado
- [ ] Testes de integração E2E com Cypress
- [ ] Testes para páginas internas (login, tools, etc)

## 🔧 Dependências

| Pacote | Versão | Propósito |
|--------|--------|----------|
| vitest | ^1.0.0 | Framework de testes |
| jsdom | ^23.0.0 | Simula DOM no Node.js |
| @vitest/ui | ^1.0.0 | Interface visual |
| @vitest/coverage-v8 | ^1.0.0 | Relatório de cobertura |

## 📝 Notas

- Testes rodam em ambiente JSdom (simula navegador)
- localStorage é suportado nos testes
- Use `beforeEach` para resetar DOM entre testes
- Use `expect()` para fazer asserções
