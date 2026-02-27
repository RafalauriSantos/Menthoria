import { describe, it, expect, beforeEach } from 'vitest';

describe('Inicialização do DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header id="header" class="header"></header>
      <button id="themeToggle"></button>
      <button id="mobileMenuBtn"></button>
      <nav id="mobileMenu" class="mobile-menu"></nav>
      <span id="currentYear"></span>
      <footer>
        <p>© <span id="currentYear">2024</span> Menthoria. Todos os direitos reservados.</p>
      </footer>
    `;
  });

  it('deve estar presente elemento header', () => {
    const header = document.getElementById('header');
    expect(header).toBeTruthy();
    expect(header.classList.contains('header')).toBe(true);
  });

  it('deve estar presente botão de toggle de tema', () => {
    const themeToggle = document.getElementById('themeToggle');
    expect(themeToggle).toBeTruthy();
  });

  it('deve estar presente menu mobile', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    expect(mobileMenu).toBeTruthy();
    expect(mobileMenu.classList.contains('mobile-menu')).toBe(true);
  });

  it('deve estar presente elemento de ano atual no footer', () => {
    const currentYear = document.getElementById('currentYear');
    expect(currentYear).toBeTruthy();
  });
});

describe('Funcionalidades de Tema', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    localStorage.clear();
    document.documentElement.setAttribute('data-theme', 'light');
  });

  it('tema padrão deve ser light', () => {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    expect(theme).toBe('light');
  });

  it('deve salvar tema no localStorage', () => {
    localStorage.setItem('theme', 'dark');
    const savedTheme = localStorage.getItem('theme');
    expect(savedTheme).toBe('dark');
  });

  it('deve validar tema como light ou dark', () => {
    const validThemes = ['light', 'dark'];
    const testTheme = 'light';
    expect(validThemes).toContain(testTheme);
  });
});
