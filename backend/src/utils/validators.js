import { z } from 'zod';

/**
 * Schema de validação para email
 */
export const emailSchema = z.string().email('Email inválido');

/**
 * Schema de validação para senha
 * Mínimo 8 caracteres
 */
export const passwordSchema = z.string().min(8, 'Senha deve ter no mínimo 8 caracteres');

/**
 * Schema de validação para Login
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

/**
 * Schema de validação para Registro
 */
export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

/**
 * Valida dados usando um schema Zod
 * @param {Object} schema - Schema Zod para validação
 * @param {Object} data - Dados a serem validados
 * @returns {Object} Dados validados
 * @throws {Error} Erro de validação
 */
export function validate(schema, data) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(messages.join(', '));
    }
    throw error;
  }
}
