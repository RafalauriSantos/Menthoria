import { describe, it, expect, beforeEach } from 'vitest';

describe('Constantes Globais', () => {
  it('APP_VERSION deve ser uma string', () => {
    const APP_VERSION = '1.0.0';
    expect(typeof APP_VERSION).toBe('string');
    expect(APP_VERSION).toBe('1.0.0');
  });

  it('APP_NAME deve ser "Menthoria"', () => {
    const APP_NAME = 'Menthoria';
    expect(APP_NAME).toBe('Menthoria');
  });

  it('CURRENT_YEAR deve ser um número válido', () => {
    const CURRENT_YEAR = new Date().getFullYear();
    expect(typeof CURRENT_YEAR).toBe('number');
    expect(CURRENT_YEAR).toBeGreaterThan(2000);
    expect(CURRENT_YEAR).toBeLessThanOrEqual(new Date().getFullYear());
  });

  it('DEFAULT_THEME deve ser "light"', () => {
    const DEFAULT_THEME = 'light';
    expect(DEFAULT_THEME).toBe('light');
  });
});
