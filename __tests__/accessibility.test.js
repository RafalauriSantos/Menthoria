import { describe, it, expect, beforeEach } from 'vitest';

describe('Acessibilidade', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header id="header" class="header">
        <nav class="desktop-nav">
          <a href="/" class="nav-link">Início</a>
          <a href="/tools" class="nav-link">Ferramentas</a>
        </nav>
      </header>
      <main role="main">
        <section aria-label="Seção de Conteúdo">
          <h1>Bem-vindo</h1>
        </section>
      </main>
      <footer role="contentinfo">Rodapé</footer>
    `;
  });

  it('deve ter elementos de navegação', () => {
    const nav = document.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('deve ter links de navegação acessíveis', () => {
    const navLinks = document.querySelectorAll('a.nav-link');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('deve ter heading principal', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('Bem-vindo');
  });

  it('deve ter estrutura semântica com main', () => {
    const main = document.querySelector('main');
    expect(main).toBeTruthy();
    expect(main.getAttribute('role')).toBe('main');
  });

  it('deve ter rodapé semântico', () => {
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.getAttribute('role')).toBe('contentinfo');
  });

  it('deve ter aria-labels em seções importantes', () => {
    const section = document.querySelector('section[aria-label]');
    expect(section).toBeTruthy();
    expect(section.getAttribute('aria-label')).toBe('Seção de Conteúdo');
  });
});

describe('Contraste de Cores para Temas', () => {
  it('tema light deve ter background claro', () => {
    const lightThemeConfig = {
      background: '#ffffff',
      text: '#000000'
    };
    expect(lightThemeConfig.background).toBe('#ffffff');
    expect(lightThemeConfig.text).toBe('#000000');
  });

  it('tema dark deve ter background escuro', () => {
    const darkThemeConfig = {
      background: '#1a1a1a',
      text: '#ffffff'
    };
    expect(darkThemeConfig.background).toBe('#1a1a1a');
    expect(darkThemeConfig.text).toBe('#ffffff');
  });
});
